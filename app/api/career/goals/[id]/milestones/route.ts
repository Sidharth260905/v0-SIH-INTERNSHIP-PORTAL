import type { NextRequest } from "next/server"
import { createSuccessResponse, createErrorResponse, parseRequestBody, requireAuth } from "@/lib/api-utils"

// Add mockData reference
const mockData = {
  careerGoals: new Map<string, any[]>(),
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = requireAuth(request)
    const goalId = params.id
    const body = await parseRequestBody(request)

    const { milestoneId, completed } = body

    const userGoals = mockData.careerGoals.get(userId) || []
    const goalIndex = userGoals.findIndex((g) => g.id === goalId)

    if (goalIndex === -1) {
      return createErrorResponse("Career goal not found", 404)
    }

    const goal = userGoals[goalIndex]
    const milestoneIndex = goal.milestones.findIndex((m: any) => m.id === milestoneId)

    if (milestoneIndex === -1) {
      return createErrorResponse("Milestone not found", 404)
    }

    // Update milestone
    goal.milestones[milestoneIndex].completed = completed
    if (completed) {
      goal.milestones[milestoneIndex].completedAt = new Date()
    }

    // Recalculate progress
    const completedMilestones = goal.milestones.filter((m: any) => m.completed).length
    goal.progress = Math.round((completedMilestones / goal.milestones.length) * 100)

    // Update the goal in storage
    userGoals[goalIndex] = goal
    mockData.careerGoals.set(userId, userGoals)

    return createSuccessResponse(goal, "Milestone updated successfully")
  } catch (error) {
    console.error("[v0] Update milestone error:", error)
    return createErrorResponse("Failed to update milestone", 500)
  }
}
