import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import {
  createSuccessResponse,
  createErrorResponse,
  parseRequestBody,
  requireAuth,
  validateRequiredFields,
  generateMentorResponse,
} from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const session = db.mentorSessions.findByUserId(userId)

    if (!session) {
      // Create initial session with welcome message
      const welcomeSession = db.mentorSessions.createOrUpdate(userId, {
        messages: [
          {
            id: Math.random().toString(36).substr(2, 9),
            content:
              "Hello! I'm your AI career mentor. I'm here to help you with resume tips, interview preparation, skill development, and career planning. What would you like to discuss today?",
            sender: "mentor",
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return createSuccessResponse(welcomeSession)
    }

    return createSuccessResponse(session)
  } catch (error) {
    console.error("[v0] Get mentor chat error:", error)
    return createErrorResponse("Failed to get mentor chat", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)
    const body = await parseRequestBody(request)

    // Validate required fields
    const validation = validateRequiredFields(body, ["message"])
    if (validation) {
      return createErrorResponse(validation)
    }

    const { message } = body

    // Get existing session or create new one
    let session = db.mentorSessions.findByUserId(userId)
    if (!session) {
      session = db.mentorSessions.createOrUpdate(userId, {
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Add user message
    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: message,
      sender: "user" as const,
      timestamp: new Date(),
    }

    // Generate mentor response
    const mentorResponseContent = generateMentorResponse(message)
    const mentorMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: mentorResponseContent,
      sender: "mentor" as const,
      timestamp: new Date(),
    }

    // Update session with new messages
    const updatedMessages = [...session.messages, userMessage, mentorMessage]
    const updatedSession = db.mentorSessions.createOrUpdate(userId, {
      messages: updatedMessages,
      createdAt: session.createdAt,
      updatedAt: new Date(),
    })

    return createSuccessResponse(updatedSession, "Message sent successfully")
  } catch (error) {
    console.error("[v0] Send mentor message error:", error)
    return createErrorResponse("Failed to send message", 500)
  }
}
