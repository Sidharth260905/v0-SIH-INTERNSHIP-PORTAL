import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const resumes = db.resumes.findByUserId(userId)

    return createSuccessResponse(resumes)
  } catch (error) {
    console.error("[v0] Get resumes error:", error)
    return createErrorResponse("Failed to get resumes", 500)
  }
}
