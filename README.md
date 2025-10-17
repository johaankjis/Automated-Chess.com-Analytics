# Chess.com Analytics Dashboard

An automated analytics pipeline and dashboard for Chess.com user events, built with Next.js 15, React 19, and TypeScript.

## Overview

This project provides a comprehensive analytics platform for tracking and visualizing Chess.com user engagement, retention, and behavioral patterns. The dashboard features real-time KPI metrics, cohort analysis, event tracking, and ETL pipeline monitoring.

## Features

### 📊 Analytics Dashboard
- **Real-time KPI Metrics**: Track Daily Active Users (DAU), Weekly Active Users (WAU), Monthly Active Users (MAU)
- **Interactive Charts**: Visualize user engagement trends and event distributions
- **Pipeline Status Monitoring**: Real-time ETL and transformation pipeline tracking

### 👥 Cohort Analysis
- **User Retention Tracking**: Monitor retention rates at 1, 7, and 30-day intervals
- **Cohort Comparison**: Analyze user behavior across different cohorts
- **Visual Retention Charts**: Interactive visualizations of cohort performance

### 📈 KPI Metrics
- **Comprehensive Metrics Dashboard**: View all key performance indicators in one place
- **Trend Analysis**: Track metric changes over time with visual trend indicators
- **Export Capabilities**: Download metric data for further analysis

### 🔄 Pipeline Management
- **ETL Pipeline Monitoring**: Track the status of data pipelines in real-time
- **Pipeline Timeline**: View execution history and performance metrics
- **Status Tracking**: Monitor success, failure, and running states

### 🔔 Notifications
- **System Alerts**: Receive notifications for pipeline failures and important events
- **Categorized Notifications**: Alerts, successes, warnings, and informational messages
- **Notification Management**: Mark as read and clear notifications

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and improvements
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Composable charting library
- **Lucide React**: Beautiful icon set

### UI Components
- **shadcn/ui**: Re-usable component collection
- **Sonner**: Toast notifications
- **React Hook Form**: Form validation with Zod
- **date-fns**: Modern date utility library

### Analytics
- **Vercel Analytics**: Performance and visitor analytics

## Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── cohorts/             # Cohort analysis page
│   ├── metrics/             # KPI metrics page
│   ├── notifications/       # Notifications page
│   ├── pipelines/           # Pipeline monitoring page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Dashboard homepage
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── cohort-retention-chart.tsx
│   ├── cohort-table.tsx
│   ├── events-chart.tsx
│   ├── metric-card.tsx
│   ├── metric-trend-chart.tsx
│   ├── nav-sidebar.tsx
│   ├── notification-list.tsx
│   ├── overview-chart.tsx
│   ├── page-header.tsx
│   └── pipeline-timeline.tsx
├── lib/                     # Utility functions and data
│   ├── mock-data.ts        # Mock data generators
│   └── utils.ts            # Utility functions
├── public/                  # Static assets
├── styles/                  # Global styles
├── hooks/                   # Custom React hooks
├── components.json          # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Automated-Chess.com-Analytics.git
cd Automated-Chess.com-Analytics
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:

```bash
npm run build
# or
pnpm build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
pnpm start
# or
yarn start
```

### Linting

Run the linter:

```bash
npm run lint
# or
pnpm lint
# or
yarn lint
```

## Data Models

### User Events
```typescript
interface UserEvent {
  event_id: string
  user_id: string
  event_type: string  // login, game_start, game_end, purchase, etc.
  timestamp: Date
}
```

### Cohort Data
```typescript
interface CohortData {
  cohort_id: string
  cohort_date: string
  user_count: number
  retention_day_1: number
  retention_day_7: number
  retention_day_30: number
}
```

### KPI Metrics
```typescript
interface KPIMetric {
  metric_id: string
  metric_name: string
  value: number
  change: number        // Percentage change from previous period
  timestamp: Date
}
```

### Pipeline Status
```typescript
interface PipelineStatus {
  pipeline_id: string
  name: string
  status: "running" | "success" | "failed" | "pending"
  last_run: Date
  duration: number
  records_processed: number
}
```

## Features in Detail

### Dashboard Overview
The main dashboard provides:
- Three key KPI cards showing DAU, WAU, and MAU with trend indicators
- Daily Active Users chart showing 30-day engagement trends
- Event Distribution chart breaking down user events by type
- Pipeline Status section with real-time ETL monitoring

### Cohort Analysis
The cohort analysis page enables:
- Viewing user retention across different cohort periods
- Comparing retention rates at day 1, 7, and 30
- Filtering and exporting cohort data
- Visual retention heatmaps and charts

### Metrics Dashboard
The metrics page displays:
- All KPI metrics in a grid layout
- Trend charts for each metric
- Comparison with previous periods
- Detailed metric breakdowns

### Pipeline Monitoring
The pipelines page shows:
- Status of all ETL and data transformation pipelines
- Execution timeline and history
- Records processed and duration metrics
- Quick actions to pause, restart, or view pipeline details

## Customization

### Theme
The application uses a dark theme by default. The theme is configured in the root layout at `app/layout.tsx`.

### Mock Data
Currently, the application uses mock data generators from `lib/mock-data.ts`. To connect to real data sources, replace these generators with actual API calls or database queries.

### Components
UI components are built with Radix UI primitives and can be customized in the `components/ui/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
