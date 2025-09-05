import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const resumeId = params.id

    const resume = db.resumes.findById(resumeId)

    if (!resume) {
      return createErrorResponse("Resume not found", 404)
    }

    // Verify ownership
    if (resume.userId !== userId) {
      return createErrorResponse("Unauthorized", 403)
    }

    return createSuccessResponse(resume)
  } catch (error) {
    console.error("[v0] Get resume error:", error)
    return createErrorResponse("Failed to get resume", 500)
  }
}
