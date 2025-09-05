import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import {
  createSuccessResponse,
  createErrorResponse,
  parseRequestBody,
  requireAuth,
  validateRequiredFields,
  simulateSkillAssessment,
} from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["skill", "answers"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { skill, answers } = body

    // Simulate skill assessment based on answers
    const assessment = simulateSkillAssessment(skill)

    // Save assessment to user's skill assessments
    const existingAssessments = mockData.skillAssessments.get(userId) || []
    const newAssessment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      skill,
      level: assessment.level as "Beginner" | "Intermediate" | "Advanced" | "Expert",
      score: assessment.score,
      completedAt: new Date(),
    }

    // Remove any existing assessment for this skill
    const filteredAssessments = existingAssessments.filter((a) => a.skill !== skill)
    filteredAssessments.push(newAssessment)
    mockData.skillAssessments.set(userId, filteredAssessments)

    // Update user's skills list
    const user = db.users.findById(userId)
    if (user) {
      const updatedSkills = [...new Set([...user.skills, skill])]
      db.users.update(userId, { skills: updatedSkills })
    }

    // Create notification
    db.notifications.create({
      userId,
      title: "Skill Assessment Complete",
      message: `You scored ${assessment.score}/100 in ${skill} (${assessment.level} level)`,
      type: "skill",
      read: false,
      actionUrl: "/skill-analysis",
      createdAt: new Date(),
    })

    return createSuccessResponse(newAssessment, "Skill assessment completed successfully")
  } catch (error) {
    console.error("[v0] Skill assessment error:", error)
    return createErrorResponse("Failed to complete skill assessment", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const assessments = mockData.skillAssessments.get(userId) || []

    return createSuccessResponse(assessments)
  } catch (error) {
    console.error("[v0] Get skill assessments error:", error)
    return createErrorResponse("Failed to get skill assessments", 500)
  }
}

// Add mockData reference to the file
const mockData = {
  skillAssessments: new Map<string, any[]>(),
}
