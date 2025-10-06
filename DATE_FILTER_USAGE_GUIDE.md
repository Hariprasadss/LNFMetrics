# How to Use Date Filters & Historical Analytics

## Quick Start Guide

### Step 1: View Your Current Data
After fetching campaign analytics, you'll see all your metrics displayed by default (All Time view).

### Step 2: Access Date Filters
Look for the **"Date Range Filter"** section with a calendar icon. This appears after you have campaign data loaded.

### Step 3: Choose Your Filter Type

#### Option A: Quick Filters (One-Click)
Click any of these buttons for instant filtering:

1. **All Time** (Purple) - Shows all historical data
2. **Current Week** (Green) - Monday to Sunday of this week
3. **Past Week** (Blue) - Monday to Sunday of last week  
4. **This Month** (Cyan) - Current calendar month
5. **Week Selector** (Pink) - Navigate through weeks
6. **Custom Range** (Orange) - Pick any date range

#### Option B: Week Selector (Navigate Weeks)
1. Click the **"Week Selector"** button
2. Use **←** (previous) and **→** (next) buttons to navigate
3. See the week range displayed in the center
4. Labels automatically update: "This Week", "Last Week", "2 Weeks Ago", etc.

#### Option C: Custom Date Range
1. Click the **"Custom Range"** button
2. Select **Start Date** from the first date picker
3. Select **End Date** from the second date picker
4. Your selected range will be shown below in a purple info box

### Step 4: View Historical Trends

Once you have data from multiple weeks, scroll down to see:

#### 📊 Week-over-Week Performance Summary
- **Top section** shows 3 key metrics with % change from last week
- **Green arrows** (↑) = improvement
- **Red arrows** (↓) = decline
- Shows both current and previous week values

#### 📈 Week-over-Week Performance Trends Chart
- **Bar chart** shows last 8 weeks of data
- **Purple bars** = Emails Sent
- **Green bars** = Total Replies
- **Cyan bars** = Interested Leads
- **Orange line** = Reply Rate %
- **Pink line** = Conversion %
- X-axis shows week ranges (e.g., "Dec 16 - Dec 22")

#### 📊 Campaign Performance Comparison
- Side-by-side comparison of all your campaigns
- Quick visual to see which campaigns perform best

#### 🥧 Lead Status Distribution
- Pie chart showing In Progress, Completed, and Not Started
- Percentages automatically calculated

#### 📉 Recent Activity Trend
- Shows daily activity over the last 10 data points
- Tracks emails, replies, and interested leads

### Step 5: Week-over-Week Analysis

To see improvements or declines week-by-week:

1. Switch to **Consolidated View** for overall performance
2. Look at the **Week-over-Week Performance Summary** card
3. Check the percentage changes:
   - **Positive %** = Performance improved
   - **Negative %** = Performance declined
4. Use the **Week-over-Week Trends Chart** to see patterns over time

### Step 6: Export Filtered Data

1. After applying any date filter
2. Scroll to the **Campaign Comparison** table
3. Click **CSV** or **JSON** button to download
4. Exported data will reflect your active date filter

## Tips & Best Practices

### 📅 Understanding Week Boundaries
- All weeks run **Monday through Sunday**
- "Current Week" starts on the most recent Monday
- "Past Week" is the complete Monday-Sunday week before current

### 📊 Building Historical Data
- Fetch analytics regularly to build trend history
- Use **Auto-refresh** to keep data current
- Historical data stores up to 30 data points per campaign
- Data persists in browser localStorage

### 🎯 Finding Patterns
1. Look for consistent upward trends in reply rates
2. Check if certain weeks perform better (seasonal patterns)
3. Compare week-over-week to identify improvements from changes
4. Use monthly view for broader trends

### 💡 Common Use Cases

**Weekly Performance Review**
- Select "Current Week"
- Compare with "Past Week"
- Check week-over-week summary for quick insights

**Monthly Reporting**
- Select "This Month"
- Export CSV for stakeholder reports
- View trends chart for visual presentation

**Historical Analysis**
- Use "Week Selector" to review specific past weeks
- Compare same week from different periods
- Identify seasonal patterns or campaign changes impact

**Custom Period Analysis**
- Use "Custom Range" for quarter reviews
- Select specific campaign launch periods
- Compare before/after major changes

## Troubleshooting

### "No historical trend data showing"
- **Cause**: Need at least 2 data fetches to show trends
- **Solution**: Fetch analytics multiple times over different days/weeks

### "Week selector not working"
- **Cause**: Future weeks are disabled (can't see future data)
- **Solution**: Use left arrow to go to past weeks only

### "Custom range not filtering"
- **Cause**: Start and End dates not both selected
- **Solution**: Make sure both date fields are filled in

### "Charts look empty"
- **Cause**: Selected date range has no data
- **Solution**: Try "All Time" filter or select a different range

## Advanced Features

### Auto-Refresh with Date Filters
- Date filters work with auto-refresh
- Data updates within your selected date range
- Useful for monitoring current week performance live

### Multiple Campaign Filtering
- Date filters apply to all campaigns
- Use search to focus on specific campaigns
- Switch between Individual and Consolidated views

### Data Persistence
- Selected filters remain active until changed
- Historical data saved across browser sessions
- Clear browser data to reset (if needed)

---

**Need Help?** 
- All trends calculate automatically once you have historical data
- Monday-Sunday weeks are used consistently throughout
- Percentage changes compare current vs previous period

**Pro Tip**: Enable auto-refresh and set it to fetch every 5 minutes during active campaign periods to build detailed hourly/daily trends!
