# Smartlead Analytics Dashboard

A modern, real-time analytics dashboard for Smartlead campaigns with glassmorphic UI design.

## Features

- 📊 Real-time campaign analytics
- 🎯 Multi-campaign tracking
- 📈 Individual & consolidated views
- 💾 CSV export functionality
- 🎨 Modern glassmorphic dark UI
- 📱 Fully responsive design

## Metrics Tracked

- Unique Leads Contacted
- Total Emails Sent
- Total Replies
- Positive Replies (Interested)
- Bounced Emails
- Unsubscribed Leads
- In Progress Campaigns
- Not Started Campaigns

## Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## Deployment to Netlify

### Method 1: GitHub + Netlify Dashboard
1. Push this repository to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Netlify will automatically detect settings from `netlify.toml`
6. Click "Deploy"

### Method 2: Netlify CLI
\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
\`\`\`

### Method 3: Drag & Drop
1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to deploy

## Usage

1. Enter your Smartlead API key in the configuration section
2. Add one or more campaign IDs you want to track
3. Click "Fetch Analytics" to load real-time data
4. Toggle between "Individual View" and "Consolidated View"
5. Export data as CSV for external reporting

## API Key

Get your API key from:
- Login to Smartlead
- Go to Settings > API
- Click "Activate API"
- Copy your API key

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Smartlead API** - Data Source

## Smartlead API Endpoints Used

- `GET /api/v1/campaigns/{campaign_id}/analytics` - Fetch campaign analytics

## License

MIT License - Feel free to use this project for personal or commercial purposes.
\`\`\`

---

## 🚀 Quick Start Instructions

1. **Create Project Folder**
```bash
   mkdir smartlead-analytics-dashboard
   cd smartlead-analytics-dashboard
