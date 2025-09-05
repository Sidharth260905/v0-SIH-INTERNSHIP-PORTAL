import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import {
  createSuccessResponse,
  createErrorResponse,
  parseRequestBody,
  requireAuth,
  validateRequiredFields,
} from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const portfolios = db.portfolios.findByUserId(userId)

    return createSuccessResponse(portfolios)
  } catch (error) {
    console.error("[v0] Get portfolios error:", error)
    return createErrorResponse("Failed to get portfolios", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["title", "description"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { title, description, isPublic = false } = body

    // Create new portfolio
    const portfolio = db.portfolios.create({
      userId,
      title,
      description,
      projects: [],
      isPublic,
    })

    // Create notification
    db.notifications.create({
      userId,
      title: "Portfolio Created",
      message: `Your portfolio "${title}" has been created. Start adding projects!`,
      type: "skill",
      read: false,
      actionUrl: "/portfolio-builder",
      createdAt: new Date(),
    })

    return createSuccessResponse(portfolio, "Portfolio created successfully")
  } catch (error) {
    console.error("[v0] Create portfolio error:", error)
    return createErrorResponse("Failed to create portfolio", 500)
  }
}
