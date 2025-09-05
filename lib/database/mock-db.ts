// Mock database implementation using in-memory storage

import type {
  User,
  Resume,
  Portfolio,
  SkillAssessment,
  CareerGoal,
  Internship,
  Application,
  Notification,
  MentorSession,
} from "./types"

// In-memory storage
const mockData = {
  users: new Map<string, User>(),
  resumes: new Map<string, Resume>(),
  portfolios: new Map<string, Portfolio>(),
  skillAssessments: new Map<string, SkillAssessment[]>(),
  careerGoals: new Map<string, CareerGoal[]>(),
  internships: new Map<string, Internship>(),
  applications: new Map<string, Application[]>(),
  notifications: new Map<string, Notification[]>(),
  mentorSessions: new Map<string, MentorSession>(),
}

// Initialize with sample data
function initializeSampleData() {
  // Sample internships
  const sampleInternships: Internship[] = [
    {
      id: "1",
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Hybrid",
      duration: "3 months",
      description: "Join our engineering team to build scalable web applications using React and Node.js.",
      requirements: ["Computer Science major", "3.0+ GPA", "JavaScript experience"],
      skills: ["React", "Node.js", "JavaScript", "Git"],
      salary: "$25/hour",
      applicationDeadline: new Date("2024-12-31"),
      postedAt: new Date("2024-01-15"),
      companyLogo: "/abstract-tech-logo.png",
      industry: "Technology",
    },
    {
      id: "2",
      title: "Data Science Intern",
      company: "DataFlow Inc",
      location: "Remote",
      type: "Remote",
      duration: "4 months",
      description: "Work with our data science team to analyze large datasets and build ML models.",
      requirements: ["Statistics or CS background", "Python experience", "SQL knowledge"],
      skills: ["Python", "SQL", "Machine Learning", "Pandas"],
      salary: "$22/hour",
      applicationDeadline: new Date("2024-11-30"),
      postedAt: new Date("2024-01-10"),
      companyLogo: "/data-company-logo.png",
      industry: "Data & Analytics",
    },
    {
      id: "3",
      title: "UX Design Intern",
      company: "DesignStudio",
      location: "New York, NY",
      type: "On-site",
      duration: "3 months",
      description: "Create user-centered designs for mobile and web applications.",
      requirements: ["Design portfolio", "Figma experience", "User research knowledge"],
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      salary: "$20/hour",
      applicationDeadline: new Date("2024-12-15"),
      postedAt: new Date("2024-01-20"),
      companyLogo: "/design-studio-logo.png",
      industry: "Design",
    },
  ]

  sampleInternships.forEach((internship) => {
    mockData.internships.set(internship.id, internship)
  })
}

// Initialize sample data
initializeSampleData()

// Database operations
export const db = {
  // Users
  users: {
    create: (user: Omit<User, "id" | "createdAt" | "updatedAt">): User => {
      const newUser: User = {
        ...user,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockData.users.set(newUser.id, newUser)
      return newUser
    },
    findByEmail: (email: string): User | undefined => {
      return Array.from(mockData.users.values()).find((user) => user.email === email)
    },
    findById: (id: string): User | undefined => {
      return mockData.users.get(id)
    },
    update: (id: string, updates: Partial<User>): User | undefined => {
      const user = mockData.users.get(id)
      if (user) {
        const updatedUser = { ...user, ...updates, updatedAt: new Date() }
        mockData.users.set(id, updatedUser)
        return updatedUser
      }
      return undefined
    },
  },

  // Resumes
  resumes: {
    create: (resume: Omit<Resume, "id" | "createdAt" | "updatedAt">): Resume => {
      const newResume: Resume = {
        ...resume,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockData.resumes.set(newResume.id, newResume)
      return newResume
    },
    findByUserId: (userId: string): Resume[] => {
      return Array.from(mockData.resumes.values()).filter((resume) => resume.userId === userId)
    },
    findById: (id: string): Resume | undefined => {
      return mockData.resumes.get(id)
    },
  },

  // Portfolios
  portfolios: {
    create: (portfolio: Omit<Portfolio, "id" | "createdAt" | "updatedAt">): Portfolio => {
      const newPortfolio: Portfolio = {
        ...portfolio,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockData.portfolios.set(newPortfolio.id, newPortfolio)
      return newPortfolio
    },
    findByUserId: (userId: string): Portfolio[] => {
      return Array.from(mockData.portfolios.values()).filter((portfolio) => portfolio.userId === userId)
    },
    update: (id: string, updates: Partial<Portfolio>): Portfolio | undefined => {
      const portfolio = mockData.portfolios.get(id)
      if (portfolio) {
        const updatedPortfolio = { ...portfolio, ...updates, updatedAt: new Date() }
        mockData.portfolios.set(id, updatedPortfolio)
        return updatedPortfolio
      }
      return undefined
    },
  },

  // Internships
  internships: {
    findAll: (): Internship[] => {
      return Array.from(mockData.internships.values())
    },
    findById: (id: string): Internship | undefined => {
      return mockData.internships.get(id)
    },
    search: (query: string, filters?: any): Internship[] => {
      const allInternships = Array.from(mockData.internships.values())
      return allInternships.filter((internship) => {
        const matchesQuery =
          query === "" ||
          internship.title.toLowerCase().includes(query.toLowerCase()) ||
          internship.company.toLowerCase().includes(query.toLowerCase()) ||
          internship.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))

        // Apply filters if provided
        if (filters) {
          if (filters.location && !internship.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false
          }
          if (filters.type && internship.type !== filters.type) {
            return false
          }
          if (filters.industry && internship.industry !== filters.industry) {
            return false
          }
        }

        return matchesQuery
      })
    },
  },

  // Applications
  applications: {
    create: (application: Omit<Application, "id">): Application => {
      const newApplication: Application = {
        ...application,
        id: generateId(),
      }

      const userApplications = mockData.applications.get(application.userId) || []
      userApplications.push(newApplication)
      mockData.applications.set(application.userId, userApplications)

      return newApplication
    },
    findByUserId: (userId: string): Application[] => {
      return mockData.applications.get(userId) || []
    },
  },

  // Notifications
  notifications: {
    create: (notification: Omit<Notification, "id">): Notification => {
      const newNotification: Notification = {
        ...notification,
        id: generateId(),
      }

      const userNotifications = mockData.notifications.get(notification.userId) || []
      userNotifications.unshift(newNotification) // Add to beginning
      mockData.notifications.set(notification.userId, userNotifications)

      return newNotification
    },
    findByUserId: (userId: string): Notification[] => {
      return mockData.notifications.get(userId) || []
    },
    markAsRead: (userId: string, notificationId: string): boolean => {
      const userNotifications = mockData.notifications.get(userId) || []
      const notification = userNotifications.find((n) => n.id === notificationId)
      if (notification) {
        notification.read = true
        return true
      }
      return false
    },
  },

  // Mentor Sessions
  mentorSessions: {
    findByUserId: (userId: string): MentorSession | undefined => {
      return mockData.mentorSessions.get(userId)
    },
    createOrUpdate: (userId: string, session: Omit<MentorSession, "id" | "userId">): MentorSession => {
      const existingSession = mockData.mentorSessions.get(userId)
      if (existingSession) {
        const updatedSession = { ...existingSession, ...session, updatedAt: new Date() }
        mockData.mentorSessions.set(userId, updatedSession)
        return updatedSession
      } else {
        const newSession: MentorSession = {
          ...session,
          id: generateId(),
          userId,
        }
        mockData.mentorSessions.set(userId, newSession)
        return newSession
      }
    },
  },
}

// Utility function to generate IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}
