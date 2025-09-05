import type React from "react"
import { AppHeader } from "@/components/app-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  )
}
