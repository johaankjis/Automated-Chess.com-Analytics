"use client"

import { CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react"

interface PipelineStatus {
  pipeline_id: string
  name: string
  status: "running" | "success" | "failed" | "pending"
  last_run: Date
  duration: number
  records_processed: number
}

interface PipelineTimelineProps {
  pipelines: PipelineStatus[]
}

export function PipelineTimeline({ pipelines }: PipelineTimelineProps) {
  const sortedPipelines = [...pipelines].sort((a, b) => b.last_run.getTime() - a.last_run.getTime())

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-chart-2" />
      case "running":
        return <RefreshCw className="h-5 w-5 animate-spin text-chart-1" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {sortedPipelines.map((pipeline, index) => (
        <div key={pipeline.pipeline_id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-secondary">
              {getStatusIcon(pipeline.status)}
            </div>
            {index < sortedPipelines.length - 1 && <div className="h-full w-0.5 bg-border" />}
          </div>

          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{pipeline.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(pipeline.last_run).toLocaleString()} • {pipeline.duration}s •{" "}
                  {pipeline.records_processed.toLocaleString()} records
                </p>
              </div>
              <div className="text-sm font-medium text-muted-foreground capitalize">{pipeline.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
