import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import {
  createSuccessResponse,
  createErrorResponse,
  parseRequestBody,
  requireAuth,
  validateRequiredFields,
} from "@/lib/api-utils"

// Add mockData reference
const mockData = {
  careerGoals: new Map<string, any[]>(),
}

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const goals = mockData.careerGoals.get(userId) || []

    return createSuccessResponse(goals)
  } catch (error) {
    console.error("[v0] Get career goals error:", error)
    return createErrorResponse("Failed to get career goals", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["title", "description", "targetRole", "timeline"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { title, description, targetRole, timeline, requiredSkills = [] } = body

    // Generate default milestones based on target role
    const defaultMilestones = [
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "Complete skill assessments",
        description: "Assess current skill levels",
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "Build relevant projects",
        description: "Create portfolio projects showcasing required skills",
        completed: false,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "Apply to target positions",
        description: "Start applying to relevant internships/jobs",
        completed: false,
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 months
      },
    ]

    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      title,
      description,
      targetRole,
      timeline,
      requiredSkills,
      progress: 0,
      milestones: defaultMilestones,
      createdAt: new Date(),
    }

    const existingGoals = mockData.careerGoals.get(userId) || []
    existingGoals.push(newGoal)
    mockData.careerGoals.set(userId, existingGoals)

    // Create notification
    db.notifications.create({
      userId,
      title: "Career Goal Created",
      message: `Your career goal "${title}" has been created with ${defaultMilestones.length} milestones.`,
      type: "skill",
      read: false,
      actionUrl: "/career-roadmap",
      createdAt: new Date(),
    })

    return createSuccessResponse(newGoal, "Career goal created successfully")
  } catch (error) {
    console.error("[v0] Create career goal error:", error)
    return createErrorResponse("Failed to create career goal", 500)
  }
}
