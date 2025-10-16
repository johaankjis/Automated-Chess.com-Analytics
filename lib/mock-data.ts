// Mock data generators for Chess.com analytics

export interface UserEvent {
  event_id: string
  user_id: string
  event_type: string
  timestamp: Date
}

export interface CohortData {
  cohort_id: string
  cohort_date: string
  user_count: number
  retention_day_1: number
  retention_day_7: number
  retention_day_30: number
}

export interface KPIMetric {
  metric_id: string
  metric_name: string
  value: number
  change: number
  timestamp: Date
}

export interface PipelineStatus {
  pipeline_id: string
  name: string
  status: "running" | "success" | "failed" | "pending"
  last_run: Date
  duration: number
  records_processed: number
}

export interface Notification {
  id: string
  type: "alert" | "success" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// Generate mock user events
export function generateUserEvents(count = 100): UserEvent[] {
  const eventTypes = [
    "login",
    "game_start",
    "game_end",
    "puzzle_played",
    "lesson_viewed",
    "profile_updated",
    "friend_added",
    "tournament_joined",
  ]

  return Array.from({ length: count }, (_, i) => ({
    event_id: `evt_${i + 1}`,
    user_id: `user_${Math.floor(Math.random() * 1000)}`,
    event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  }))
}

// Generate cohort retention data
export function generateCohortData(): CohortData[] {
  const cohorts = []
  const today = new Date()

  for (let i = 0; i < 12; i++) {
    const cohortDate = new Date(today)
    cohortDate.setDate(cohortDate.getDate() - i * 7)

    cohorts.push({
      cohort_id: `cohort_${i + 1}`,
      cohort_date: cohortDate.toISOString().split("T")[0],
      user_count: Math.floor(Math.random() * 5000) + 10000,
      retention_day_1: Math.random() * 30 + 60,
      retention_day_7: Math.random() * 20 + 40,
      retention_day_30: Math.random() * 15 + 25,
    })
  }

  return cohorts
}

// Generate KPI metrics
export function generateKPIMetrics(): KPIMetric[] {
  return [
    {
      metric_id: "dau",
      metric_name: "Daily Active Users",
      value: 45230,
      change: 12.5,
      timestamp: new Date(),
    },
    {
      metric_id: "wau",
      metric_name: "Weekly Active Users",
      value: 156780,
      change: 8.3,
      timestamp: new Date(),
    },
    {
      metric_id: "mau",
      metric_name: "Monthly Active Users",
      value: 523450,
      change: 15.7,
      timestamp: new Date(),
    },
    {
      metric_id: "retention_7d",
      metric_name: "7-Day Retention",
      value: 68.5,
      change: -2.1,
      timestamp: new Date(),
    },
    {
      metric_id: "retention_30d",
      metric_name: "30-Day Retention",
      value: 42.3,
      change: 3.4,
      timestamp: new Date(),
    },
    {
      metric_id: "avg_session",
      metric_name: "Avg Session Duration",
      value: 18.5,
      change: 5.2,
      timestamp: new Date(),
    },
  ]
}

// Generate time series data for charts
export function generateTimeSeriesData(days = 30) {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      dau: 40000 + Math.floor(Math.random() * 10000),
      events: 800000 + Math.floor(Math.random() * 200000),
      games: 150000 + Math.floor(Math.random() * 50000),
      puzzles: 80000 + Math.floor(Math.random() * 20000),
    })
  }

  return data
}

// Generate pipeline status
export function generatePipelineStatus(): PipelineStatus[] {
  return [
    {
      pipeline_id: "etl_user_events",
      name: "User Events ETL",
      status: "success",
      last_run: new Date(Date.now() - 15 * 60 * 1000),
      duration: 245,
      records_processed: 1234567,
    },
    {
      pipeline_id: "dbt_cohorts",
      name: "Cohort Analysis Transform",
      status: "running",
      last_run: new Date(Date.now() - 5 * 60 * 1000),
      duration: 180,
      records_processed: 856432,
    },
    {
      pipeline_id: "dbt_kpis",
      name: "KPI Metrics Transform",
      status: "success",
      last_run: new Date(Date.now() - 30 * 60 * 1000),
      duration: 120,
      records_processed: 234567,
    },
    {
      pipeline_id: "looker_sync",
      name: "Looker Dashboard Sync",
      status: "success",
      last_run: new Date(Date.now() - 45 * 60 * 1000),
      duration: 60,
      records_processed: 45678,
    },
    {
      pipeline_id: "slack_alerts",
      name: "Slack Notifications",
      status: "pending",
      last_run: new Date(Date.now() - 60 * 60 * 1000),
      duration: 15,
      records_processed: 12,
    },
  ]
}

// Generate notifications
export function generateNotifications(): Notification[] {
  const notifications: Notification[] = [
    {
      id: "notif_1",
      type: "alert",
      title: "Pipeline Failure",
      message: "User Events ETL pipeline failed due to connection timeout. Retrying in 5 minutes.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false,
    },
    {
      id: "notif_2",
      type: "success",
      title: "Pipeline Completed",
      message: "Cohort Analysis Transform completed successfully. Processed 856,432 records in 3m 45s.",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      read: false,
    },
    {
      id: "notif_3",
      type: "info",
      title: "Scheduled Maintenance",
      message: "Database maintenance scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
    },
    {
      id: "notif_4",
      type: "warning",
      title: "High Memory Usage",
      message: "KPI Metrics pipeline is using 85% of allocated memory. Consider optimizing queries.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false,
    },
    {
      id: "notif_5",
      type: "success",
      title: "Looker Sync Complete",
      message: "Dashboard sync completed. All metrics are up to date.",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      read: true,
    },
    {
      id: "notif_6",
      type: "info",
      title: "New Feature Available",
      message: "Real-time alerting is now available. Configure thresholds in notification settings.",
      timestamp: new Date(Date.now() - 120 * 60 * 1000),
      read: true,
    },
    {
      id: "notif_7",
      type: "alert",
      title: "Metric Threshold Exceeded",
      message: "Daily Active Users dropped below 40,000. Current value: 38,450 (-3.8%).",
      timestamp: new Date(Date.now() - 150 * 60 * 1000),
      read: false,
    },
    {
      id: "notif_8",
      type: "success",
      title: "Data Quality Check Passed",
      message: "All data quality checks passed for today's ETL run. No anomalies detected.",
      timestamp: new Date(Date.now() - 180 * 60 * 1000),
      read: true,
    },
  ]

  return notifications
}
