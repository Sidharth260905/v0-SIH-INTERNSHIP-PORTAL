// Database type definitions for the internship portal

export interface User {
  id: string
  email: string
  password: string // In real app, this would be hashed
  firstName: string
  lastName: string
  university?: string
  major?: string
  graduationYear?: number
  profilePicture?: string
  bio?: string
  skills: string[]
  interests: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Resume {
  id: string
  userId: string
  fileName: string
  fileUrl: string
  analysisScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywords: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Portfolio {
  id: string
  userId: string
  title: string
  description: string
  projects: Project[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  category: string
  featured: boolean
}

export interface SkillAssessment {
  id: string
  userId: string
  skill: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  score: number
  completedAt: Date
}

export interface CareerGoal {
  id: string
  userId: string
  title: string
  description: string
  targetRole: string
  timeline: string
  requiredSkills: string[]
  progress: number
  milestones: Milestone[]
  createdAt: Date
}

export interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate?: Date
  completedAt?: Date
}

export interface Internship {
  id: string
  title: string
  company: string
  location: string
  type: "Remote" | "On-site" | "Hybrid"
  duration: string
  description: string
  requirements: string[]
  skills: string[]
  salary?: string
  applicationDeadline: Date
  postedAt: Date
  companyLogo?: string
  industry: string
}

export interface Application {
  id: string
  userId: string
  internshipId: string
  status: "Applied" | "Under Review" | "Interview" | "Rejected" | "Accepted"
  appliedAt: Date
  notes?: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "application" | "deadline" | "recommendation" | "skill" | "mentor"
  read: boolean
  actionUrl?: string
  createdAt: Date
}

export interface MentorSession {
  id: string
  userId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "mentor"
  timestamp: Date
}
