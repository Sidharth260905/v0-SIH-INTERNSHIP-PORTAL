"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/database/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  loading: boolean
}

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  university?: string
  major?: string
  graduationYear?: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("[v0] Failed to parse user data:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.data.user)
        localStorage.setItem("auth-token", data.data.token)
        localStorage.setItem("user-data", JSON.stringify(data.data.user))
        return true
      } else {
        console.error("[v0] Login failed:", data.error)
        return false
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      return false
    }
  }

  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (data.success) {
        // Auto-login after successful signup
        return await login(userData.email, userData.password)
      } else {
        console.error("[v0] Signup failed:", data.error)
        return false
      }
    } catch (error) {
      console.error("[v0] Signup error:", error)
      return false
    }
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id || "",
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.data)
        localStorage.setItem("user-data", JSON.stringify(data.data))
        return true
      } else {
        console.error("[v0] Profile update failed:", data.error)
        return false
      }
    } catch (error) {
      console.error("[v0] Profile update error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
