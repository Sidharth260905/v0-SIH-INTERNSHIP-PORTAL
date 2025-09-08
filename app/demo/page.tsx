import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Target, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CareerLaunch</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Interactive Demo
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">See CareerLaunch in Action</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Watch how our AI-powered platform helps students land their dream internships through personalized
              insights and guidance.
            </p>
          </div>

          {/* Demo Video */}
          <Card className="mb-12">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Demo Video Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Interactive demo will be available shortly. Try the live platform instead!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>AI Resume Analysis</span>
                </CardTitle>
                <CardDescription>
                  Upload your resume and get instant AI-powered feedback with specific improvement suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Smart Job Matching</span>
                </CardTitle>
                <CardDescription>
                  Discover internships perfectly matched to your skills, interests, and career goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Portfolio Builder</span>
                </CardTitle>
                <CardDescription>
                  Create stunning portfolios that showcase your projects and skills to employers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Career Roadmap</span>
                </CardTitle>
                <CardDescription>
                  Get personalized career paths with actionable steps to reach your professional goals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="text-center">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Career Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who are already using CareerLaunch to land their dream internships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">Try Live Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
