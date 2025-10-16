import { PageHeader } from "@/components/page-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, TrendingUp, TrendingDown } from "lucide-react"
import { generateKPIMetrics, generateTimeSeriesData } from "@/lib/mock-data"
import { MetricCard } from "@/components/metric-card"
import { MetricTrendChart } from "@/components/metric-trend-chart"

export default function MetricsPage() {
  const kpis = generateKPIMetrics()
  const timeSeriesData = generateTimeSeriesData(30)

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="ml-64 flex-1">
        <PageHeader
          title="KPI Metrics"
          description="Key performance indicators and business metrics"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 days
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          }
        />

        <div className="space-y-6 p-8">
          {/* KPI Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
              <MetricCard key={kpi.metric_id} metric={kpi} />
            ))}
          </div>

          {/* Detailed Metric Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Active Users Trend</CardTitle>
                <CardDescription>30-day trend of daily active users</CardDescription>
              </CardHeader>
              <CardContent>
                <MetricTrendChart data={timeSeriesData} dataKey="dau" color="hsl(var(--chart-1))" />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Total Events Trend</CardTitle>
                <CardDescription>30-day trend of user events</CardDescription>
              </CardHeader>
              <CardContent>
                <MetricTrendChart data={timeSeriesData} dataKey="events" color="hsl(var(--chart-2))" />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Games Played Trend</CardTitle>
                <CardDescription>30-day trend of games played</CardDescription>
              </CardHeader>
              <CardContent>
                <MetricTrendChart data={timeSeriesData} dataKey="games" color="hsl(var(--chart-3))" />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Puzzles Solved Trend</CardTitle>
                <CardDescription>30-day trend of puzzles solved</CardDescription>
              </CardHeader>
              <CardContent>
                <MetricTrendChart data={timeSeriesData} dataKey="puzzles" color="hsl(var(--chart-4))" />
              </CardContent>
            </Card>
          </div>

          {/* Metric Comparison */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Metric Performance</CardTitle>
              <CardDescription>Compare metrics against targets and previous periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpis.slice(0, 4).map((kpi) => (
                  <div
                    key={kpi.metric_id}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{kpi.metric_name}</p>
                      <p className="text-2xl font-bold text-foreground">{kpi.value.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {kpi.change > 0 ? (
                        <div className="flex items-center gap-1 rounded-md bg-chart-2/20 px-3 py-1">
                          <TrendingUp className="h-4 w-4 text-chart-2" />
                          <span className="text-sm font-medium text-chart-2">+{kpi.change}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 rounded-md bg-destructive/20 px-3 py-1">
                          <TrendingDown className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium text-destructive">{kpi.change}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
