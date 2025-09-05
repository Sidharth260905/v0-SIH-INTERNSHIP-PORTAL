import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, parseRequestBody, validateRequiredFields } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["email", "password"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { email, password } = body

    // Find user by email
    const user = db.users.findByEmail(email)
    if (!user) {
      return createErrorResponse("Invalid email or password", 401)
    }

    // Check password (in real app, compare hashed passwords)
    if (user.password !== password) {
      return createErrorResponse("Invalid email or password", 401)
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    // In real app, generate JWT token here
    const token = `mock-jwt-token-${user.id}`

    return createSuccessResponse(
      {
        user: userResponse,
        token,
      },
      "Login successful",
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return createErrorResponse("Login failed", 500)
  }
}
