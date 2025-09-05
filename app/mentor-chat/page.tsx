"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Target, MessageSquare, Send, Bot, Star, Calendar, Video, Users, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "mentor" | "ai"
  timestamp: string
  type?: "text" | "suggestion" | "resource"
}

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  rating: number
  sessions: number
  avatar: string
  isOnline: boolean
  nextAvailable: string
}

export default function MentorChatPage() {
  const [activeChat, setActiveChat] = useState("ai-mentor")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Career Mentor. I'm here to help you with career guidance, interview prep, skill development, and more. What would you like to discuss today?",
      sender: "ai",
      timestamp: "10:00 AM",
      type: "text",
    },
    {
      id: "2",
      content: "Hi! I'm preparing for frontend developer interviews. Can you help me with common questions?",
      sender: "user",
      timestamp: "10:02 AM",
      type: "text",
    },
    {
      id: "3",
      content:
        "Here are some common frontend interview questions you should prepare for:\n\n1. Explain the difference between let, const, and var\n2. What is the virtual DOM and how does React use it?\n3. How do you handle state management in React?\n4. What are React hooks and when would you use them?\n\nWould you like me to dive deeper into any of these topics?",
      sender: "ai",
      timestamp: "10:03 AM",
      type: "text",
    },
  ])

  const mockMentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior Frontend Engineer",
      company: "Google",
      expertise: ["React", "TypeScript", "System Design", "Career Growth"],
      rating: 4.9,
      sessions: 127,
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      nextAvailable: "Today 2:00 PM",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "Full Stack Developer",
      company: "Meta",
      expertise: ["Node.js", "React", "GraphQL", "Mentoring"],
      rating: 4.8,
      sessions: 89,
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      nextAvailable: "Tomorrow 10:00 AM",
    },
    {
      id: "3",
      name: "Emily Johnson",
      title: "Engineering Manager",
      company: "Stripe",
      expertise: ["Leadership", "Career Transition", "Technical Interviews"],
      rating: 5.0,
      sessions: 156,
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      nextAvailable: "Today 4:30 PM",
    },
  ]

  const quickSuggestions = [
    "Help me prepare for technical interviews",
    "Review my resume and portfolio",
    "What skills should I focus on next?",
    "How to negotiate internship offers?",
    "Career roadmap for frontend development",
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you're looking for guidance on that topic. Let me provide you with some personalized advice based on your profile and current goals...",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setMessage(suggestion)
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
              <h1 className="text-lg font-semibold text-foreground">Mentor Chat</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeChat} onValueChange={setActiveChat} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai-mentor">AI Career Mentor</TabsTrigger>
              <TabsTrigger value="human-mentors">Human Mentors</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-mentor" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Chat Interface */}
                <div className="lg:col-span-3">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="border-b border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">AI Career Mentor</CardTitle>
                          <p className="text-sm text-muted-foreground">Always available • Powered by AI</p>
                        </div>
                      </div>
                    </CardHeader>

                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                msg.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {msg.sender !== "user" && (
                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Bot className="w-3 h-3 text-primary" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                  <p
                                    className={`text-xs mt-1 ${
                                      msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                    }`}
                                  >
                                    {msg.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="border-t border-border p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ask me anything about your career..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Quick Actions Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3 bg-transparent"
                          onClick={() => handleQuickSuggestion(suggestion)}
                        >
                          <Lightbulb className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-xs">{suggestion}</span>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm">Career guidance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-accent" />
                        <span className="text-sm">Interview prep</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-sm">Skill recommendations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-sm">Resume feedback</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="human-mentors" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {mockMentors.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {mentor.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentor.title}</p>
                          <p className="text-sm text-muted-foreground">{mentor.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                        <div className="text-muted-foreground">{mentor.sessions} sessions</div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {mentor.expertise.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{mentor.expertise.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Next available: {mentor.nextAvailable}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>How Mentorship Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">1. Choose a Mentor</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse our network of industry professionals and find the perfect match for your goals.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-2">2. Schedule Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Book 1-on-1 sessions at times that work for both you and your mentor.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">3. Grow Your Career</h3>
                      <p className="text-sm text-muted-foreground">
                        Get personalized guidance, feedback, and support to accelerate your career growth.
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
