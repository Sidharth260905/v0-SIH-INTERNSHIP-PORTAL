"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react"
import Link from "next/link"

interface Milestone {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  targetDate: string
  skills: string[]
  progress: number
}

export default function CareerRoadmapPage() {
  const [selectedPath, setSelectedPath] = useState("frontend-developer")

  const mockMilestones: Milestone[] = [
    {
      id: "1",
      title: "Master Frontend Fundamentals",
      description: "Build strong foundation in HTML, CSS, JavaScript, and React",
      status: "completed",
      targetDate: "2024-03-01",
      skills: ["HTML/CSS", "JavaScript", "React", "Git"],
      progress: 100,
    },
    {
      id: "2",
      title: "Advanced React & TypeScript",
      description: "Learn advanced React patterns, state management, and TypeScript",
      status: "in-progress",
      targetDate: "2024-06-01",
      skills: ["TypeScript", "Redux", "React Patterns", "Testing"],
      progress: 65,
    },
    {
      id: "3",
      title: "Full Stack Development",
      description: "Expand to backend development with Node.js and databases",
      status: "upcoming",
      targetDate: "2024-09-01",
      skills: ["Node.js", "Express", "MongoDB", "APIs"],
      progress: 0,
    },
    {
      id: "4",
      title: "Senior Developer Skills",
      description: "System design, architecture, and leadership capabilities",
      status: "upcoming",
      targetDate: "2025-01-01",
      skills: ["System Design", "Architecture", "Mentoring", "DevOps"],
      progress: 0,
    },
  ]

  const careerPaths = [
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      description: "Specialize in user interfaces and user experience",
      timeline: "12-18 months",
      salary: "$70k - $120k",
      demand: "High",
    },
    {
      id: "fullstack-developer",
      title: "Full Stack Developer",
      description: "Master both frontend and backend development",
      timeline: "18-24 months",
      salary: "$80k - $140k",
      demand: "Very High",
    },
    {
      id: "react-specialist",
      title: "React Specialist",
      description: "Deep expertise in React ecosystem and modern frontend",
      timeline: "15-20 months",
      salary: "$85k - $150k",
      demand: "High",
    },
  ]

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-primary" />
      case "upcoming":
        return <Target className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return "border-l-green-600"
      case "in-progress":
        return "border-l-primary"
      case "upcoming":
        return "border-l-muted-foreground"
    }
  }

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
              <h1 className="text-lg font-semibold text-foreground">Career Roadmap</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Career Path Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Your Career Path</span>
              </CardTitle>
              <CardDescription>Choose your target career path to get a personalized roadmap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {careerPaths.map((path) => (
                  <Card
                    key={path.id}
                    className={`cursor-pointer transition-all ${
                      selectedPath === path.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPath(path.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">{path.title}</h3>
                          {selectedPath === path.id && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Timeline:</span>
                            <span className="font-medium">{path.timeline}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Salary:</span>
                            <span className="font-medium">{path.salary}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Demand:</span>
                            <Badge variant={path.demand === "Very High" ? "default" : "secondary"}>{path.demand}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Tabs */}
          <Tabs defaultValue="milestones" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="milestones" className="space-y-6">
              <div className="space-y-6">
                {mockMilestones.map((milestone, index) => (
                  <Card key={milestone.id} className={`border-l-4 ${getStatusColor(milestone.status)}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                            {getStatusIcon(milestone.status)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>

                            {milestone.status === "in-progress" && (
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{milestone.progress}%</span>
                                </div>
                                <Progress value={milestone.progress} className="h-2" />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mb-3">
                              {milestone.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{milestone.targetDate}</span>
                          </div>
                          {milestone.status === "in-progress" && (
                            <Button size="sm">
                              Continue <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                          {milestone.status === "upcoming" && (
                            <Button size="sm" variant="outline" className="bg-transparent">
                              Start Planning
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Timeline</CardTitle>
                  <CardDescription>Visual representation of your career progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="space-y-8">
                      {mockMilestones.map((milestone, index) => (
                        <div key={milestone.id} className="relative flex items-start space-x-6">
                          {/* Timeline dot */}
                          <div
                            className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                              milestone.status === "completed"
                                ? "bg-green-100 border-green-600"
                                : milestone.status === "in-progress"
                                  ? "bg-primary/10 border-primary"
                                  : "bg-muted border-muted-foreground"
                            }`}
                          >
                            {getStatusIcon(milestone.status)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                              <span className="text-sm text-muted-foreground">{milestone.targetDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>

                            {milestone.status === "in-progress" && (
                              <div className="mb-3">
                                <Progress value={milestone.progress} className="h-2" />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                              {milestone.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>Overall Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">41%</div>
                        <p className="text-sm text-muted-foreground">Career Path Completion</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Completed Milestones</span>
                          <span className="text-sm text-muted-foreground">1 of 4</span>
                        </div>
                        <Progress value={25} className="h-2" />

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Skills Acquired</span>
                          <span className="text-sm text-muted-foreground">8 of 16</span>
                        </div>
                        <Progress value={50} className="h-2" />

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Time to Goal</span>
                          <span className="text-sm text-muted-foreground">8 months</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-medium text-sm">Frontend Fundamentals</h4>
                          <p className="text-xs text-muted-foreground">Completed March 2024</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm">React Certification</h4>
                          <p className="text-xs text-muted-foreground">In Progress - 65% complete</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-sm">First Internship</h4>
                          <p className="text-xs text-muted-foreground">Target: June 2024</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
