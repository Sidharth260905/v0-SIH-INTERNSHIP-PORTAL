import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import {
  createSuccessResponse,
  createErrorResponse,
  parseRequestBody,
  requireAuth,
  validateRequiredFields,
} from "@/lib/api-utils"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const portfolioId = params.id
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["title", "description", "technologies"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const portfolio = db.portfolios.findByUserId(userId).find((p) => p.id === portfolioId)

    if (!portfolio) {
      return createErrorResponse("Portfolio not found", 404)
    }

    // Create new project
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      title: body.title,
      description: body.description,
      technologies: body.technologies,
      imageUrl: body.imageUrl || "",
      liveUrl: body.liveUrl || "",
      githubUrl: body.githubUrl || "",
      category: body.category || "Web Development",
      featured: body.featured || false,
    }

    // Add project to portfolio
    const updatedProjects = [...portfolio.projects, newProject]
    const updatedPortfolio = db.portfolios.update(portfolioId, {
      projects: updatedProjects,
    })

    if (!updatedPortfolio) {
      return createErrorResponse("Failed to add project", 500)
    }

    // Create notification
    db.notifications.create({
      userId,
      title: "Project Added",
      message: `Project "${newProject.title}" has been added to your portfolio.`,
      type: "skill",
      read: false,
      actionUrl: "/portfolio-builder",
      createdAt: new Date(),
    })

    return createSuccessResponse(newProject, "Project added successfully")
  } catch (error) {
    console.error("[v0] Add project error:", error)
    return createErrorResponse("Failed to add project", 500)
  }
}
