// API utilities and helpers

import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function createSuccessResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function createErrorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status },
  )
}

export async function parseRequestBody<T>(request: NextRequest): Promise<T> {
  try {
    return await request.json()
  } catch (error) {
    throw new Error("Invalid JSON in request body")
  }
}

export function validateRequiredFields(data: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing required field: ${field}`
    }
  }
  return null
}

// Mock authentication - in real app, use proper JWT/session management
export function getCurrentUserId(request: NextRequest): string | null {
  // For demo purposes, we'll use a header or return a default user ID
  const userId = request.headers.get("x-user-id") || "demo-user-1"
  return userId
}

export function requireAuth(request: NextRequest): string {
  const userId = getCurrentUserId(request)
  if (!userId) {
    throw new Error("Authentication required")
  }
  return userId
}

// AI/ML simulation helpers
export async function simulateResumeAnalysis(resumeText: string) {
  try {
    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      system: `You are an expert resume analyzer and career coach. Analyze the provided resume and return a detailed assessment in JSON format.

Your analysis should include:
1. Overall score (0-100)
2. 3-5 specific strengths
3. 3-5 areas for improvement
4. 3-5 actionable suggestions
5. Relevant keywords found in the resume

Be constructive, specific, and professional in your feedback. Focus on content quality, formatting, ATS compatibility, and industry relevance.`,
      prompt: `Please analyze this resume and provide detailed feedback:

${resumeText}

Return your analysis in this exact JSON format:
{
  "score": 85,
  "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
  "suggestions": ["Actionable suggestion 1", "Actionable suggestion 2", "Actionable suggestion 3"],
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`,
    })

    // Parse the AI response
    try {
      const analysis = JSON.parse(text)

      // Validate the response structure
      if (
        !analysis.score ||
        !analysis.strengths ||
        !analysis.weaknesses ||
        !analysis.suggestions ||
        !analysis.keywords
      ) {
        throw new Error("Invalid AI response structure")
      }

      return {
        score: Math.min(100, Math.max(0, analysis.score)), // Ensure score is between 0-100
        strengths: Array.isArray(analysis.strengths) ? analysis.strengths.slice(0, 5) : [],
        weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses.slice(0, 5) : [],
        suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions.slice(0, 5) : [],
        keywords: Array.isArray(analysis.keywords) ? analysis.keywords.slice(0, 10) : [],
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      // Fallback to mock data if AI parsing fails
      return getFallbackAnalysis()
    }
  } catch (error) {
    console.error("[v0] AI analysis failed:", error)
    // Fallback to mock data if AI call fails
    return getFallbackAnalysis()
  }
}

// Fallback function for when AI analysis fails
function getFallbackAnalysis() {
  const keywords = ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"]
  const foundKeywords = keywords.filter(() => Math.random() > 0.5)

  const strengths = [
    "Strong technical skills in modern frameworks",
    "Good project experience demonstrated",
    "Clear and well-structured format",
  ]

  const weaknesses = [
    "Could include more quantifiable achievements",
    "Missing some industry-relevant keywords",
    "Consider adding more soft skills",
  ]

  const suggestions = [
    "Add specific metrics to your achievements",
    "Include more relevant technical keywords",
    "Highlight leadership and teamwork experiences",
  ]

  const score = Math.floor(Math.random() * 30) + 70 // Score between 70-100

  return {
    score,
    strengths: strengths.slice(0, Math.floor(Math.random() * 3) + 1),
    weaknesses: weaknesses.slice(0, Math.floor(Math.random() * 3) + 1),
    suggestions: suggestions.slice(0, Math.floor(Math.random() * 3) + 1),
    keywords: foundKeywords,
  }
}

export function simulateSkillAssessment(skill: string) {
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"]
  const level = levels[Math.floor(Math.random() * levels.length)]
  const score = Math.floor(Math.random() * 100)

  return { level, score }
}

export function generateMentorResponse(userMessage: string): string {
  // Simple AI mentor responses based on keywords
  const message = userMessage.toLowerCase()

  if (message.includes("resume") || message.includes("cv")) {
    return "Great question about resumes! Here are some key tips: 1) Tailor your resume to each position, 2) Use action verbs and quantify achievements, 3) Keep it concise and relevant. Would you like me to elaborate on any of these points?"
  }

  if (message.includes("interview")) {
    return "Interview preparation is crucial! I recommend: 1) Research the company thoroughly, 2) Practice common technical and behavioral questions, 3) Prepare thoughtful questions to ask them. Remember, interviews are conversations - show your personality and enthusiasm!"
  }

  if (message.includes("skill") || message.includes("learn")) {
    return "Continuous learning is key to career growth! Focus on: 1) Skills relevant to your target roles, 2) Building projects to demonstrate your abilities, 3) Getting feedback from peers and mentors. What specific skills are you looking to develop?"
  }

  if (message.includes("career") || message.includes("path")) {
    return "Career planning is a journey! Consider: 1) Your interests and strengths, 2) Industry trends and opportunities, 3) Short-term and long-term goals. It's okay to pivot as you learn more about yourself and the field. What career areas interest you most?"
  }

  return "That's a thoughtful question! Career development is unique for everyone. I'd recommend focusing on building both technical skills and soft skills, networking with professionals in your field, and gaining practical experience through internships or projects. What specific aspect of your career would you like to explore further?"
}
