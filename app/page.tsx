import { PageHeader } from "@/components/page-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Activity, Zap, ArrowUpRight, Calendar } from "lucide-react"
import { generateKPIMetrics, generateTimeSeriesData } from "@/lib/mock-data"
import { OverviewChart } from "@/components/overview-chart"
import { EventsChart } from "@/components/events-chart"

export default function DashboardPage() {
  const kpis = generateKPIMetrics()
  const timeSeriesData = generateTimeSeriesData(30)

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="ml-64 flex-1">
        <PageHeader
          title="Analytics Overview"
          description="Real-time insights into Chess.com user engagement and retention"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 days
              </Button>
              <Button size="sm">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          }
        />

        <div className="space-y-6 p-8">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpis.slice(0, 3).map((kpi) => (
              <Card key={kpi.metric_id} className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.metric_name}</CardTitle>
                  {kpi.metric_id === "dau" && <Users className="h-4 w-4 text-muted-foreground" />}
                  {kpi.metric_id === "wau" && <Activity className="h-4 w-4 text-muted-foreground" />}
                  {kpi.metric_id === "mau" && <Zap className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {kpi.change > 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-chart-2" />
                        <span className="text-chart-2">+{kpi.change}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-destructive" />
                        <span className="text-destructive">{kpi.change}%</span>
                      </>
                    )}
                    <span className="text-muted-foreground">from last period</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Active Users</CardTitle>
                <CardDescription>User engagement over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <OverviewChart data={timeSeriesData} />
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Event Distribution</CardTitle>
                <CardDescription>Breakdown of user events by type</CardDescription>
              </CardHeader>
              <CardContent>
                <EventsChart data={timeSeriesData} />
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Status */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Pipeline Status</CardTitle>
              <CardDescription>Real-time ETL and transformation pipeline monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "User Events ETL", status: "success", records: "1.2M" },
                  { name: "Cohort Analysis", status: "running", records: "856K" },
                  { name: "KPI Metrics", status: "success", records: "235K" },
                ].map((pipeline) => (
                  <div
                    key={pipeline.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{pipeline.name}</p>
                        <p className="text-xs text-muted-foreground">{pipeline.records} records processed</p>
                      </div>
                    </div>
                    <Badge
                      variant={pipeline.status === "success" ? "default" : "secondary"}
                      className={
                        pipeline.status === "success" ? "bg-chart-2/20 text-chart-2" : "bg-chart-1/20 text-chart-1"
                      }
                    >
                      {pipeline.status}
                    </Badge>
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
