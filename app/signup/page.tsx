"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    major: "",
    graduationYear: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const saveFormData = (data: typeof formData) => {
    localStorage.setItem("signup-form-draft", JSON.stringify(data))
  }

  useEffect(() => {
    const saved = localStorage.getItem("signup-form-draft")
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load saved form data")
      }
    }
  }, [])

  const updateFormData = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    saveFormData(newData)

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.university.trim()) newErrors.university = "University is required"
    if (!formData.major.trim()) newErrors.major = "Major is required"
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const success = await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        university: formData.university,
        major: formData.major,
        graduationYear: Number.parseInt(formData.graduationYear) || undefined,
      })

      if (success) {
        setSuccess(true)
        localStorage.removeItem("signup-form-draft")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setErrors({ general: "Failed to create account. Please try again." })
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Account Created!</h2>
            <p className="text-muted-foreground">Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">CareerLaunch</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-muted-foreground">Start your career journey today</p>
        </div>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account to get personalized career insights</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className={`transition-all duration-200 ${errors.firstName ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className={`transition-all duration-200 ${errors.lastName ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@university.edu"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={`transition-all duration-200 ${errors.email ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  placeholder="Your University"
                  value={formData.university}
                  onChange={(e) => updateFormData("university", e.target.value)}
                  className={`transition-all duration-200 ${errors.university ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  disabled={isLoading}
                />
                {errors.university && (
                  <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    {errors.university}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major/Field of Study</Label>
                <Input
                  id="major"
                  placeholder="Computer Science"
                  value={formData.major}
                  onChange={(e) => updateFormData("major", e.target.value)}
                  className={`transition-all duration-200 ${errors.major ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  disabled={isLoading}
                />
                {errors.major && (
                  <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    {errors.major}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation</Label>
                <Select
                  value={formData.graduationYear}
                  onValueChange={(value) => updateFormData("graduationYear", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    className={`transition-all duration-200 ${errors.graduationYear ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  >
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
                {errors.graduationYear && (
                  <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    {errors.graduationYear}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className={`transition-all duration-200 ${errors.password ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline transition-colors duration-200">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
