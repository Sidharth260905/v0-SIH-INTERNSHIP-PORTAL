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

    const applications = db.applications.findByUserId(userId)

    // Enrich applications with internship details
    const enrichedApplications = applications.map((app) => {
      const internship = db.internships.findById(app.internshipId)
      return {
        ...app,
        internship,
      }
    })

    return createSuccessResponse(enrichedApplications)
  } catch (error) {
    console.error("[v0] Get applications error:", error)
    return createErrorResponse("Failed to get applications", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["internshipId"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { internshipId, notes } = body

    // Check if internship exists
    const internship = db.internships.findById(internshipId)
    if (!internship) {
      return createErrorResponse("Internship not found", 404)
    }

    // Check if user already applied
    const existingApplications = db.applications.findByUserId(userId)
    const alreadyApplied = existingApplications.some((app) => app.internshipId === internshipId)

    if (alreadyApplied) {
      return createErrorResponse("You have already applied to this internship", 409)
    }

    // Create application
    const application = db.applications.create({
      userId,
      internshipId,
      status: "Applied",
      appliedAt: new Date(),
      notes: notes || "",
    })

    // Create notification
    db.notifications.create({
      userId,
      title: "Application Submitted",
      message: `Your application to ${internship.title} at ${internship.company} has been submitted successfully.`,
      type: "application",
      read: false,
      actionUrl: "/dashboard",
      createdAt: new Date(),
    })

    // Simulate application deadline reminder
    const daysUntilDeadline = Math.floor(
      (internship.applicationDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    )

    if (daysUntilDeadline <= 7 && daysUntilDeadline > 0) {
      db.notifications.create({
        userId,
        title: "Application Deadline Reminder",
        message: `The application deadline for ${internship.title} is in ${daysUntilDeadline} days.`,
        type: "deadline",
        read: false,
        actionUrl: "/dashboard",
        createdAt: new Date(),
      })
    }

    return createSuccessResponse(
      {
        ...application,
        internship,
      },
      "Application submitted successfully",
    )
  } catch (error) {
    console.error("[v0] Submit application error:", error)
    return createErrorResponse("Failed to submit application", 500)
  }
}
