import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, validateRequiredFields } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["email", "password", "firstName", "lastName"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { email, password, firstName, lastName, university, major, graduationYear } = body

    // Check if user already exists
    const existingUser = db.users.findByEmail(email)
    if (existingUser) {
      return createErrorResponse("User with this email already exists", 409)
    }

    // Create new user
    const newUser = db.users.create({
      email,
      password, // In real app, hash this password
      firstName,
      lastName,
      university: university || "",
      major: major || "",
      graduationYear: graduationYear || undefined,
      skills: [],
      interests: [],
    })

    // Remove password from response
    const { password: _, ...userResponse } = newUser

    // Create welcome notification
    db.notifications.create({
      userId: newUser.id,
      title: "Welcome to InternshipHub!",
      message: "Complete your profile to get personalized internship recommendations.",
      type: "skill",
      read: false,
      actionUrl: "/profile",
      createdAt: new Date(),
    })

    return createSuccessResponse(userResponse, "Account created successfully")
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return createErrorResponse("Failed to create account", 500)
  }
}
