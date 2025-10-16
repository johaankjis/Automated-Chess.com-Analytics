import { PageHeader } from "@/components/page-header"
import { NavSidebar } from "@/components/nav-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, CheckCheck, Trash2 } from "lucide-react"
import { generateNotifications } from "@/lib/mock-data"
import { NotificationList } from "@/components/notification-list"

export default function NotificationsPage() {
  const notifications = generateNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="ml-64 flex-1">
        <PageHeader
          title="Notifications"
          description="Stay updated on pipeline status and system alerts"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Button size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          }
        />

        <div className="space-y-6 p-8">
          {/* Notification Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-1">{unreadCount}</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {notifications.filter((n) => n.type === "alert").length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-2">
                  {notifications.filter((n) => n.type === "info").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div>
                  <p className="font-medium text-foreground">Pipeline Failures</p>
                  <p className="text-sm text-muted-foreground">Get notified when pipelines fail</p>
                </div>
                <Badge className="bg-chart-2/20 text-chart-2">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div>
                  <p className="font-medium text-foreground">Slack Notifications</p>
                  <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                </div>
                <Badge className="bg-chart-2/20 text-chart-2">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div>
                  <p className="font-medium text-foreground">Email Digest</p>
                  <p className="text-sm text-muted-foreground">Daily summary of pipeline activity</p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div>
                  <p className="font-medium text-foreground">Metric Thresholds</p>
                  <p className="text-sm text-muted-foreground">Alert when KPIs exceed thresholds</p>
                </div>
                <Badge className="bg-chart-2/20 text-chart-2">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notification List */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Notifications</CardTitle>
              <CardDescription>Latest system alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList notifications={notifications} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
