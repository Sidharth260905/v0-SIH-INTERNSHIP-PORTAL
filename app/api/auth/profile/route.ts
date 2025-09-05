import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const user = db.users.findById(userId)
    if (!user) {
      return createErrorResponse("User not found", 404)
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    return createSuccessResponse(userResponse)
  } catch (error) {
    console.error("[v0] Get profile error:", error)
    return createErrorResponse("Failed to get profile", 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    const user = db.users.findById(userId)
    if (!user) {
      return createErrorResponse("User not found", 404)
    }

    // Update user profile
    const updatedUser = db.users.update(userId, {
      firstName: body.firstName || user.firstName,
      lastName: body.lastName || user.lastName,
      university: body.university || user.university,
      major: body.major || user.major,
      graduationYear: body.graduationYear || user.graduationYear,
      bio: body.bio || user.bio,
      skills: body.skills || user.skills,
      interests: body.interests || user.interests,
    })

    if (!updatedUser) {
      return createErrorResponse("Failed to update profile", 500)
    }

    // Remove password from response
    const { password: _, ...userResponse } = updatedUser

    return createSuccessResponse(userResponse, "Profile updated successfully")
  } catch (error) {
    console.error("[v0] Update profile error:", error)
    return createErrorResponse("Failed to update profile", 500)
  }
}
