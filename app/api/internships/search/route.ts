import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const { searchParams } = new URL(request.url)

    const query = searchParams.get("q") || ""
    const location = searchParams.get("location") || ""
    const type = searchParams.get("type") || ""
    const industry = searchParams.get("industry") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build filters object
    const filters: any = {}
    if (location) filters.location = location
    if (type) filters.type = type
    if (industry) filters.industry = industry

    // Search internships
    let results = db.internships.search(query, filters)

    // Calculate match scores for personalized ranking
    const user = db.users.findById(userId)
    if (user) {
      results = results.map((internship) => {
        let matchScore = 0

        // Skill matching
        const skillMatches = internship.skills.filter((skill) => user.skills.includes(skill)).length
        matchScore += (skillMatches / internship.skills.length) * 40

        // Interest matching
        const interestMatches = user.interests.filter(
          (interest) =>
            internship.title.toLowerCase().includes(interest.toLowerCase()) ||
            internship.description.toLowerCase().includes(interest.toLowerCase()),
        ).length
        matchScore += Math.min(interestMatches * 10, 20)

        // Location preference (mock scoring)
        if (user.university && internship.location.includes("Remote")) {
          matchScore += 10
        }

        // Recency bonus
        const daysSincePosted = Math.floor((Date.now() - internship.postedAt.getTime()) / (1000 * 60 * 60 * 24))
        matchScore += Math.max(0, 30 - daysSincePosted)

        return {
          ...internship,
          matchScore: Math.min(100, Math.round(matchScore)),
        }
      })

      // Sort by match score
      results.sort((a, b) => (b as any).matchScore - (a as any).matchScore)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = results.slice(startIndex, endIndex)

    const response = {
      internships: paginatedResults,
      pagination: {
        page,
        limit,
        total: results.length,
        totalPages: Math.ceil(results.length / limit),
        hasNext: endIndex < results.length,
        hasPrev: page > 1,
      },
      filters: {
        query,
        location,
        type,
        industry,
      },
    }

    return createSuccessResponse(response, "Search completed successfully")
  } catch (error) {
    console.error("[v0] Internship search error:", error)
    return createErrorResponse("Failed to search internships", 500)
  }
}
