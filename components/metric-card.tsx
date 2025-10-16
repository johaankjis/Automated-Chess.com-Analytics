"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface KPIMetric {
  metric_id: string
  metric_name: string
  value: number
  change: number
  timestamp: Date
}

interface MetricCardProps {
  metric: KPIMetric
}

export function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.change > 0
  const isPercentage = metric.metric_id.includes("retention")

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{metric.metric_name}</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {isPercentage ? `${metric.value}%` : metric.value.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 text-xs">
          {isPositive ? (
            <>
              <TrendingUp className="h-3 w-3 text-chart-2" />
              <span className="text-chart-2">+{metric.change}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">{metric.change}%</span>
            </>
          )}
          <span className="text-muted-foreground">from last period</span>
        </div>
      </CardContent>
    </Card>
  )
}
