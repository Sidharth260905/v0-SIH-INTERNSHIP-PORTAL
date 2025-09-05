import type { NextRequest } from "next/server"
import { db } from "@/lib/database/mock-db"
import { createSuccessResponse, createErrorResponse, requireAuth } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const userId = requireAuth(request)

    const user = db.users.findById(userId)
    if (!user) {
      return createErrorResponse("User not found", 404)
    }

    // Calculate profile strength based on various factors
    let score = 0
    const factors = []

    // Basic profile completion (30 points)
    if (user.firstName && user.lastName) score += 5
    if (user.email) score += 5
    if (user.university) score += 5
    if (user.major) score += 5
    if (user.bio) score += 10

    factors.push({
      category: "Basic Information",
      score: Math.min(30, score),
      maxScore: 30,
      suggestions: score < 30 ? ["Complete your profile information", "Add a professional bio"] : [],
    })

    // Skills (25 points)
    const skillScore = Math.min(25, user.skills.length * 3)
    score += skillScore

    factors.push({
      category: "Skills",
      score: skillScore,
      maxScore: 25,
      suggestions: skillScore < 25 ? ["Add more relevant skills", "Take skill assessments"] : [],
    })

    // Resume (20 points)
    const resumes = db.resumes.findByUserId(userId)
    const resumeScore = resumes.length > 0 ? 20 : 0
    score += resumeScore

    factors.push({
      category: "Resume",
      score: resumeScore,
      maxScore: 20,
      suggestions: resumeScore < 20 ? ["Upload and analyze your resume"] : [],
    })

    // Portfolio (25 points)
    const portfolios = db.portfolios.findByUserId(userId)
    const portfolioScore = portfolios.length > 0 ? 25 : 0
    score += portfolioScore

    factors.push({
      category: "Portfolio",
      score: portfolioScore,
      maxScore: 25,
      suggestions: portfolioScore < 25 ? ["Create a portfolio", "Add projects to showcase your work"] : [],
    })

    const totalScore = Math.min(100, score)

    // Generate overall recommendations
    const recommendations = []
    if (totalScore < 50) {
      recommendations.push("Complete your basic profile information")
      recommendations.push("Upload your resume for analysis")
    } else if (totalScore < 75) {
      recommendations.push("Add more skills and take assessments")
      recommendations.push("Create a portfolio with your projects")
    } else {
      recommendations.push("Apply to relevant internships")
      recommendations.push("Connect with mentors in your field")
    }

    const analysis = {
      overallScore: totalScore,
      factors,
      recommendations,
      lastUpdated: new Date(),
    }

    return createSuccessResponse(analysis, "Profile strength analysis completed")
  } catch (error) {
    console.error("[v0] Profile strength analysis error:", error)
    return createErrorResponse("Failed to analyze profile strength", 500)
  }
}
