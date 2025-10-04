import React, { useState } from 'react';
import { Users, Mail, Reply, UserX, Download, Plus, Trash2, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function SmartleadAnalyticsDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaignId, setNewCampaignId] = useState('');
  const [apiKey, setApiKey] = useState('f7e5fb41-4c80-4d9d-b408-bb0ac198c057_2gsazuh');
  const [viewMode, setViewMode] = useState('individual');
  const [campaignData, setCampaignData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCampaign = () => {
    if (newCampaignId && !campaigns.includes(newCampaignId)) {
      setCampaigns([...campaigns, newCampaignId]);
      setNewCampaignId('');
    }
  };

  const removeCampaign = (id) => {
    setCampaigns(campaigns.filter(c => c !== id));
    const newData = { ...campaignData };
    delete newData[id];
    setCampaignData(newData);
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
      setError('Please add at least one campaign ID');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const results = {};
      for (const campaignId of campaigns) {
        const data = await fetchCampaignAnalytics(campaignId);
        results[campaignId] = data;
      }
      setCampaignData(results);
    } catch (err) {
      setError(err.message);
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
      completed: 0,
      blocked: 0,
      paused: 0,
      stopped: 0
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
        consolidated.blocked += parseInt(data.campaign_lead_stats.blocked || 0);
        consolidated.paused += parseInt(data.campaign_lead_stats.paused || 0);
        consolidated.stopped += parseInt(data.campaign_lead_stats.stopped || 0);
      }
    });

    consolidated.unique_leads = consolidated.total_leads;
    
    return consolidated;
  };

  const downloadCSV = () => {
    const metrics = viewMode === 'consolidated' 
      ? { 'Consolidated': getConsolidatedMetrics() }
      : Object.entries(campaignData).reduce((acc, [id, data]) => {
          acc[id] = {
            unique_leads: data.total_count || 0,
            total_emails: data.sent_count || 0,
            total_replies: data.reply_count || 0,
            bounced: data.bounce_count || 0,
            unsubscribed: data.unsubscribed_count || 0,
            interested: data.campaign_lead_stats?.interested || 0
          };
          return acc;
        }, {});

    const headers = ['Campaign ID', 'Unique Leads', 'Total Emails', 'Total Replies', 'Positive Replies', 'Bounced', 'Unsubscribed'];
    const rows = Object.entries(metrics).map(([id, data]) => [
      id,
      data.unique_leads,
      data.total_emails,
      data.total_replies,
      data.interested,
      data.bounced,
      data.unsubscribed
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartlead-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const MetricCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 hover:scale-105 transition-transform">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`text-${color}-400`} size={32} />
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
      <p className="text-white text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );

  const renderMetrics = () => {
    if (viewMode === 'consolidated') {
      const consolidated = getConsolidatedMetrics();
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard icon={Users} label="Unique Leads Contacted" value={consolidated.unique_leads} color="blue" />
          <MetricCard icon={Mail} label="Total Emails Sent" value={consolidated.total_emails} color="purple" />
          <MetricCard icon={Reply} label="Total Replies" value={consolidated.total_replies} color="green" />
          <MetricCard icon={CheckCircle} label="Positive Replies" value={consolidated.interested} color="emerald" />
          <MetricCard icon={UserX} label="Bounced" value={consolidated.bounced} color="red" />
          <MetricCard icon={AlertCircle} label="Unsubscribed" value={consolidated.unsubscribed} color="orange" />
          <MetricCard icon={TrendingUp} label="In Progress" value={consolidated.in_progress} color="pink" />
          <MetricCard icon={Clock} label="Not Started" value={consolidated.not_started} color="slate" />
        </div>
      );
    } else {
      return Object.entries(campaignData).map(([campaignId, data]) => (
        <div key={campaignId} className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            Campaign: <span className="font-mono text-purple-400">{campaignId}</span>
            {data.name && <span className="text-slate-400 text-sm">({data.name})</span>}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard icon={Users} label="Unique Leads Contacted" value={parseInt(data.total_count || 0)} color="blue" />
            <MetricCard icon={Mail} label="Total Emails Sent" value={parseInt(data.sent_count || 0)} color="purple" />
            <MetricCard icon={Reply} label="Total Replies" value={parseInt(data.reply_count || 0)} color="green" />
            <MetricCard icon={CheckCircle} label="Positive Replies" value={parseInt(data.campaign_lead_stats?.interested || 0)} color="emerald" />
            <MetricCard icon={UserX} label="Bounced" value={parseInt(data.bounce_count || 0)} color="red" />
            <MetricCard icon={AlertCircle} label="Unsubscribed" value={parseInt(data.unsubscribed_count || 0)} color="orange" />
            <MetricCard icon={TrendingUp} label="In Progress" value={parseInt(data.campaign_lead_stats?.inprogress || 0)} color="pink" />
            <MetricCard icon={Clock} label="Not Started" value={parseInt(data.campaign_lead_stats?.notStarted || 0)} color="slate" />
          </div>
        </div>
      ));
    }
  };

  const renderComparisonTable = () => {
    if (Object.keys(campaignData).length === 0) return null;

    const tableData = Object.entries(campaignData).map(([id, data]) => ({
      id,
      name: data.name || '-',
      leads: parseInt(data.total_count || 0),
      emails: parseInt(data.sent_count || 0),
      replies: parseInt(data.reply_count || 0),
      positive: parseInt(data.campaign_lead_stats?.interested || 0),
      bounced: parseInt(data.bounce_count || 0),
      unsubscribed: parseInt(data.unsubscribed_count || 0)
    }));

    const consolidated = viewMode === 'consolidated' ? null : getConsolidatedMetrics();

    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-semibold">Campaign Comparison</h3>
          <button 
            onClick={downloadCSV}
            className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Campaign ID</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Leads</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Emails</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Replies</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Positive</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Bounced</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Unsub</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white font-mono">{row.id}</td>
                  <td className="py-3 px-4 text-white">{row.name}</td>
                  <td className="py-3 px-4 text-blue-400">{row.leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-purple-400">{row.emails.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-400">{row.replies.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400">{row.positive.toLocaleString()}</td>
                  <td className="py-3 px-4 text-red-400">{row.bounced.toLocaleString()}</td>
                  <td className="py-3 px-4 text-orange-400">{row.unsubscribed.toLocaleString()}</td>
                </tr>
              ))}
              {consolidated && viewMode === 'individual' && (
                <tr className="bg-white/5 font-semibold">
                  <td className="py-3 px-4 text-purple-300">CONSOLIDATED</td>
                  <td className="py-3 px-4 text-white">-</td>
                  <td className="py-3 px-4 text-blue-400">{consolidated.unique_leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-purple-400">{consolidated.total_emails.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-400">{consolidated.total_replies.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400">{consolidated.interested.toLocaleString()}</td>
                  <td className="py-3 px-4 text-red-400">{consolidated.bounced.toLocaleString()}</td>
                  <td className="py-3 px-4 text-orange-400">{consolidated.unsubscribed.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Smartlead Analytics Dashboard
        </h1>
        <p className="text-slate-400">Comprehensive campaign performance metrics</p>
      </div>

      <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
        <input
          type="text"
          placeholder="Enter your Smartlead API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Campaign Management</h2>
        
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter Campaign ID"
            value={newCampaignId}
            onChange={(e) => setNewCampaignId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCampaign()}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        </div>

        <div className="flex flex-wrap gap-2">
          {campaigns.map((id, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg">
              <span className="text-white font-mono">{id}</span>
              <button 
                onClick={() => removeCampaign(id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(campaignData).length > 0 && (
        <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex items-center gap-4 flex-wrap justify-between">
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('individual')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'individual' 
                    ? 'bg-purple-500/80 text-white' 
                    : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Individual View
              </button>
              <button 
                onClick={() => setViewMode('consolidated')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'consolidated' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Consolidated View
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-500/20 backdrop-blur-lg rounded-2xl border border-red-500/50 shadow-2xl p-6">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {Object.keys(campaignData).length > 0 && renderMetrics()}

      {renderComparisonTable()}

      <div className="mt-8 text-center text-slate-400 text-sm">
        <p>Data fetched from Smartlead API • Updated in real-time</p>
      </div>
    </div>
  );
}
