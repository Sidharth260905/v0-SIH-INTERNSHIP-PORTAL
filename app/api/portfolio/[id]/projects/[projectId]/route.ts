import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, requireAuth } from "@/lib/api-utils"

export async function PUT(request: NextRequest, { params }: { params: { portfolioId: string; projectId: string } }) {
  try {
    const userId = requireAuth(request)
    const { portfolioId, projectId } = params
    const body = await parseRequestBody(request)

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    // Find and update project
    const projectIndex = portfolio.projects.findIndex((p) => p.id === projectId)
    if (projectIndex === -1) {
      return createErrorResponse("Project not found", 404)
    }

    const updatedProject = {
      ...portfolio.projects[projectIndex],
      ...body,
    }

    const updatedProjects = [...portfolio.projects]
    updatedProjects[projectIndex] = updatedProject

    const updatedPortfolio = db.portfolios.update(portfolioId, {
      projects: updatedProjects,
    })

    if (!updatedPortfolio) {
      return createErrorResponse("Failed to update project", 500)
    }

    return createSuccessResponse(updatedProject, "Project updated successfully")
  } catch (error) {
    console.error("[v0] Update project error:", error)
    return createErrorResponse("Failed to update project", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { portfolioId: string; projectId: string } }) {
  try {
    const userId = requireAuth(request)
    const { portfolioId, projectId } = params

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    // Remove project
    const updatedProjects = portfolio.projects.filter((p) => p.id !== projectId)

    const updatedPortfolio = db.portfolios.update(portfolioId, {
      projects: updatedProjects,
    })

    if (!updatedPortfolio) {
      return createErrorResponse("Failed to delete project", 500)
    }

    return createSuccessResponse(null, "Project deleted successfully")
  } catch (error) {
    console.error("[v0] Delete project error:", error)
    return createErrorResponse("Failed to delete project", 500)
  }
}
