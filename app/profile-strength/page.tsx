"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, TrendingUp, User, Briefcase, CheckCircle, AlertTriangle, ArrowRight, Eye, Edit } from "lucide-react"
import Link from "next/link"

interface ProfileSection {
  name: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "needs-improvement"
  suggestions: string[]
}

export default function ProfileStrengthPage() {
  const profileSections: ProfileSection[] = [
    {
      name: "Resume Quality",
      score: 78,
      maxScore: 100,
      status: "good",
      suggestions: [
        "Add more quantified achievements",
        "Include relevant keywords for ATS",
        "Update skills section with latest technologies",
      ],
    },
    {
      name: "Portfolio Completeness",
      score: 65,
      maxScore: 100,
      status: "needs-improvement",
      suggestions: ["Add 2-3 more projects", "Include live demo links", "Write detailed project descriptions"],
    },
    {
      name: "Skill Coverage",
      score: 85,
      maxScore: 100,
      status: "excellent",
      suggestions: ["Consider adding cloud technologies", "Expand testing knowledge", "Learn system design basics"],
    },
    {
      name: "Professional Network",
      score: 45,
      maxScore: 100,
      status: "needs-improvement",
      suggestions: [
        "Connect with industry professionals",
        "Join relevant tech communities",
        "Engage with content on LinkedIn",
      ],
    },
    {
      name: "Experience Level",
      score: 60,
      maxScore: 100,
      status: "good",
      suggestions: ["Apply for internships", "Contribute to open source projects", "Build more complex applications"],
    },
  ]

  const overallScore = Math.round(
    profileSections.reduce((acc, section) => acc + section.score, 0) / profileSections.length,
  )

  const getStatusColor = (status: ProfileSection["status"]) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-primary"
      case "needs-improvement":
        return "text-destructive"
    }
  }

  const getStatusIcon = (status: ProfileSection["status"]) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "good":
        return <TrendingUp className="w-4 h-4 text-primary" />
      case "needs-improvement":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
    }
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-600" }
    if (score >= 80) return { grade: "A", color: "text-green-600" }
    if (score >= 70) return { grade: "B+", color: "text-primary" }
    if (score >= 60) return { grade: "B", color: "text-primary" }
    if (score >= 50) return { grade: "C+", color: "text-accent" }
    return { grade: "C", color: "text-destructive" }
  }

  const scoreGrade = getScoreGrade(overallScore)

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
              <h1 className="text-lg font-semibold text-foreground">Profile Strength</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Overall Score */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-primary" />
                <span>Profile Strength Analysis</span>
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of your career profile strength and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-muted stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary stroke-current"
                        strokeWidth="3"
                        strokeDasharray={`${overallScore}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{overallScore}</div>
                        <div className="text-xs text-muted-foreground">/ 100</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className={`text-lg px-3 py-1 ${scoreGrade.color}`}>
                      Grade: {scoreGrade.grade}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Overall Profile Score</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Strengths</h3>
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Strong technical skills</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Good resume quality</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Relevant project experience</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Priority Areas</h3>
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                        <span>Expand portfolio</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                        <span>Build network</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                        <span>Gain more experience</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Detailed Analysis</h2>

            {profileSections.map((section) => (
              <Card key={section.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">{section.name}</h3>
                      {getStatusIcon(section.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${getStatusColor(section.status)}`}>
                        {section.score}/{section.maxScore}
                      </span>
                    </div>
                  </div>

                  <Progress value={section.score} className="h-3 mb-4" />

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-foreground">Improvement Suggestions:</h4>
                    <ul className="space-y-2">
                      {section.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Items */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>
                Take these actions to improve your profile strength and increase your chances of landing internships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Quick Wins (1-2 weeks)</h3>
                  <div className="space-y-3">
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">Update Resume</h4>
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/resume-analyzer">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Link>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add quantified achievements and optimize for ATS systems
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-accent">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">Complete Portfolio</h4>
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/portfolio-builder">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add 2-3 more projects with detailed descriptions and live demos
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Long-term Goals (1-3 months)</h3>
                  <div className="space-y-3">
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">Build Network</h4>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="w-3 h-3 mr-1" />
                            Start
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Connect with 50+ professionals and join tech communities
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-accent">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">Gain Experience</h4>
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/internship-search">
                              <Briefcase className="w-3 h-3 mr-1" />
                              Search
                            </Link>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Apply for internships and contribute to open source projects
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Alert className="mt-6">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Your profile strength has improved by 12% this month! Keep up the great work and focus on the priority
              areas to reach the next level.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
