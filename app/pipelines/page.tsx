import { PageHeader } from "@/components/page-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Play, Pause, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { generatePipelineStatus } from "@/lib/mock-data"
import { PipelineTimeline } from "@/components/pipeline-timeline"

export default function PipelinesPage() {
  const pipelines = generatePipelineStatus()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-chart-2" />
      case "running":
        return <RefreshCw className="h-4 w-4 animate-spin text-chart-1" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-chart-2/20 text-chart-2">Success</Badge>
      case "running":
        return <Badge className="bg-chart-1/20 text-chart-1">Running</Badge>
      case "failed":
        return <Badge className="bg-destructive/20 text-destructive">Failed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="ml-64 flex-1">
        <PageHeader
          title="Pipeline Monitoring"
          description="Monitor ETL pipelines and data transformations"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm">
                <Play className="mr-2 h-4 w-4" />
                Run All
              </Button>
            </div>
          }
        />

        <div className="space-y-6 p-8">
          {/* Pipeline Status Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Pipelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{pipelines.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Running</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-1">
                  {pipelines.filter((p) => p.status === "running").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-2">
                  {pipelines.filter((p) => p.status === "success").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {pipelines.filter((p) => p.status === "failed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline Timeline */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Pipeline Execution Timeline</CardTitle>
              <CardDescription>Recent pipeline runs and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <PipelineTimeline pipelines={pipelines} />
            </CardContent>
          </Card>

          {/* Detailed Pipeline Cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            {pipelines.map((pipeline) => (
              <Card key={pipeline.pipeline_id} className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(pipeline.status)}
                      <CardTitle className="text-base text-foreground">{pipeline.name}</CardTitle>
                    </div>
                    {getStatusBadge(pipeline.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Run</p>
                      <p className="font-medium text-foreground">{new Date(pipeline.last_run).toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{pipeline.duration}s</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Records Processed</p>
                      <p className="font-medium text-foreground">{pipeline.records_processed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pipeline ID</p>
                      <p className="font-mono text-xs text-foreground">{pipeline.pipeline_id}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Play className="mr-2 h-3 w-3" />
                      Run
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Pause className="mr-2 h-3 w-3" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm">
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
