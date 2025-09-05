import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const internshipId = params.id

    const internship = db.internships.findById(internshipId)

    if (!internship) {
      return createErrorResponse("Internship not found", 404)
    }

    // Check if user has applied
    const applications = db.applications.findByUserId(userId)
    const hasApplied = applications.some((app) => app.internshipId === internshipId)

    // Calculate match score for this user
    const user = db.users.findById(userId)
    let matchScore = 0

    if (user) {
      const skillMatches = internship.skills.filter((skill) => user.skills.includes(skill))
      matchScore = Math.round((skillMatches.length / internship.skills.length) * 100)
    }

    const response = {
      ...internship,
      hasApplied,
      matchScore,
      skillMatches: user ? internship.skills.filter((skill) => user.skills.includes(skill)) : [],
    }

    return createSuccessResponse(response)
  } catch (error) {
    console.error("[v0] Get internship details error:", error)
    return createErrorResponse("Failed to get internship details", 500)
  }
}
