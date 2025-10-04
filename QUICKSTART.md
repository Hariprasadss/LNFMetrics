# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Open the Dashboard
The development server is already running!

**Open in browser:** http://localhost:5173/

### Step 2: Configure API Key
1. Look for the "API Configuration" section at the top
2. Enter your Smartlead API key
3. Your key will be saved automatically for future sessions

### Step 3: Load Your Campaigns
Two methods available:

#### Method A: Fetch All Campaigns (Recommended)
1. Click the **"Fetch My Campaigns"** button (cyan button)
2. A modal appears showing all your campaigns
3. Check the boxes next to campaigns you want to track
4. Click **"Add Selected"**

#### Method B: Manual Entry (Legacy)
1. Type a campaign ID
2. Click **"Add"**
3. Repeat for each campaign

### Step 4: Fetch Analytics
1. Click the green **"Fetch Analytics"** button
2. Watch the beautiful loading animation
3. Your data appears with charts and metrics!

### Step 5: Explore Features

#### 🎨 Try Dark/Light Mode
- Click the sun/moon icon in the top-right corner
- Watch everything smoothly transition

#### 📊 View Your Charts
Scroll down to see:
- Bar chart comparing campaigns
- Pie chart of lead status
- Area chart of historical trends

#### 🔍 Search Campaigns
- Type in the search box to filter campaigns
- Works on both cards and table

#### 🔄 Enable Auto-Refresh
- Click the **"Auto-refresh"** button
- Watch the countdown timer
- Data refreshes automatically every 5 minutes

#### 💾 Export Your Data
- Scroll to the comparison table
- Click **CSV** or **JSON** to download

#### 📈 Check Trends
- Look for up/down arrows on metrics
- Green arrow = improving
- Red arrow = declining

## 🎯 Pro Tips

### Maximize Your Insights
1. **Use Individual View** to see trend indicators per campaign
2. **Switch to Consolidated View** for total overview
3. **Enable Auto-refresh** during active campaigns
4. **Check percentage metrics** (Reply Rate, Bounce Rate, Conversion Rate)
5. **Export data regularly** for historical analysis

### Understand Your Metrics
- **Reply Rate > 3%**: Excellent performance
- **Bounce Rate < 2%**: Good email hygiene
- **Conversion Rate > 50%**: Strong messaging

### Optimize Performance
- Add only active campaigns to reduce load time
- Use search to find specific campaigns quickly
- Export data before major changes for comparison

## 🐛 Troubleshooting

### No Campaigns Loading?
✅ Check your API key is correct
✅ Ensure you have active campaigns in Smartlead
✅ Check browser console (F12) for errors

### Data Not Updating?
✅ Click "Fetch Analytics" again
✅ Check your internet connection
✅ Verify API key permissions

### Charts Not Showing?
✅ Fetch analytics first to populate data
✅ Ensure campaigns have activity
✅ Try refreshing the browser

## 📱 Mobile Usage

The dashboard works great on mobile!
- All features are touch-friendly
- Charts are fully responsive
- Tables scroll horizontally
- Buttons stack vertically on small screens

## ⌨️ Keyboard Shortcuts

- **Enter** on campaign input → Add campaign
- **Escape** on modal → Close modal
- **F12** → Open developer tools

## 🎨 Customization Options

Want to change something? Here's where to look:

### Change Auto-Refresh Interval
Edit `src/App.jsx`, line ~35:
```javascript
const [refreshInterval, setRefreshInterval] = useState(300); // Change 300
```

### Modify Chart Colors
Edit `src/App.jsx`, line ~45:
```javascript
const COLORS = ['#8b5cf6', '#ec4899', ...]; // Add your colors
```

### Adjust Historical Data Limit
Edit `src/App.jsx`, line ~165:
```javascript
if (newHistory[id].length > 30) { // Change 30
```

## 📊 Understanding Your Dashboard

### Metric Cards (Top Section)
8 cards showing key metrics with:
- Icon representation
- Current value
- Trend indicator (if historical data available)
- Progress bar (for percentage metrics)

### Charts Section (Middle)
- **Bar Chart**: Compare all campaigns side-by-side
- **Pie Chart**: See lead distribution across statuses
- **Area Chart**: Track email/reply trends over time

### Comparison Table (Bottom)
Complete data table with:
- All campaign metrics
- Calculated percentages
- Total row (in Individual View)
- Sort by clicking headers

## 🎉 Next Steps

Now that you're set up:
1. ✅ Set up auto-refresh for real-time monitoring
2. ✅ Toggle to consolidated view for overview
3. ✅ Export your first report
4. ✅ Try the search functionality
5. ✅ Switch between themes
6. ✅ Check historical trends (after multiple fetches)

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- See `FEATURES.md` for complete feature list
- Review `VISUAL_GUIDE.md` for UI reference
- Open an issue on GitHub

## 🚀 Deploy to Production

Ready to deploy? See deployment section in README.md

**Recommended:** Deploy to Netlify in 2 minutes
1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically!

---

**Enjoy your enhanced analytics dashboard!** 🎊

Questions? Check the documentation or open an issue.
