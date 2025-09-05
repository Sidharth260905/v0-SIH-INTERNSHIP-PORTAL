"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Briefcase,
  User,
  BookOpen,
  MessageSquare,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
  const mockData = {
    profileStrength: 73,
    appliedJobs: 8,
    savedJobs: 12,
    skillsAssessed: 6,
    mentorSessions: 3,
    upcomingDeadlines: [
      { company: "TechCorp", position: "Frontend Intern", deadline: "2024-04-15", daysLeft: 12 },
      { company: "StartupXYZ", position: "Full Stack Intern", deadline: "2024-04-20", daysLeft: 17 },
    ],
    recentActivity: [
      { type: "application", text: "Applied to Frontend Developer Intern at TechCorp", time: "2 hours ago" },
      { type: "skill", text: "Completed TypeScript assessment", time: "1 day ago" },
      { type: "save", text: "Saved UI/UX Design Intern at DesignStudio", time: "2 days ago" },
    ],
    recommendations: [
      {
        id: "1",
        title: "Frontend Developer Intern",
        company: "TechCorp",
        matchScore: 92,
        location: "San Francisco, CA",
      },
      {
        id: "2",
        title: "React Developer Intern",
        company: "WebCorp",
        matchScore: 88,
        location: "Remote",
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your career journey today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profile Strength</p>
                  <p className="text-2xl font-bold text-primary">{mockData.profileStrength}%</p>
                </div>
                <User className="w-8 h-8 text-primary" />
              </div>
              <Progress value={mockData.profileStrength} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.appliedJobs}</p>
                </div>
                <Briefcase className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved Jobs</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.savedJobs}</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skills Assessed</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.skillsAssessed}</p>
                </div>
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Internships */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Recommended for You</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/internship-search">
                      View All <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Internships matched to your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recommendations.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="default" className="text-xs">
                          {job.matchScore}% Match
                        </Badge>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Continue building your career profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 bg-transparent" asChild>
                    <Link href="/resume-analyzer" className="flex flex-col items-center space-y-2">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <span className="font-medium">Analyze Resume</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Get AI-powered feedback on your resume
                      </span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 bg-transparent" asChild>
                    <Link href="/skill-analysis" className="flex flex-col items-center space-y-2">
                      <TrendingUp className="w-6 h-6 text-accent" />
                      <span className="font-medium">Skill Assessment</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Take tests to measure your skills
                      </span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 bg-transparent" asChild>
                    <Link href="/portfolio-builder" className="flex flex-col items-center space-y-2">
                      <User className="w-6 h-6 text-primary" />
                      <span className="font-medium">Build Portfolio</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Showcase your projects and skills
                      </span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 bg-transparent" asChild>
                    <Link href="/mentor-chat" className="flex flex-col items-center space-y-2">
                      <MessageSquare className="w-6 h-6 text-accent" />
                      <span className="font-medium">Find Mentor</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Connect with industry professionals
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Application Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-destructive" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <h4 className="font-medium text-sm text-foreground">{deadline.position}</h4>
                      <p className="text-xs text-muted-foreground">{deadline.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{deadline.deadline}</span>
                        <Badge variant="destructive" className="text-xs">
                          {deadline.daysLeft} days left
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to get better matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Progress</span>
                    <span className="text-sm font-medium">{mockData.profileStrength}%</span>
                  </div>
                  <Progress value={mockData.profileStrength} className="h-2" />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Resume uploaded</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Skills added</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Portfolio projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Professional photo</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/profile-strength">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your skill development journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">TypeScript</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">React Testing</span>
                      <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Node.js</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/career-roadmap">View Roadmap</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
