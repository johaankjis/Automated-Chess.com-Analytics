"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CohortData {
  cohort_id: string
  cohort_date: string
  user_count: number
  retention_day_1: number
  retention_day_7: number
  retention_day_30: number
}

interface CohortRetentionChartProps {
  data: CohortData[]
}

export function CohortRetentionChart({ data }: CohortRetentionChartProps) {
  // Transform data for the chart
  const chartData = data.slice(0, 8).map((cohort) => ({
    name: cohort.cohort_date,
    "Day 1": cohort.retention_day_1,
    "Day 7": cohort.retention_day_7,
    "Day 30": cohort.retention_day_30,
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend />
        <Line type="monotone" dataKey="Day 1" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="Day 7" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="Day 30" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
