"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CohortData {
  cohort_id: string
  cohort_date: string
  user_count: number
  retention_day_1: number
  retention_day_7: number
  retention_day_30: number
}

interface CohortTableProps {
  data: CohortData[]
}

export function CohortTable({ data }: CohortTableProps) {
  const getRetentionColor = (retention: number) => {
    if (retention >= 50) return "bg-chart-2/20 text-chart-2"
    if (retention >= 30) return "bg-chart-3/20 text-chart-3"
    return "bg-chart-5/20 text-chart-5"
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-foreground">Cohort Date</TableHead>
            <TableHead className="text-foreground">Users</TableHead>
            <TableHead className="text-foreground">Day 1</TableHead>
            <TableHead className="text-foreground">Day 7</TableHead>
            <TableHead className="text-foreground">Day 30</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((cohort) => (
            <TableRow key={cohort.cohort_id} className="hover:bg-accent/50">
              <TableCell className="font-medium text-foreground">{cohort.cohort_date}</TableCell>
              <TableCell className="text-muted-foreground">{cohort.user_count.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getRetentionColor(cohort.retention_day_1)}>
                  {cohort.retention_day_1.toFixed(1)}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getRetentionColor(cohort.retention_day_7)}>
                  {cohort.retention_day_7.toFixed(1)}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getRetentionColor(cohort.retention_day_30)}>
                  {cohort.retention_day_30.toFixed(1)}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
