import React, { useState, useEffect } from 'react';
import { 
  Users, Mail, Reply, UserX, Download, Plus, Trash2, TrendingUp, 
  CheckCircle, Clock, AlertCircle, RefreshCw, Moon, Sun, 
  ArrowUp, ArrowDown, Minus, Search, Target, Heart
} from 'lucide-react';
import {
  BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

export default function LoveNotFearOutboundMetrics() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [allAvailableCampaigns, setAllAvailableCampaigns] = useState([]);
  const [newCampaignId, setNewCampaignId] = useState('');
  const [apiKey, setApiKey] = useState('f7e5fb41-4c80-4d9d-b408-bb0ac198c057_2gsazuh');
  const [viewMode, setViewMode] = useState('individual');
  const [campaignData, setCampaignData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingCampaigns, setFetchingCampaigns] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(300);
  const [countdown, setCountdown] = useState(300);
  const [searchTerm, setSearchTerm] = useState('');
  const [historicalData, setHistoricalData] = useState({});
  const [showCampaignSelector, setShowCampaignSelector] = useState(false);

  const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    const cached = localStorage.getItem('campaignData');
    const cachedHistory = localStorage.getItem('historicalData');
    if (cached) setCampaignData(JSON.parse(cached));
    if (cachedHistory) setHistoricalData(JSON.parse(cachedHistory));
  }, []);

  useEffect(() => {
    if (autoRefresh && campaigns.length > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            fetchAllCampaigns();
            return refreshInterval;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCountdown(refreshInterval);
    }
  }, [autoRefresh, refreshInterval, campaigns]);

  const fetchAvailableCampaigns = async () => {
    setFetchingCampaigns(true);
    try {
      const response = await fetch(
        `https://server.smartlead.ai/api/v1/campaigns?api_key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      
      const data = await response.json();
      setAllAvailableCampaigns(data);
      setShowCampaignSelector(true);
      toast.success(`Found ${data.length} campaigns!`);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      toast.error('Failed to fetch campaigns');
      setError(err.message);
    } finally {
      setFetchingCampaigns(false);
    }
  };

  const toggleCampaignSelection = (campaignId) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const addSelectedCampaigns = () => {
    const newCampaigns = [...new Set([...campaigns, ...selectedCampaigns])];
    setCampaigns(newCampaigns);
    setSelectedCampaigns([]);
    setShowCampaignSelector(false);
    toast.success(`Added ${selectedCampaigns.length} campaigns`);
  };

  const addCampaign = () => {
    if (newCampaignId && !campaigns.includes(newCampaignId)) {
      setCampaigns([...campaigns, newCampaignId]);
      setNewCampaignId('');
      toast.success('Campaign added');
    }
  };

  const removeCampaign = (id) => {
    setCampaigns(campaigns.filter(c => c !== id));
    const newData = { ...campaignData };
    delete newData[id];
    setCampaignData(newData);
    toast.success('Campaign removed');
  };

  const fetchCampaignAnalytics = async (campaignId) => {
    try {
      const response = await fetch(
        `https://server.smartlead.ai/api/v1/campaigns/${campaignId}/analytics?api_key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch campaign ${campaignId}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching campaign ${campaignId}:`, err);
      throw err;
    }
  };

  const fetchAllCampaigns = async () => {
    if (campaigns.length === 0) {
      toast.error('Please add at least one campaign');
      return;
    }

    setLoading(true);
    setError(null);
    
    const loadingToast = toast.loading('Fetching analytics...');
    
    try {
      const results = {};
      for (const campaignId of campaigns) {
        const data = await fetchCampaignAnalytics(campaignId);
        results[campaignId] = data;
      }
      setCampaignData(results);
      
      const timestamp = Date.now();
      const newHistory = { ...historicalData };
      Object.entries(results).forEach(([id, data]) => {
        if (!newHistory[id]) newHistory[id] = [];
        newHistory[id].push({
          timestamp,
          ...data
        });
        if (newHistory[id].length > 30) {
          newHistory[id] = newHistory[id].slice(-30);
        }
      });
      setHistoricalData(newHistory);
      
      localStorage.setItem('campaignData', JSON.stringify(results));
      localStorage.setItem('historicalData', JSON.stringify(newHistory));
      
      toast.success('Analytics fetched successfully!', { id: loadingToast });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch analytics', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const getConsolidatedMetrics = () => {
    const consolidated = {
      unique_leads: 0,
      total_emails: 0,
      total_replies: 0,
      bounced: 0,
      unsubscribed: 0,
      interested: 0,
      total_leads: 0,
      not_started: 0,
      in_progress: 0,
      completed: 0
    };

    Object.values(campaignData).forEach(data => {
      consolidated.total_emails += parseInt(data.sent_count || 0);
      consolidated.total_replies += parseInt(data.reply_count || 0);
      consolidated.bounced += parseInt(data.bounce_count || 0);
      consolidated.unsubscribed += parseInt(data.unsubscribed_count || 0);
      consolidated.total_leads += parseInt(data.total_count || 0);
      
      if (data.campaign_lead_stats) {
        consolidated.interested += parseInt(data.campaign_lead_stats.interested || 0);
        consolidated.not_started += parseInt(data.campaign_lead_stats.notStarted || 0);
        consolidated.in_progress += parseInt(data.campaign_lead_stats.inprogress || 0);
        consolidated.completed += parseInt(data.campaign_lead_stats.completed || 0);
      }
    });

    consolidated.unique_leads = consolidated.total_leads;
    return consolidated;
  };

  const calculateMetrics = (data) => {
    const emails = parseInt(data.sent_count || 0);
    const replies = parseInt(data.reply_count || 0);
    const bounced = parseInt(data.bounce_count || 0);
    const interested = parseInt(data.campaign_lead_stats?.interested || 0);
    
    return {
      replyRate: emails > 0 ? ((replies / emails) * 100).toFixed(2) : '0.00',
      bounceRate: emails > 0 ? ((bounced / emails) * 100).toFixed(2) : '0.00',
      conversionRate: replies > 0 ? ((interested / replies) * 100).toFixed(2) : '0.00',
    };
  };

  const getTrendIndicator = (campaignId, metric) => {
    const history = historicalData[campaignId];
    if (!history || history.length < 2) return null;
    
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    
    const currentValue = parseInt(current[metric] || 0);
    const previousValue = parseInt(previous[metric] || 0);
    
    if (currentValue > previousValue) {
      const change = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
      return { direction: 'up', change };
    } else if (currentValue < previousValue) {
      const change = ((previousValue - currentValue) / previousValue * 100).toFixed(1);
      return { direction: 'down', change };
    }
    return { direction: 'same', change: '0' };
  };

  const downloadCSV = () => {
    const metrics = viewMode === 'consolidated' 
      ? { 'Consolidated': getConsolidatedMetrics() }
      : Object.entries(campaignData).reduce((acc, [id, data]) => {
          const calc = calculateMetrics(data);
          acc[id] = {
            unique_leads: data.total_count || 0,
            total_emails: data.sent_count || 0,
            total_replies: data.reply_count || 0,
            bounced: data.bounce_count || 0,
            unsubscribed: data.unsubscribed_count || 0,
            interested: data.campaign_lead_stats?.interested || 0,
            reply_rate: calc.replyRate,
            bounce_rate: calc.bounceRate,
            conversion_rate: calc.conversionRate
          };
          return acc;
        }, {});

    const headers = ['Campaign ID', 'Unique Leads', 'Total Emails', 'Total Replies', 'Positive Replies', 'Bounced', 'Unsubscribed', 'Reply Rate %', 'Bounce Rate %', 'Conversion Rate %'];
    const rows = Object.entries(metrics).map(([id, data]) => [
      id,
      data.unique_leads,
      data.total_emails,
      data.total_replies,
      data.interested,
      data.bounced,
      data.unsubscribed,
      data.reply_rate || 'N/A',
      data.bounce_rate || 'N/A',
      data.conversion_rate || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lovenotfear-metrics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported successfully!');
  };

  const downloadJSON = () => {
    const data = viewMode === 'consolidated' 
      ? { consolidated: getConsolidatedMetrics() }
      : campaignData;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lovenotfear-metrics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success('JSON exported successfully!');
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-2xl h-32`}></div>
        ))}
      </div>
      <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-2xl h-96`}></div>
    </div>
  );

  const MetricCard = ({ icon: Icon, label, value, color, trend, percentage }) => (
    <div className={`${
      theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
    } backdrop-blur-lg rounded-2xl border shadow-2xl p-6 hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className={`text-${color}-400`} size={32} />
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend.direction === 'up' ? 'text-green-400' : 
            trend.direction === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {trend.direction === 'up' && <ArrowUp size={16} />}
            {trend.direction === 'down' && <ArrowDown size={16} />}
            {trend.direction === 'same' && <Minus size={16} />}
            {trend.change}%
          </div>
        )}
      </div>
      <h3 className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} text-sm font-medium mb-1`}>{label}</h3>
      <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-3xl font-bold`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {percentage && (
        <div className="mt-3">
          <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
            <div 
              className={`bg-${color}-500 h-full transition-all duration-500`}
              style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
            />
          </div>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} text-xs mt-1`}>{percentage}%</p>
        </div>
      )}
    </div>
  );

  const renderCharts = () => {
    if (Object.keys(campaignData).length === 0) return null;

    const campaignComparison = Object.entries(campaignData).map(([id, data]) => ({
      name: data.name || id.slice(0, 8),
      emails: parseInt(data.sent_count || 0),
      replies: parseInt(data.reply_count || 0),
      interested: parseInt(data.campaign_lead_stats?.interested || 0),
      bounced: parseInt(data.bounce_count || 0),
    }));

    const consolidated = getConsolidatedMetrics();
    const leadStatusData = [
      { name: 'In Progress', value: consolidated.in_progress, color: COLORS[0] },
      { name: 'Completed', value: consolidated.completed, color: COLORS[1] },
      { name: 'Not Started', value: consolidated.not_started, color: COLORS[2] },
    ].filter(item => item.value > 0);

    const getHistoricalTrend = () => {
      const allHistory = Object.values(historicalData).flat();
      if (allHistory.length === 0) return [];
      
      const grouped = {};
      allHistory.forEach(entry => {
        const date = format(new Date(entry.timestamp), 'MMM dd');
        if (!grouped[date]) {
          grouped[date] = { date, emails: 0, replies: 0 };
        }
        grouped[date].emails += parseInt(entry.sent_count || 0);
        grouped[date].replies += parseInt(entry.reply_count || 0);
      });
      
      return Object.values(grouped).slice(-10);
    };

    const trendData = getHistoricalTrend();

    return (
      <div className="space-y-6 mt-8">
        <div className={`${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
        } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
          <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
            Campaign Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="emails" fill="#8b5cf6" name="Emails Sent" />
              <Bar dataKey="replies" fill="#10b981" name="Replies" />
              <Bar dataKey="interested" fill="#06b6d4" name="Interested" />
              <Bar dataKey="bounced" fill="#ef4444" name="Bounced" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leadStatusData.length > 0 && (
            <div className={`${
              theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
            } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
              <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                Lead Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          )}

          {trendData.length > 0 && (
            <div className={`${
              theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
            } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
              <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                Historical Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <Tooltip />
                  <Area type="monotone" dataKey="emails" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Emails" />
                  <Area type="monotone" dataKey="replies" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Replies" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMetrics = () => {
    if (viewMode === 'consolidated') {
      const consolidated = getConsolidatedMetrics();
      const metrics = calculateMetrics({
        sent_count: consolidated.total_emails,
        reply_count: consolidated.total_replies,
        bounce_count: consolidated.bounced,
        campaign_lead_stats: { interested: consolidated.interested }
      });

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard icon={Users} label="Unique Leads Contacted" value={consolidated.unique_leads} color="blue" />
          <MetricCard icon={Mail} label="Total Emails Sent" value={consolidated.total_emails} color="purple" />
          <MetricCard icon={Reply} label="Total Replies" value={consolidated.total_replies} color="green" percentage={metrics.replyRate} />
          <MetricCard icon={CheckCircle} label="Positive Replies" value={consolidated.interested} color="emerald" percentage={metrics.conversionRate} />
          <MetricCard icon={UserX} label="Bounced" value={consolidated.bounced} color="red" percentage={metrics.bounceRate} />
          <MetricCard icon={AlertCircle} label="Unsubscribed" value={consolidated.unsubscribed} color="orange" />
          <MetricCard icon={TrendingUp} label="In Progress" value={consolidated.in_progress} color="pink" />
          <MetricCard icon={Clock} label="Not Started" value={consolidated.not_started} color="slate" />
        </div>
      );
    } else {
      return Object.entries(campaignData)
        .filter(([id]) => {
          if (!searchTerm) return true;
          return id.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map(([campaignId, data]) => {
          const metrics = calculateMetrics(data);
          
          return (
            <div key={campaignId} className="mb-8">
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                Campaign: <span className="font-mono text-purple-400">{campaignId}</span>
                {data.name && <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} text-sm`}>({data.name})</span>}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  icon={Users} 
                  label="Unique Leads Contacted" 
                  value={parseInt(data.total_count || 0)} 
                  color="blue"
                  trend={getTrendIndicator(campaignId, 'total_count')}
                />
                <MetricCard 
                  icon={Mail} 
                  label="Total Emails Sent" 
                  value={parseInt(data.sent_count || 0)} 
                  color="purple"
                  trend={getTrendIndicator(campaignId, 'sent_count')}
                />
                <MetricCard 
                  icon={Reply} 
                  label="Total Replies" 
                  value={parseInt(data.reply_count || 0)} 
                  color="green"
                  percentage={metrics.replyRate}
                  trend={getTrendIndicator(campaignId, 'reply_count')}
                />
                <MetricCard 
                  icon={CheckCircle} 
                  label="Positive Replies" 
                  value={parseInt(data.campaign_lead_stats?.interested || 0)} 
                  color="emerald"
                  percentage={metrics.conversionRate}
                />
                <MetricCard 
                  icon={UserX} 
                  label="Bounced" 
                  value={parseInt(data.bounce_count || 0)} 
                  color="red"
                  percentage={metrics.bounceRate}
                />
                <MetricCard 
                  icon={AlertCircle} 
                  label="Unsubscribed" 
                  value={parseInt(data.unsubscribed_count || 0)} 
                  color="orange"
                />
                <MetricCard 
                  icon={TrendingUp} 
                  label="In Progress" 
                  value={parseInt(data.campaign_lead_stats?.inprogress || 0)} 
                  color="pink"
                />
                <MetricCard 
                  icon={Clock} 
                  label="Not Started" 
                  value={parseInt(data.campaign_lead_stats?.notStarted || 0)} 
                  color="slate"
                />
              </div>
            </div>
          );
        });
    }
  };

  const renderComparisonTable = () => {
    if (Object.keys(campaignData).length === 0) return null;

    const tableData = Object.entries(campaignData)
      .filter(([id]) => {
        if (!searchTerm) return true;
        return id.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map(([id, data]) => {
        const metrics = calculateMetrics(data);
        return {
          id,
          name: data.name || '-',
          leads: parseInt(data.total_count || 0),
          emails: parseInt(data.sent_count || 0),
          replies: parseInt(data.reply_count || 0),
          positive: parseInt(data.campaign_lead_stats?.interested || 0),
          bounced: parseInt(data.bounce_count || 0),
          unsubscribed: parseInt(data.unsubscribed_count || 0),
          replyRate: metrics.replyRate,
          bounceRate: metrics.bounceRate,
          conversionRate: metrics.conversionRate
        };
      });

    const consolidated = viewMode === 'consolidated' ? null : getConsolidatedMetrics();

    return (
      <div className={`${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
      } backdrop-blur-lg rounded-2xl border shadow-2xl p-6 mt-8`}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Campaign Comparison</h3>
          <div className="flex gap-2">
            <button 
              onClick={downloadCSV}
              className={`px-4 py-2 ${
                theme === 'dark' ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200'
              } border rounded-lg transition-all flex items-center gap-2`}
            >
              <Download size={16} />
              CSV
            </button>
            <button 
              onClick={downloadJSON}
              className={`px-4 py-2 ${
                theme === 'dark' ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200'
              } border rounded-lg transition-all flex items-center gap-2`}
            >
              <Download size={16} />
              JSON
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Campaign ID</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Name</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Leads</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Emails</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Replies</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Reply %</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Positive</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Conv %</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Bounced</th>
                <th className={`text-left py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>Bounce %</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-mono text-sm`}>{row.id}</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{row.name}</td>
                  <td className="py-3 px-4 text-blue-400">{row.leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-purple-400">{row.emails.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-400">{row.replies.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-500 font-semibold">{row.replyRate}%</td>
                  <td className="py-3 px-4 text-emerald-400">{row.positive.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-500 font-semibold">{row.conversionRate}%</td>
                  <td className="py-3 px-4 text-red-400">{row.bounced.toLocaleString()}</td>
                  <td className="py-3 px-4 text-red-500 font-semibold">{row.bounceRate}%</td>
                </tr>
              ))}
              {consolidated && viewMode === 'individual' && (
                <tr className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} font-semibold`}>
                  <td className="py-3 px-4 text-purple-400">TOTAL</td>
                  <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>-</td>
                  <td className="py-3 px-4 text-blue-400">{consolidated.unique_leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-purple-400">{consolidated.total_emails.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-400">{consolidated.total_replies.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-500">
                    {consolidated.total_emails > 0 ? ((consolidated.total_replies / consolidated.total_emails) * 100).toFixed(2) : '0.00'}%
                  </td>
                  <td className="py-3 px-4 text-emerald-400">{consolidated.interested.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-500">
                    {consolidated.total_replies > 0 ? ((consolidated.interested / consolidated.total_replies) * 100).toFixed(2) : '0.00'}%
                  </td>
                  <td className="py-3 px-4 text-red-400">{consolidated.bounced.toLocaleString()}</td>
                  <td className="py-3 px-4 text-red-500">
                    {consolidated.total_emails > 0 ? ((consolidated.bounced / consolidated.total_emails) * 100).toFixed(2) : '0.00'}%
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'
    } p-6 transition-colors duration-300`}>
      <Toaster position="top-right" />
      
      <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              LoveNotFear Outbound Metrics
            </span>
          </h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
            Comprehensive campaign performance metrics • Powered by Smartlead
          </p>
        </div>
        
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-3 rounded-xl ${
            theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
          } transition-all`}
        >
          {theme === 'dark' ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-purple-600" size={24} />}
        </button>
      </div>

      <div className={`mb-6 ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
      } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>API Configuration</h2>
        <input
          type="text"
          placeholder="Enter your Smartlead API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={`w-full px-4 py-3 ${
            theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder-slate-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
          } border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
      </div>

      <div className={`mb-6 ${
        theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
      } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Campaign Management</h2>
        
        <div className="flex gap-3 mb-4 flex-wrap">
          <button 
            onClick={fetchAvailableCampaigns}
            disabled={fetchingCampaigns || !apiKey}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Target size={20} />
            {fetchingCampaigns ? 'Loading...' : 'Fetch My Campaigns'}
          </button>
          
          <input
            type="text"
            placeholder="Enter Campaign ID"
            value={newCampaignId}
            onChange={(e) => setNewCampaignId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCampaign()}
            className={`flex-1 px-4 py-3 ${
              theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder-slate-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <button 
            onClick={addCampaign}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            Add
          </button>
          <button 
            onClick={fetchAllCampaigns}
            disabled={loading || campaigns.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Fetch Analytics'}
          </button>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-6 py-3 ${
              autoRefresh ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-500'
            } text-white rounded-xl font-medium flex items-center gap-2 transition-all`}
          >
            <RefreshCw size={20} className={autoRefresh ? 'animate-spin' : ''} />
            Auto-refresh {autoRefresh ? `(${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})` : 'Off'}
          </button>
        </div>

        {showCampaignSelector && (
          <div className={`mb-4 p-4 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
          } border rounded-xl max-h-96 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                Select Campaigns ({selectedCampaigns.length} selected)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={addSelectedCampaigns}
                  disabled={selectedCampaigns.length === 0}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  Add Selected
                </button>
                <button
                  onClick={() => {
                    setShowCampaignSelector(false);
                    setSelectedCampaigns([]);
                  }}
                  className={`px-4 py-2 ${
                    theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'
                  } rounded-lg transition-all`}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {allAvailableCampaigns.map((campaign) => (
                <label
                  key={campaign.id}
                  className={`flex items-center gap-3 p-3 ${
                    theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'
                  } rounded-lg cursor-pointer transition-all`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => toggleCampaignSelection(campaign.id)}
                    className="w-4 h-4 text-purple-500 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium truncate`}>
                      {campaign.name}
                    </p>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} text-sm font-mono`}>
                      {campaign.id}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {campaigns.map((id, index) => {
            const campaign = allAvailableCampaigns.find(c => c.id === id);
            return (
              <div key={index} className={`flex items-center gap-2 px-4 py-2 ${
                theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-gray-100 border-gray-300'
              } border rounded-lg`}>
                <div>
                  <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>
                    {campaign?.name || 'Unknown'}
                  </span>
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} text-xs ml-2 font-mono`}>
                    {id}
                  </span>
                </div>
                <button 
                  onClick={() => removeCampaign(id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/20 backdrop-blur-lg rounded-2xl border border-red-500/50 shadow-2xl p-6">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {loading && <LoadingSkeleton />}

      {/* View Mode & Search */}
      {!loading && Object.keys(campaignData).length > 0 && (
        <div className={`mb-6 ${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200'
        } backdrop-blur-lg rounded-2xl border shadow-2xl p-6`}>
          <div className="flex items-center gap-4 flex-wrap justify-between">
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('individual')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'individual' 
                    ? 'bg-purple-500/80 text-white' 
                    : theme === 'dark'
                      ? 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                      : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Individual View
              </button>
              <button 
                onClick={() => setViewMode('consolidated')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'consolidated' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : theme === 'dark'
                      ? 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                      : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Consolidated View
              </button>
            </div>
            
            {/* Search */}
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`} size={18} />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 ${
                    theme === 'dark' ? 'bg-white/5 border-white/20 text-white placeholder-slate-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Display */}
      {!loading && Object.keys(campaignData).length > 0 && renderMetrics()}

      {/* Charts */}
      {!loading && renderCharts()}

      {/* Comparison Table */}
      {!loading && renderComparisonTable()}

      <div className="mt-8 text-center text-slate-400 text-sm">
        <p>LoveNotFear Outbound Metrics • Data fetched from Smartlead API • Updated in real-time</p>
        <p className="mt-2">Made with ❤️ for better outbound campaigns</p>
      </div>
    </div>
  );
}
