import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, requireAuth } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    const { targetRole, requiredSkills } = body

    const user = db.users.findById(userId)
    if (!user) {
      return createErrorResponse("User not found", 404)
    }

    // Analyze skill gaps
    const userSkills = user.skills || []
    const missingSkills = requiredSkills.filter((skill: string) => !userSkills.includes(skill))
    const matchingSkills = requiredSkills.filter((skill: string) => userSkills.includes(skill))

    // Calculate match percentage
    const matchPercentage = Math.round((matchingSkills.length / requiredSkills.length) * 100)

    // Generate learning recommendations
    const learningRecommendations = missingSkills.map((skill: string) => ({
      skill,
      priority: Math.random() > 0.5 ? "High" : "Medium",
      estimatedTime: `${Math.floor(Math.random() * 8) + 2} weeks`,
      resources: [`${skill} Fundamentals Course`, `${skill} Practice Projects`, `${skill} Certification Program`],
    }))

    const analysis = {
      targetRole,
      matchPercentage,
      matchingSkills,
      missingSkills,
      learningRecommendations,
      analysisDate: new Date(),
    }

    // Create notification if match is low
    if (matchPercentage < 70) {
      db.notifications.create({
        userId,
        title: "Skill Gap Identified",
        message: `You match ${matchPercentage}% of skills for ${targetRole}. Check your learning plan!`,
        type: "skill",
        read: false,
        actionUrl: "/skill-analysis",
        createdAt: new Date(),
      })
    }

    return createSuccessResponse(analysis, "Skill gap analysis completed")
  } catch (error) {
    console.error("[v0] Skill gap analysis error:", error)
    return createErrorResponse("Failed to analyze skill gaps", 500)
  }
}
