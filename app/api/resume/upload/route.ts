import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth, simulateResumeAnalysis } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileName = formData.get("fileName") as string

    if (!file) {
      return createErrorResponse("No file provided")
    }

    // In a real app, you would upload to cloud storage
    // For demo, we'll simulate file processing
    const fileUrl = `/uploads/resumes/${userId}/${fileName}`

    // Simulate reading file content for analysis
    const fileContent = await file.text()

    // Run AI analysis simulation
    const analysis = simulateResumeAnalysis(fileContent)

    // Save resume record to database
    const resume = db.resumes.create({
      userId,
      fileName,
      fileUrl,
      analysisScore: analysis.score,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
      keywords: analysis.keywords,
    })

    // Create notification about analysis completion
    db.notifications.create({
      userId,
      title: "Resume Analysis Complete",
      message: `Your resume scored ${analysis.score}/100. Check out the detailed feedback!`,
      type: "skill",
      read: false,
      actionUrl: "/resume-analyzer",
      createdAt: new Date(),
    })

    return createSuccessResponse(resume, "Resume uploaded and analyzed successfully")
  } catch (error) {
    console.error("[v0] Resume upload error:", error)
    return createErrorResponse("Failed to upload resume", 500)
  }
}
