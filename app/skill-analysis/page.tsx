"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Target,
  TrendingUp,
  Brain,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface Skill {
  name: string
  currentLevel: number
  requiredLevel: number
  category: string
  priority: "high" | "medium" | "low"
}

export default function SkillAnalysisPage() {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer")
  const [analysisComplete, setAnalysisComplete] = useState(true)

  const mockSkillData: Skill[] = [
    { name: "JavaScript", currentLevel: 85, requiredLevel: 90, category: "Programming", priority: "high" },
    { name: "React", currentLevel: 80, requiredLevel: 85, category: "Frontend", priority: "high" },
    { name: "TypeScript", currentLevel: 60, requiredLevel: 80, category: "Programming", priority: "high" },
    { name: "Node.js", currentLevel: 45, requiredLevel: 70, category: "Backend", priority: "medium" },
    { name: "CSS/SCSS", currentLevel: 75, requiredLevel: 80, category: "Frontend", priority: "medium" },
    { name: "Git", currentLevel: 70, requiredLevel: 75, category: "Tools", priority: "medium" },
    { name: "Testing", currentLevel: 30, requiredLevel: 65, category: "Quality", priority: "high" },
    { name: "AWS", currentLevel: 20, requiredLevel: 60, category: "Cloud", priority: "low" },
  ]

  const getSkillGap = (skill: Skill) => Math.max(0, skill.requiredLevel - skill.currentLevel)
  const getSkillStatus = (skill: Skill) => {
    const gap = getSkillGap(skill)
    if (gap === 0) return "proficient"
    if (gap <= 10) return "close"
    return "needs-work"
  }

  const overallScore = Math.round(
    mockSkillData.reduce((acc, skill) => acc + (skill.currentLevel / skill.requiredLevel) * 100, 0) /
      mockSkillData.length,
  )

  const prioritySkills = mockSkillData.filter((skill) => skill.priority === "high" && getSkillGap(skill) > 0)

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
              <h1 className="text-lg font-semibold text-foreground">Skill Analysis</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <p className="text-2xl font-bold text-primary">{overallScore}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Skills Analyzed</p>
                    <p className="text-2xl font-bold text-foreground">{mockSkillData.length}</p>
                  </div>
                  <Brain className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Priority Gaps</p>
                    <p className="text-2xl font-bold text-destructive">{prioritySkills.length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Target Role</p>
                    <p className="text-sm font-semibold text-foreground">{selectedRole}</p>
                  </div>
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analysis */}
          <Tabs defaultValue="gap-analysis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
              <TabsTrigger value="roadmap">Learning Path</TabsTrigger>
              <TabsTrigger value="assessment">Take Assessment</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="gap-analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Skill Gap Analysis for {selectedRole}</span>
                  </CardTitle>
                  <CardDescription>
                    Compare your current skills with industry requirements for your target role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockSkillData.map((skill) => {
                      const gap = getSkillGap(skill)
                      const status = getSkillStatus(skill)

                      return (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-foreground">{skill.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {skill.category}
                              </Badge>
                              {skill.priority === "high" && (
                                <Badge variant="destructive" className="text-xs">
                                  High Priority
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">
                                {skill.currentLevel}% / {skill.requiredLevel}%
                              </span>
                              {status === "proficient" && <CheckCircle className="w-4 h-4 text-green-600" />}
                              {status === "needs-work" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                            </div>
                          </div>

                          <div className="relative">
                            <Progress value={skill.requiredLevel} className="h-3 bg-muted" />
                            <Progress value={skill.currentLevel} className="h-3 absolute top-0 left-0" />
                          </div>

                          {gap > 0 && (
                            <p className="text-sm text-muted-foreground">Gap: {gap}% - Focus on improving this skill</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>Personalized Learning Roadmap</span>
                  </CardTitle>
                  <CardDescription>
                    Step-by-step plan to bridge your skill gaps and reach your career goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Phase 1 */}
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Phase 1: Critical Skills (2-3 months)</h3>
                          <p className="text-sm text-muted-foreground">Focus on high-priority gaps</p>
                        </div>
                      </div>

                      <div className="ml-12 space-y-3">
                        <Card className="border-l-4 border-l-destructive">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">TypeScript Mastery</h4>
                              <Badge variant="destructive">High Priority</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current: 60% → Target: 80% (Gap: 20%)</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">TypeScript Handbook</Badge>
                              <Badge variant="outline">Practice Projects</Badge>
                              <Badge variant="outline">Online Course</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-destructive">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Testing Fundamentals</h4>
                              <Badge variant="destructive">High Priority</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current: 30% → Target: 65% (Gap: 35%)</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Jest & Testing Library</Badge>
                              <Badge variant="outline">TDD Practices</Badge>
                              <Badge variant="outline">Unit Testing</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Phase 2: Enhancement (3-4 months)</h3>
                          <p className="text-sm text-muted-foreground">Strengthen existing skills</p>
                        </div>
                      </div>

                      <div className="ml-12 space-y-3">
                        <Card className="border-l-4 border-l-accent">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Advanced React Patterns</h4>
                              <Badge variant="secondary">Medium Priority</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current: 80% → Target: 85% (Gap: 5%)</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Hooks Mastery</Badge>
                              <Badge variant="outline">Performance Optimization</Badge>
                              <Badge variant="outline">State Management</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-accent">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Node.js Backend</h4>
                              <Badge variant="secondary">Medium Priority</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current: 45% → Target: 70% (Gap: 25%)</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Express.js</Badge>
                              <Badge variant="outline">API Development</Badge>
                              <Badge variant="outline">Database Integration</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-muted-foreground rounded-full flex items-center justify-center text-background font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Phase 3: Specialization (4-6 months)</h3>
                          <p className="text-sm text-muted-foreground">Advanced and emerging technologies</p>
                        </div>
                      </div>

                      <div className="ml-12">
                        <Card className="border-l-4 border-l-muted-foreground">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Cloud Technologies (AWS)</h4>
                              <Badge variant="outline">Low Priority</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current: 20% → Target: 60% (Gap: 40%)</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">AWS Fundamentals</Badge>
                              <Badge variant="outline">Deployment</Badge>
                              <Badge variant="outline">Serverless</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>Skill Assessment</span>
                  </CardTitle>
                  <CardDescription>
                    Take interactive assessments to accurately measure your current skill levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">JavaScript Assessment</h3>
                            <p className="text-sm text-muted-foreground">25 questions • 30 minutes</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Test your JavaScript knowledge including ES6+, async programming, and DOM manipulation.
                        </p>
                        <Button className="w-full">
                          Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold">React Assessment</h3>
                            <p className="text-sm text-muted-foreground">20 questions • 25 minutes</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Evaluate your React skills including hooks, state management, and component patterns.
                        </p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">TypeScript Assessment</h3>
                            <p className="text-sm text-muted-foreground">15 questions • 20 minutes</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Test your TypeScript knowledge including types, interfaces, and advanced features.
                        </p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Full Stack Assessment</h3>
                            <p className="text-sm text-muted-foreground">40 questions • 45 minutes</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Comprehensive assessment covering frontend, backend, and database technologies.
                        </p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Based on your skill analysis, here are personalized recommendations to accelerate your career growth.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Resources</CardTitle>
                    <CardDescription>Curated resources for your skill gaps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">TypeScript Deep Dive</h4>
                          <p className="text-xs text-muted-foreground">
                            Free online book covering advanced TypeScript concepts
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            Free
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <Award className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Testing JavaScript</h4>
                          <p className="text-xs text-muted-foreground">
                            Comprehensive course on testing React applications
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            Paid
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <Brain className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Node.js Masterclass</h4>
                          <p className="text-xs text-muted-foreground">
                            Build real-world applications with Node.js and Express
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            Paid
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Practice Projects</CardTitle>
                    <CardDescription>Hands-on projects to build your skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <Target className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">TypeScript Todo App</h4>
                          <p className="text-xs text-muted-foreground">Build a todo app with TypeScript and React</p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              TypeScript
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              React
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Testing Workshop</h4>
                          <p className="text-xs text-muted-foreground">
                            Add comprehensive tests to an existing project
                          </p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Jest
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Testing Library
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Full Stack Blog</h4>
                          <p className="text-xs text-muted-foreground">
                            Create a blog with Node.js backend and React frontend
                          </p>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Node.js
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              MongoDB
                            </Badge>
                          </div>
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
