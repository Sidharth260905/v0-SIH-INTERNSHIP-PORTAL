"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Target,
  Bell,
  BellRing,
  Calendar,
  Briefcase,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "application" | "deadline" | "recommendation" | "mentor" | "skill" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "high" | "medium" | "low"
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "deadline",
      title: "Application Deadline Approaching",
      message: "Your application for Frontend Developer Intern at TechCorp is due in 2 days",
      timestamp: "2 hours ago",
      isRead: false,
      priority: "high",
      actionUrl: "/applications",
    },
    {
      id: "2",
      type: "recommendation",
      title: "New Internship Match",
      message: "We found 3 new internships that match your profile with 85%+ compatibility",
      timestamp: "4 hours ago",
      isRead: false,
      priority: "medium",
      actionUrl: "/internship-search",
    },
    {
      id: "3",
      type: "mentor",
      title: "Mentor Session Reminder",
      message: "Your session with Sarah Chen is scheduled for tomorrow at 2:00 PM",
      timestamp: "6 hours ago",
      isRead: true,
      priority: "medium",
      actionUrl: "/mentor-chat",
    },
    {
      id: "4",
      type: "skill",
      title: "Skill Assessment Available",
      message: "Complete your TypeScript assessment to improve your profile strength",
      timestamp: "1 day ago",
      isRead: true,
      priority: "low",
      actionUrl: "/skill-analysis",
    },
    {
      id: "5",
      type: "application",
      title: "Application Status Update",
      message: "Your application for Full Stack Intern at StartupXYZ has been reviewed",
      timestamp: "2 days ago",
      isRead: false,
      priority: "high",
      actionUrl: "/applications",
    },
  ])

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    deadlineReminders: true,
    newRecommendations: true,
    mentorMessages: true,
    skillSuggestions: false,
    weeklyDigest: true,
  })

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "application":
        return <Briefcase className="w-4 h-4" />
      case "deadline":
        return <Calendar className="w-4 h-4" />
      case "recommendation":
        return <TrendingUp className="w-4 h-4" />
      case "mentor":
        return <MessageSquare className="w-4 h-4" />
      case "skill":
        return <CheckCircle className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-primary"
      case "low":
        return "text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">CareerLaunch</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              {/* Actions Bar */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Notifications</h2>
                <div className="flex space-x-2">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead} className="bg-transparent">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark All Read
                    </Button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">No notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You're all caught up! We'll notify you when there are updates.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  notifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`transition-all hover:shadow-md ${
                        !notification.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                notification.priority === "high"
                                  ? "bg-destructive/10 text-destructive"
                                  : notification.priority === "medium"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`font-semibold ${
                                    !notification.isRead ? "text-foreground" : "text-muted-foreground"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                <Badge variant={getPriorityBadge(notification.priority)} className="text-xs">
                                  {notification.priority}
                                </Badge>
                                {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{notification.timestamp}</span>
                                </div>
                                {notification.actionUrl && (
                                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                                    <Link href={notification.actionUrl}>View Details</Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Customize how and when you receive notifications to stay informed without being overwhelmed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* General Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">General</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specific Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Categories</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="application-updates">Application Updates</Label>
                          <p className="text-sm text-muted-foreground">Status changes on your applications</p>
                        </div>
                        <Switch
                          id="application-updates"
                          checked={settings.applicationUpdates}
                          onCheckedChange={(checked) => setSettings({ ...settings, applicationUpdates: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="deadline-reminders">Deadline Reminders</Label>
                          <p className="text-sm text-muted-foreground">Reminders for application deadlines</p>
                        </div>
                        <Switch
                          id="deadline-reminders"
                          checked={settings.deadlineReminders}
                          onCheckedChange={(checked) => setSettings({ ...settings, deadlineReminders: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="new-recommendations">New Recommendations</Label>
                          <p className="text-sm text-muted-foreground">New internship matches and suggestions</p>
                        </div>
                        <Switch
                          id="new-recommendations"
                          checked={settings.newRecommendations}
                          onCheckedChange={(checked) => setSettings({ ...settings, newRecommendations: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mentor-messages">Mentor Messages</Label>
                          <p className="text-sm text-muted-foreground">Messages and session reminders from mentors</p>
                        </div>
                        <Switch
                          id="mentor-messages"
                          checked={settings.mentorMessages}
                          onCheckedChange={(checked) => setSettings({ ...settings, mentorMessages: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="skill-suggestions">Skill Suggestions</Label>
                          <p className="text-sm text-muted-foreground">Recommendations for skill development</p>
                        </div>
                        <Switch
                          id="skill-suggestions"
                          checked={settings.skillSuggestions}
                          onCheckedChange={(checked) => setSettings({ ...settings, skillSuggestions: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weekly-digest">Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">Weekly summary of your activity and progress</p>
                        </div>
                        <Switch
                          id="weekly-digest"
                          checked={settings.weeklyDigest}
                          onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Notifications Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BellRing className="w-5 h-5 text-primary" />
                    <span>Smart Notifications</span>
                  </CardTitle>
                  <CardDescription>How our AI personalizes your notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Intelligent Timing</h4>
                      <p className="text-sm text-muted-foreground">
                        We learn your activity patterns to send notifications when you're most likely to engage.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Priority Filtering</h4>
                      <p className="text-sm text-muted-foreground">
                        Important notifications are prioritized based on deadlines and your career goals.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Personalized Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Recommendations and suggestions are tailored to your profile and preferences.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Frequency Control</h4>
                      <p className="text-sm text-muted-foreground">
                        We automatically adjust notification frequency to prevent overwhelming you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
