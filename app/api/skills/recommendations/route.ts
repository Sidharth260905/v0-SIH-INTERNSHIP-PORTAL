import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const user = db.users.findById(userId)
    if (!user) {
      return createErrorResponse("User not found", 404)
    }

    // Get all internships to analyze skill trends
    const allInternships = db.internships.findAll()

    // Analyze trending skills based on internship requirements
    const skillFrequency = new Map<string, number>()
    allInternships.forEach((internship) => {
      internship.skills.forEach((skill) => {
        skillFrequency.set(skill, (skillFrequency.get(skill) || 0) + 1)
      })
    })

    // Get top trending skills
    const trendingSkills = Array.from(skillFrequency.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, frequency]) => ({
        skill,
        demand: frequency > 5 ? "High" : frequency > 2 ? "Medium" : "Low",
        frequency,
      }))

    // Recommend skills based on user's current skills and interests
    const userSkills = user.skills || []
    const userInterests = user.interests || []

    const recommendations = trendingSkills
      .filter(({ skill }) => !userSkills.includes(skill))
      .slice(0, 6)
      .map(({ skill, demand }) => ({
        skill,
        reason: userInterests.some((interest) => skill.toLowerCase().includes(interest.toLowerCase()))
          ? "Matches your interests"
          : "High demand in job market",
        demand,
        estimatedLearningTime: `${Math.floor(Math.random() * 8) + 2} weeks`,
        resources: [`${skill} Fundamentals Course`, `${skill} Hands-on Projects`, `${skill} Certification`],
      }))

    const response = {
      trendingSkills: trendingSkills.slice(0, 5),
      personalizedRecommendations: recommendations,
      userSkills,
      generatedAt: new Date(),
    }

    return createSuccessResponse(response, "Skill recommendations generated")
  } catch (error) {
    console.error("[v0] Skill recommendations error:", error)
    return createErrorResponse("Failed to generate skill recommendations", 500)
  }
}
