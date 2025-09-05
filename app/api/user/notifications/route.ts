import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const notifications = db.notifications.findByUserId(userId)

    return createSuccessResponse(notifications)
  } catch (error) {
    console.error("[v0] Get notifications error:", error)
    return createErrorResponse("Failed to get notifications", 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get("id")

    if (!notificationId) {
      return createErrorResponse("Notification ID is required")
    }

    const success = db.notifications.markAsRead(userId, notificationId)

    if (!success) {
      return createErrorResponse("Notification not found", 404)
    }

    return createSuccessResponse(null, "Notification marked as read")
  } catch (error) {
    console.error("[v0] Mark notification read error:", error)
    return createErrorResponse("Failed to mark notification as read", 500)
  }
}
