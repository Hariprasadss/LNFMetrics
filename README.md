# 🚀 LoveNotFear Outbound Metrics# 🚀 Smartlead Analytics Dashboard - Enhanced Edition# Smartlead Analytics Dashboard



> **Made with ❤️ for better outbound campaigns**



A **professional analytics dashboard** for tracking email outbound campaigns via Smartlead API. Built with React, Vite, Tailwind CSS, and Recharts for stunning visualizations and real-time insights.A **professional, feature-rich analytics dashboard** for Smartlead campaigns built with React, Vite, Tailwind CSS, and Recharts. Track your email campaigns with stunning visualizations, real-time insights, and powerful analytics tools.A modern, real-time analytics dashboard for Smartlead campaigns with glassmorphic UI design.



![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)

![React](https://img.shields.io/badge/React-18.2.0-blue)

![Vite](https://img.shields.io/badge/Vite-5.0-purple)![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)## Features



## ✨ Key Features![React](https://img.shields.io/badge/React-18.2.0-blue)



### 📊 **Analytics & Visualizations**![Vite](https://img.shields.io/badge/Vite-5.0-purple)- 📊 Real-time campaign analytics

- **Interactive Charts** - Bar, Pie, and Area charts with tooltips

- **Real-time Metrics** - 8 key performance indicators- 🎯 Multi-campaign tracking

- **Trend Analysis** - Up/down arrows showing performance changes

- **Historical Tracking** - Store and compare up to 30 data points## ✨ Features Overview- 📈 Individual & consolidated views



### 🎯 **Campaign Management**- 💾 CSV export functionality

- **Fetch All Campaigns** - Retrieve all campaigns from Smartlead API

- **Smart Selection** - Checkbox interface for easy campaign selection### 🎯 **Campaign Management**- 🎨 Modern glassmorphic dark UI

- **Campaign Names** - Display names alongside IDs

- **Quick Actions** - One-click remove and refresh- **Fetch All Campaigns**: Automatically retrieve all your campaigns from Smartlead API- 📱 Fully responsive design



### 📈 **Performance Metrics**- **Smart Selection**: Select multiple campaigns with an intuitive checkbox interface

- **Reply Rate %** - (Replies / Emails Sent) × 100

- **Bounce Rate %** - (Bounced / Emails Sent) × 100- **Campaign Names**: Display campaign names alongside IDs for easy identification## Metrics Tracked

- **Conversion Rate %** - (Positive Replies / Total Replies) × 100

- **Progress Bars** - Visual percentage indicators- **Quick Remove**: Remove campaigns with a single click



### 🔄 **Auto-Refresh**- Unique Leads Contacted

- **Configurable Intervals** - Default 5-minute refresh

- **Countdown Timer** - Visual countdown display (MM:SS)### 📊 **Interactive Charts & Visualizations**- Total Emails Sent

- **Toggle Control** - Enable/disable as needed

- **Bar Charts**: Compare campaign performance side-by-side- Total Replies

### 🎨 **Theme System**

- **Dark Mode** - Beautiful dark theme with gradients- **Pie Charts**: Visualize lead status distribution- Positive Replies (Interested)

- **Light Mode** - Clean, professional light theme

- **Smooth Transitions** - Seamless theme switching- **Area Charts**: Track historical trends over time- Bounced Emails

- **Persistent Preference** - Saves to localStorage

- **Progress Bars**: Visual percentage indicators on metric cards- Unsubscribed Leads

### 💾 **Data Management**

- **localStorage Caching** - Instant load times- **Real-time Updates**: Charts update automatically with new data- In Progress Campaigns

- **Historical Data** - Track trends over time

- **Export Options** - CSV and JSON downloads- Not Started Campaigns

- **Smart Storage** - Automatic data cleanup

### ⏱️ **Loading & Performance**

### 🔍 **Search & Filter**

- **Real-time Search** - Filter campaigns instantly- **Animated Skeletons**: Beautiful loading placeholders while fetching data## Installation

- **Table Filtering** - Search applies to all views

- **Case-insensitive** - Flexible searching- **Timeline Display**: Visual feedback during data retrieval



### 🔔 **Notifications**- **Optimized Rendering**: Fast and smooth UI updates\`\`\`bash

- **Toast Alerts** - Success/error/loading messages

- **Non-intrusive** - Beautiful, subtle notifications- **Data Caching**: localStorage caching for instant load times# Install dependencies

- **Status Updates** - Clear feedback for all actions

npm install

### 📱 **Responsive Design**

- **Mobile Optimized** - Perfect on all screen sizes### 📈 **Advanced Metrics & Analytics**

- **Touch Friendly** - Enhanced touch interactions

- **Adaptive Layouts** - Smart grid systems- **Reply Rate %**: Track email reply effectiveness# Run development server



## 🛠️ Tech Stack- **Bounce Rate %**: Monitor email deliverabilitynpm run dev



- **React 18** - Modern UI framework- **Conversion Rate %**: Measure positive response conversion

- **Vite** - Lightning-fast build tool

- **Tailwind CSS** - Utility-first styling- **Trend Indicators**: Up/down arrows with percentage changes# Build for production

- **Recharts** - Interactive chart library

- **date-fns** - Date manipulation- **Historical Tracking**: Store and compare past data pointsnpm run build

- **react-hot-toast** - Notification system

- **Lucide React** - Beautiful icons- **8 Key Metrics**: Comprehensive campaign insights\`\`\`



## 🚀 Getting Started



### Prerequisites### 🔄 **Auto-Refresh System**## Deployment to Netlify

- Node.js 16+ installed

- Smartlead API key- **Configurable Intervals**: Set custom refresh rates (default: 5 minutes)



### Installation- **Countdown Timer**: Visual countdown to next refresh### Method 1: GitHub + Netlify Dashboard



1. **Clone the repository**- **Toggle On/Off**: Enable/disable auto-refresh as needed1. Push this repository to GitHub

   ```bash

   git clone https://github.com/Hariprasadss/LNFMetrics.git- **Smart Updates**: Only refreshes when campaigns are loaded2. Go to [Netlify](https://netlify.com)

   cd LNFMetrics

   ```3. Click "Add new site" > "Import an existing project"



2. **Install dependencies**### 🎨 **Theme System**4. Connect your GitHub repository

   ```bash

   npm install- **Dark Mode**: Beautiful dark theme with gradient backgrounds5. Netlify will automatically detect settings from `netlify.toml`

   ```

- **Light Mode**: Clean, professional light theme6. Click "Deploy"

3. **Start development server**

   ```bash- **Smooth Transitions**: Seamless theme switching

   npm run dev

   ```- **Persistent Settings**: Theme preference saved to localStorage### Method 2: Netlify CLI

   Server will start at `http://localhost:5173`

\`\`\`bash

4. **Build for production**

   ```bash### 🔍 **Search & Filter**# Install Netlify CLI

   npm run build

   ```- **Campaign Search**: Instantly filter campaigns by ID or namenpm install -g netlify-cli



5. **Preview production build**- **Real-time Results**: Live search as you type

   ```bash

   npm run preview- **Table Filtering**: Search applies to comparison table# Login to Netlify

   ```

netlify login

## 📖 Quick Start Guide

### 📥 **Export Options**

### Step 1: Configure API

1. Enter your Smartlead API key in the configuration section- **CSV Export**: Download data in spreadsheet format# Deploy

2. Key is automatically saved for future sessions

- **JSON Export**: Export raw data for custom processingnetlify deploy --prod

### Step 2: Select Campaigns

1. Click **"Fetch My Campaigns"** button (cyan)- **Enhanced Data**: Includes all metrics and calculated percentages\`\`\`

2. Select campaigns using checkboxes in the modal

3. Click **"Add Selected"**- **Timestamped Files**: Automatic date stamping



### Step 3: Fetch Analytics### Method 3: Drag & Drop

1. Click **"Fetch Analytics"** button (green)

2. Watch the animated loading skeletons### 🔔 **Notification System**1. Run `npm run build`

3. View your data with charts and metrics!

- **Toast Notifications**: Beautiful, non-intrusive alerts2. Go to [Netlify Drop](https://app.netlify.com/drop)

### Step 4: Explore

- Toggle dark/light theme (sun/moon icon)- **Success Messages**: Confirm successful operations3. Drag the `dist` folder to deploy

- Search for campaigns

- Enable auto-refresh- **Error Handling**: Clear error messages with context

- Export data as CSV/JSON

- View trend indicators- **Loading States**: Progress indicators for async operations## Usage



## 📊 Metrics Tracked



| Metric | Description |### 💾 **Data Management**1. Enter your Smartlead API key in the configuration section

|--------|-------------|

| **Unique Leads** | Total leads contacted |- **localStorage Caching**: Instant load times on return visits2. Add one or more campaign IDs you want to track

| **Emails Sent** | All emails across sequences |

| **Total Replies** | Responses received |- **Historical Data**: Track up to 30 data points per campaign3. Click "Fetch Analytics" to load real-time data

| **Reply Rate** | (Replies / Emails) × 100 |

| **Positive Replies** | Interested responses |- **Smart Storage**: Automatic cleanup of old data4. Toggle between "Individual View" and "Consolidated View"

| **Conversion Rate** | (Positive / Replies) × 100 |

| **Bounced** | Failed deliveries |- **Data Persistence**: Survive page refreshes5. Export data as CSV for external reporting

| **Bounce Rate** | (Bounced / Emails) × 100 |

| **Unsubscribed** | Opt-outs |

| **In Progress** | Active leads |

| **Not Started** | Pending leads |### 📱 **Responsive Design**## API Key

| **Completed** | Finished sequences |

- **Mobile Optimized**: Perfect on all screen sizes

## 🎨 Views & Modes

- **Touch Friendly**: Enhanced touch interactionsGet your API key from:

### Individual View

- Detailed metrics per campaign- **Adaptive Layouts**: Grid systems adjust automatically- Login to Smartlead

- Trend indicators (up/down arrows)

- Historical comparison- **Tablet Support**: Optimized for medium screens- Go to Settings > API

- Campaign-specific insights

- Click "Activate API"

### Consolidated View

- Aggregate data across all campaigns### 📊 **View Modes**- Copy your API key

- Total performance overview

- Combined metrics- **Individual View**: Detailed metrics per campaign with trends

- Portfolio-level insights

- **Consolidated View**: Aggregate data across all campaigns## Tech Stack

### Comparison Table

- Side-by-side campaign comparison- **Comparison Table**: Side-by-side campaign comparison

- All metrics in one view

- Sortable columns- **Total Row**: Automatic totals in individual view- **React 18** - UI Framework

- Total row with aggregates

- **Vite** - Build Tool

## 🎯 Charts Available

## 🛠️ Tech Stack- **Tailwind CSS** - Styling

1. **Bar Chart** - Compare campaign performance

   - Emails sent- **Lucide React** - Icons

   - Replies received

   - Interested leads- **React 18** - Modern UI framework- **Smartlead API** - Data Source

   - Bounced emails

- **Vite** - Lightning-fast build tool

2. **Pie Chart** - Lead status distribution

   - In Progress- **Tailwind CSS** - Utility-first styling## Smartlead API Endpoints Used

   - Completed

   - Not Started- **Recharts** - Beautiful chart library

   - Paused/Blocked/Stopped

- **date-fns** - Date manipulation- `GET /api/v1/campaigns/{campaign_id}/analytics` - Fetch campaign analytics

3. **Area Chart** - Historical trends

   - Email volume over time- **react-hot-toast** - Notification system

   - Reply trends

   - Last 10 data points- **Lucide React** - Icon library## License



## 💡 Pro Tips



### Maximize Your Insights## 🚀 Getting StartedMIT License - Feel free to use this project for personal or commercial purposes.

1. **Enable Auto-refresh** during active campaigns

2. **Use Individual View** to spot problem campaigns\`\`\`

3. **Check Trend Arrows** for quick performance assessment

4. **Export Regularly** for historical analysis### Prerequisites

5. **Set Goals** for reply/bounce/conversion rates

- Node.js 16+ installed---

### Performance Benchmarks

- **Reply Rate > 3%** - Excellent- Smartlead API key

- **Bounce Rate < 2%** - Good email hygiene

- **Conversion Rate > 50%** - Strong messaging## 🚀 Quick Start Instructions



## 🚀 Deployment### Installation



### Deploy to Netlify (Recommended)1. **Create Project Folder**

1. Push code to GitHub

2. Connect repository to Netlify1. **Clone the repository**```bash

3. Build command: `npm run build`

4. Publish directory: `dist`   ```bash   mkdir smartlead-analytics-dashboard

5. Deploy!

   git clone https://github.com/Hariprasadss/LNFMetrics.git   cd smartlead-analytics-dashboard

Configuration is already included in `netlify.toml`

   cd LNFMetrics

### Deploy to Vercel   ```

1. Import project to Vercel

2. Framework preset: Vite2. **Install dependencies**

3. Deploy automatically!   ```bash

   npm install

## 🐛 Troubleshooting   ```



### No Campaigns Loading?3. **Start development server**

✅ Verify API key is correct   ```bash

✅ Check browser console (F12) for errors   npm run dev

✅ Ensure active campaigns exist in Smartlead   ```

   Server will start at `http://localhost:5173`

### Data Not Updating?

✅ Click "Fetch Analytics" again4. **Build for production**

✅ Check internet connection   ```bash

✅ Verify API key permissions   npm run build

   ```

### Charts Not Showing?

✅ Fetch analytics first5. **Preview production build**

✅ Ensure campaigns have activity   ```bash

✅ Try refreshing browser   npm run preview

   ```

## 📚 Documentation

## 📖 Usage Guide

- **QUICKSTART.md** - 5-minute getting started guide

- **FEATURES.md** - Complete feature list### Step 1: API Configuration

- **VISUAL_GUIDE.md** - UI reference1. Enter your Smartlead API key in the API Configuration section

- **COMPLETION_SUMMARY.md** - Implementation details2. The key is stored locally for convenience



## 🤝 Contributing### Step 2: Campaign Selection

1. Click **"Fetch My Campaigns"** to load all available campaigns

Contributions welcome! Please:2. A modal will appear with all your campaigns

1. Fork the repository3. Select campaigns using checkboxes

2. Create a feature branch4. Click **"Add Selected"** to add them to your dashboard

3. Commit your changes

4. Push to the branch### Step 3: Fetch Analytics

5. Open a Pull Request1. Click **"Fetch Analytics"** to retrieve campaign data

2. Watch the loading skeleton animation

## 📄 License3. Data appears with beautiful transitions



MIT License - free to use for personal or commercial purposes.### Step 4: Explore Features

- **Toggle Themes**: Click sun/moon icon in header

## 🙏 Acknowledgments- **Switch Views**: Use Individual/Consolidated view buttons

- **Search**: Type in search box to filter campaigns

- **Smartlead** - Amazing email automation platform- **Auto-refresh**: Enable to keep data current

- **Recharts** - Beautiful chart library- **Export**: Download data as CSV or JSON

- **Tailwind CSS** - Rapid UI development

- **Lucide** - Gorgeous icon set## 📊 Metrics Explained



## 📞 Support| Metric | Description |

|--------|-------------|

Having issues? Open an issue on GitHub or contact the maintainer.| **Unique Leads Contacted** | Total number of unique leads in campaign |

| **Total Emails Sent** | All emails sent across sequences |

---| **Total Replies** | Number of responses received |

| **Reply Rate %** | (Replies / Emails Sent) × 100 |

**Made with ❤️ by LoveNotFear**| **Positive Replies** | Interested/positive responses |

| **Conversion Rate %** | (Positive / Total Replies) × 100 |

Track your outbound campaigns with confidence and clarity! 🚀| **Bounced** | Failed email deliveries |

| **Bounce Rate %** | (Bounced / Emails Sent) × 100 |

⭐ Star this repo if you find it helpful!| **Unsubscribed** | Leads who opted out |

| **In Progress** | Currently active leads |
| **Not Started** | Leads pending outreach |
| **Completed** | Finished sequences |

## 🎯 Key Features in Detail

### Campaign Fetching System
The dashboard now integrates directly with Smartlead's campaign list API, allowing you to:
- View all available campaigns with names
- Select multiple campaigns at once
- Avoid manual ID entry
- See campaign metadata

### Historical Data Tracking
Every time you fetch analytics, the data is stored with a timestamp:
- Compare current vs previous performance
- See trend indicators (up/down arrows)
- Track improvements over time
- Visualize trends in area charts

### Smart Caching
Data is intelligently cached to provide:
- Instant page loads on return visits
- Offline viewing of last fetched data
- Reduced API calls
- Better user experience

## 🎨 Customization

### Changing Auto-Refresh Interval
Edit the `refreshInterval` state in `App.jsx`:
```javascript
const [refreshInterval, setRefreshInterval] = useState(300); // seconds
```

### Adding Custom Metrics
Extend the `calculateMetrics` function to add new calculations:
```javascript
const calculateMetrics = (data) => {
  // Add your custom metrics here
  return { replyRate, bounceRate, conversionRate, customMetric };
};
```

### Modifying Chart Colors
Update the `COLORS` array in `App.jsx`:
```javascript
const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
```

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is valid and active
- Check API key permissions in Smartlead dashboard
- Try re-entering the API key

### No Campaigns Loading
- Verify API key has campaign access
- Check browser console for errors
- Ensure you have active campaigns in Smartlead

### Charts Not Displaying
- Fetch analytics first to populate data
- Ensure campaigns have data points
- Check browser compatibility (modern browsers required)

## 🚀 Deployment

### Deploy to Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

Configuration is already included in `netlify.toml`

### Deploy to Vercel
1. Import project to Vercel
2. Framework preset: Vite
3. Deploy!

## 📝 Environment Variables

For production, consider using environment variables:
```env
VITE_SMARTLEAD_API_URL=https://server.smartlead.ai/api/v1
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Smartlead** - For the amazing email automation platform
- **Recharts** - For beautiful, responsive charts
- **Tailwind CSS** - For rapid UI development
- **Lucide** - For gorgeous icons

## 📞 Support

Having issues? Open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ for Smartlead users**

⭐ Star this repo if you find it helpful!
