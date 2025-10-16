import { PageHeader } from "@/components/page-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"
import { generateCohortData } from "@/lib/mock-data"
import { CohortTable } from "@/components/cohort-table"
import { CohortRetentionChart } from "@/components/cohort-retention-chart"

export default function CohortsPage() {
  const cohortData = generateCohortData()

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="ml-64 flex-1">
        <PageHeader
          title="Cohort Analysis"
          description="Track user retention and engagement patterns across different cohorts"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          }
        />

        <div className="space-y-6 p-8">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Cohorts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{cohortData.length}</div>
                <p className="text-xs text-muted-foreground">Active cohorts tracked</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Day 7 Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {(cohortData.reduce((sum, c) => sum + (c.retention_day_7 || 0), 0) / cohortData.length).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Across all cohorts</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Day 30 Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {(cohortData.reduce((sum, c) => sum + (c.retention_day_30 || 0), 0) / cohortData.length).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Long-term engagement</p>
              </CardContent>
            </Card>
          </div>

          {/* Retention Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Retention Curve</CardTitle>
              <CardDescription>User retention over time by cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <CohortRetentionChart data={cohortData} />
            </CardContent>
          </Card>

          {/* Cohort Table */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Cohort Details</CardTitle>
              <CardDescription>Detailed retention metrics for each cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <CohortTable data={cohortData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
