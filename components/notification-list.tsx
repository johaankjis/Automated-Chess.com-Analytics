"use client"

import { Bell, AlertCircle, CheckCircle, Info, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "alert" | "success" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationListProps {
  notifications: Notification[]
}

export function NotificationList({ notifications }: NotificationListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-chart-2" />
      case "info":
        return <Info className="h-5 w-5 text-chart-1" />
      case "warning":
        return <Clock className="h-5 w-5 text-chart-3" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "alert":
        return <Badge className="bg-destructive/20 text-destructive">Alert</Badge>
      case "success":
        return <Badge className="bg-chart-2/20 text-chart-2">Success</Badge>
      case "info":
        return <Badge className="bg-chart-1/20 text-chart-1">Info</Badge>
      case "warning":
        return <Badge className="bg-chart-3/20 text-chart-3">Warning</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex gap-4 rounded-lg border border-border p-4 transition-colors ${
            notification.read ? "bg-secondary/30" : "bg-accent/50"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            {getIcon(notification.type)}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-foreground">{notification.title}</p>
              {getTypeBadge(notification.type)}
            </div>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleString()}</p>
          </div>

          <div className="flex items-start gap-2">
            {!notification.read && (
              <Button variant="ghost" size="sm">
                Mark Read
              </Button>
            )}
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
