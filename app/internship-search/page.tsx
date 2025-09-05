"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Target,
  Search,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Bookmark,
  Filter,
  Star,
  Users,
  Calendar,
  ExternalLink,
  Zap,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

interface Internship {
  id: string
  title: string
  company: string
  location: string
  type: "Remote" | "On-site" | "Hybrid"
  duration: string
  stipend: string
  description: string
  requirements: string[]
  skills: string[]
  matchScore: number
  isRecommended: boolean
  isSaved: boolean
  applicationDeadline: string
  postedDate: string
  applicants: number
  companySize: string
  industry: string
}

export default function InternshipSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    location: "any-location",
    type: "any-type",
    duration: "any-duration",
    industry: "any-industry",
    companySize: "any-size",
  })
  const [showFilters, setShowFilters] = useState(false)

  const mockInternships: Internship[] = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Hybrid",
      duration: "3 months",
      stipend: "$2,000/month",
      description:
        "Join our frontend team to build modern web applications using React, TypeScript, and cutting-edge technologies. You'll work on real projects that impact thousands of users.",
      requirements: [
        "Currently pursuing Computer Science or related degree",
        "Strong knowledge of JavaScript and React",
        "Familiarity with TypeScript",
        "Understanding of responsive design",
      ],
      skills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
      matchScore: 92,
      isRecommended: true,
      isSaved: false,
      applicationDeadline: "2024-04-15",
      postedDate: "2024-03-01",
      applicants: 45,
      companySize: "500-1000",
      industry: "Technology",
    },
    {
      id: "2",
      title: "Full Stack Development Intern",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "On-site",
      duration: "6 months",
      stipend: "$1,800/month",
      description:
        "Work across the entire stack building scalable web applications. Great opportunity to learn from experienced developers in a fast-paced startup environment.",
      requirements: [
        "Knowledge of both frontend and backend technologies",
        "Experience with Node.js or Python",
        "Database experience (SQL or NoSQL)",
        "Strong problem-solving skills",
      ],
      skills: ["Node.js", "React", "MongoDB", "Express", "JavaScript"],
      matchScore: 85,
      isRecommended: true,
      isSaved: true,
      applicationDeadline: "2024-04-20",
      postedDate: "2024-02-28",
      applicants: 32,
      companySize: "10-50",
      industry: "Technology",
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      company: "DesignStudio",
      location: "Remote",
      type: "Remote",
      duration: "4 months",
      stipend: "$1,500/month",
      description:
        "Create beautiful and intuitive user experiences for web and mobile applications. Work with our design team on client projects and internal tools.",
      requirements: [
        "Portfolio showcasing UI/UX design work",
        "Proficiency in Figma or Adobe Creative Suite",
        "Understanding of design principles",
        "Basic knowledge of HTML/CSS",
      ],
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "HTML/CSS"],
      matchScore: 68,
      isRecommended: false,
      isSaved: false,
      applicationDeadline: "2024-04-10",
      postedDate: "2024-03-05",
      applicants: 78,
      companySize: "50-200",
      industry: "Design",
    },
    {
      id: "4",
      title: "Data Science Intern",
      company: "DataCorp",
      location: "Boston, MA",
      type: "Hybrid",
      duration: "3 months",
      stipend: "$2,200/month",
      description:
        "Analyze large datasets and build machine learning models to drive business insights. Work with Python, SQL, and modern data science tools.",
      requirements: [
        "Strong background in statistics and mathematics",
        "Experience with Python and data analysis libraries",
        "Knowledge of SQL and databases",
        "Familiarity with machine learning concepts",
      ],
      skills: ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-learn"],
      matchScore: 45,
      isRecommended: false,
      isSaved: false,
      applicationDeadline: "2024-04-25",
      postedDate: "2024-03-03",
      applicants: 67,
      companySize: "200-500",
      industry: "Technology",
    },
  ]

  const [internships, setInternships] = useState(mockInternships)
  const [activeTab, setActiveTab] = useState("all")

  const toggleSave = (id: string) => {
    setInternships(
      internships.map((internship) =>
        internship.id === id ? { ...internship, isSaved: !internship.isSaved } : internship,
      ),
    )
  }

  const getFilteredInternships = () => {
    let filtered = internships

    if (activeTab === "recommended") {
      filtered = filtered.filter((internship) => internship.isRecommended)
    } else if (activeTab === "saved") {
      filtered = filtered.filter((internship) => internship.isSaved)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return filtered.sort((a, b) => b.matchScore - a.matchScore)
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-primary"
    return "text-accent"
  }

  const getMatchScoreBadge = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "outline"
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
              <h1 className="text-lg font-semibold text-foreground">Internship Search</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search internships, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Dialog open={showFilters} onOpenChange={setShowFilters}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Filter Internships</DialogTitle>
                        <DialogDescription>Refine your search with advanced filters</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Location</label>
                            <Select
                              value={selectedFilters.location}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, location: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Any location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any-location">Any location</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                                <SelectItem value="new-york">New York, NY</SelectItem>
                                <SelectItem value="boston">Boston, MA</SelectItem>
                                <SelectItem value="seattle">Seattle, WA</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Work Type</label>
                            <Select
                              value={selectedFilters.type}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Any type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any-type">Any type</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="on-site">On-site</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Duration</label>
                            <Select
                              value={selectedFilters.duration}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, duration: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Any duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any-duration">Any duration</SelectItem>
                                <SelectItem value="3-months">3 months</SelectItem>
                                <SelectItem value="6-months">6 months</SelectItem>
                                <SelectItem value="12-months">12 months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Industry</label>
                            <Select
                              value={selectedFilters.industry}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, industry: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Any industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any-industry">Any industry</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Company Size</label>
                            <Select
                              value={selectedFilters.companySize}
                              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, companySize: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Any size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any-size">Any size</SelectItem>
                                <SelectItem value="startup">Startup (1-50)</SelectItem>
                                <SelectItem value="small">Small (51-200)</SelectItem>
                                <SelectItem value="medium">Medium (201-1000)</SelectItem>
                                <SelectItem value="large">Large (1000+)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Preferences</label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="paid" />
                                <label htmlFor="paid" className="text-sm">
                                  Paid internships only
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="visa" />
                                <label htmlFor="visa" className="text-sm">
                                  Visa sponsorship available
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Smart Match
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Results</span>
                    <span className="font-semibold">{getFilteredInternships().length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recommended</span>
                    <span className="font-semibold text-primary">
                      {internships.filter((i) => i.isRecommended).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Saved</span>
                    <span className="font-semibold text-accent">{internships.filter((i) => i.isSaved).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Match</span>
                    <span className="font-semibold">
                      {Math.round(internships.reduce((acc, i) => acc + i.matchScore, 0) / internships.length)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Trending Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
                      <div key={skill} className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                        <TrendingUp className="w-3 h-3 text-primary" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All ({internships.length})</TabsTrigger>
                  <TabsTrigger value="recommended">
                    Recommended ({internships.filter((i) => i.isRecommended).length})
                  </TabsTrigger>
                  <TabsTrigger value="saved">Saved ({internships.filter((i) => i.isSaved).length})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                  {getFilteredInternships().length === 0 ? (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">No internships found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search criteria or filters to find more opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {getFilteredInternships().map((internship) => (
                        <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold text-foreground text-lg">{internship.title}</h3>
                                  {internship.isRecommended && (
                                    <Badge variant="default" className="text-xs">
                                      <Star className="w-3 h-3 mr-1" />
                                      Recommended
                                    </Badge>
                                  )}
                                  <Badge
                                    variant={getMatchScoreBadge(internship.matchScore)}
                                    className={`text-xs ${getMatchScoreColor(internship.matchScore)}`}
                                  >
                                    {internship.matchScore}% Match
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center space-x-1">
                                    <Building className="w-4 h-4" />
                                    <span>{internship.company}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{internship.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{internship.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{internship.stipend}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSave(internship.id)}
                                className={internship.isSaved ? "text-accent" : "text-muted-foreground"}
                              >
                                {internship.isSaved ? (
                                  <Bookmark className="w-4 h-4 fill-current" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                              </Button>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{internship.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {internship.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{internship.applicants} applicants</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Deadline: {internship.applicationDeadline}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View Details
                                </Button>
                                <Button size="sm">Apply Now</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
