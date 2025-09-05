"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Target, Eye, Edit, Trash2, Github, Globe, Palette } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  category: string
}

export default function PortfolioBuilderPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Dashboard",
      description:
        "A comprehensive admin dashboard for managing online store operations with real-time analytics and inventory management.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      imageUrl: "/ecommerce-dashboard-interface.png",
      liveUrl: "https://demo.example.com",
      githubUrl: "https://github.com/user/ecommerce-dashboard",
      category: "Web Development",
    },
    {
      id: "2",
      title: "Mobile Fitness App",
      description:
        "Cross-platform mobile app for tracking workouts, nutrition, and fitness goals with social features.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      imageUrl: "/mobile-fitness-app-interface.png",
      githubUrl: "https://github.com/user/fitness-app",
      category: "Mobile Development",
    },
  ])

  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    category: "",
  })

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(",").map((tech) => tech.trim()),
        imageUrl: newProject.imageUrl || "/project-placeholder.png",
        liveUrl: newProject.liveUrl,
        githubUrl: newProject.githubUrl,
        category: newProject.category || "Other",
      }
      setProjects([...projects, project])
      setNewProject({
        title: "",
        description: "",
        technologies: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
        category: "",
      })
      setIsAddingProject(false)
    }
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
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
              <h1 className="text-lg font-semibold text-foreground">Portfolio Builder</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/portfolio/preview">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Portfolio Overview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-6 h-6 text-primary" />
                    <span>Your Portfolio</span>
                  </CardTitle>
                  <CardDescription>Showcase your projects and skills to potential employers</CardDescription>
                </div>
                <Badge variant="secondary">{projects.length} Projects</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {new Set(projects.flatMap((p) => p.technologies)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Technologies Used</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Portfolio Strength</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Management */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {/* Add Project Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
                <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Project</DialogTitle>
                      <DialogDescription>Add a new project to showcase in your portfolio</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Project Title</Label>
                          <Input
                            id="title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="My Awesome Project"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            placeholder="Web Development"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Describe your project, its features, and impact..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                        <Input
                          id="technologies"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                          placeholder="React, TypeScript, Node.js, MongoDB"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="liveUrl">Live URL (optional)</Label>
                          <Input
                            id="liveUrl"
                            value={newProject.liveUrl}
                            onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                            placeholder="https://myproject.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                          <Input
                            id="githubUrl"
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                            placeholder="https://github.com/user/project"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddProject}>Add Project</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="secondary">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-3 h-3 mr-1" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                  <CardDescription>Manage your technical skills and proficiency levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["JavaScript", "React", "TypeScript", "Node.js", "Python", "MongoDB"].map((skill) => (
                        <div key={skill} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="font-medium">{skill}</span>
                          <Badge variant="secondary">Advanced</Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Settings</CardTitle>
                  <CardDescription>Customize your portfolio appearance and sharing options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl">Custom Portfolio URL</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                        careerlaunch.com/
                      </span>
                      <Input id="portfolioUrl" placeholder="your-name" className="rounded-l-none" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Portfolio</Label>
                      <p className="text-sm text-muted-foreground">Make your portfolio visible to employers</p>
                    </div>
                    <Button variant="outline">Enable</Button>
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
