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

    // Get all internships
    const allInternships = db.internships.findAll()

    // Calculate personalized recommendations
    const recommendations = allInternships
      .map((internship) => {
        let score = 0
        const reasons = []

        // Skill matching (40% weight)
        const skillMatches = internship.skills.filter((skill) => user.skills.includes(skill))
        const skillMatchPercentage = (skillMatches.length / internship.skills.length) * 100
        score += skillMatchPercentage * 0.4

        if (skillMatches.length > 0) {
          reasons.push(`${skillMatches.length} matching skills: ${skillMatches.slice(0, 3).join(", ")}`)
        }

        // Interest matching (20% weight)
        const interestMatches = user.interests.filter(
          (interest) =>
            internship.title.toLowerCase().includes(interest.toLowerCase()) ||
            internship.description.toLowerCase().includes(interest.toLowerCase()) ||
            internship.industry.toLowerCase().includes(interest.toLowerCase()),
        )
        score += Math.min(interestMatches.length * 20, 20) * 0.2

        if (interestMatches.length > 0) {
          reasons.push(`Matches your interests: ${interestMatches.slice(0, 2).join(", ")}`)
        }

        // Major relevance (20% weight)
        if (user.major) {
          const majorKeywords = user.major.toLowerCase().split(" ")
          const titleMatch = majorKeywords.some((keyword) => internship.title.toLowerCase().includes(keyword))
          const descriptionMatch = majorKeywords.some((keyword) =>
            internship.description.toLowerCase().includes(keyword),
          )

          if (titleMatch || descriptionMatch) {
            score += 20 * 0.2
            reasons.push(`Relevant to your ${user.major} major`)
          }
        }

        // Application deadline urgency (10% weight)
        const daysUntilDeadline = Math.floor(
          (internship.applicationDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        )
        if (daysUntilDeadline > 0 && daysUntilDeadline <= 30) {
          score += (30 - daysUntilDeadline) * 0.1
          if (daysUntilDeadline <= 7) {
            reasons.push("Application deadline approaching!")
          }
        }

        // Recency bonus (10% weight)
        const daysSincePosted = Math.floor((Date.now() - internship.postedAt.getTime()) / (1000 * 60 * 60 * 24))
        if (daysSincePosted <= 7) {
          score += (7 - daysSincePosted) * 0.1
          reasons.push("Recently posted")
        }

        return {
          ...internship,
          recommendationScore: Math.round(score),
          matchReasons: reasons,
          skillMatches: skillMatches,
          daysUntilDeadline,
        }
      })
      .filter((internship) => (internship as any).recommendationScore > 20) // Only show decent matches
      .sort((a, b) => (b as any).recommendationScore - (a as any).recommendationScore)
      .slice(0, 10) // Top 10 recommendations

    // Create notification for new recommendations
    if (recommendations.length > 0) {
      const topMatch = recommendations[0] as any
      db.notifications.create({
        userId,
        title: "New Internship Recommendations",
        message: `We found ${recommendations.length} internships matching your profile. Top match: ${topMatch.title} at ${topMatch.company}`,
        type: "recommendation",
        read: false,
        actionUrl: "/internship-search",
        createdAt: new Date(),
      })
    }

    return createSuccessResponse(recommendations, "Recommendations generated successfully")
  } catch (error) {
    console.error("[v0] Recommendations error:", error)
    return createErrorResponse("Failed to generate recommendations", 500)
  }
}
