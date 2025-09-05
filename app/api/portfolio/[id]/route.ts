import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const portfolioId = params.id

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    return createSuccessResponse(portfolio)
  } catch (error) {
    console.error("[v0] Get portfolio error:", error)
    return createErrorResponse("Failed to get portfolio", 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const portfolioId = params.id
    const body = await parseRequestBody(request)

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    // Update portfolio
    const updatedPortfolio = db.portfolios.update(portfolioId, {
      title: body.title || portfolio.title,
      description: body.description || portfolio.description,
      isPublic: body.isPublic !== undefined ? body.isPublic : portfolio.isPublic,
      projects: body.projects || portfolio.projects,
    })

    if (!updatedPortfolio) {
      return createErrorResponse("Failed to update portfolio", 500)
    }

    return createSuccessResponse(updatedPortfolio, "Portfolio updated successfully")
  } catch (error) {
    console.error("[v0] Update portfolio error:", error)
    return createErrorResponse("Failed to update portfolio", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const portfolioId = params.id

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    // In a real app, you would delete from database
    // For mock implementation, we'll just return success
    return createSuccessResponse(null, "Portfolio deleted successfully")
  } catch (error) {
    console.error("[v0] Delete portfolio error:", error)
    return createErrorResponse("Failed to delete portfolio", 500)
  }
}
