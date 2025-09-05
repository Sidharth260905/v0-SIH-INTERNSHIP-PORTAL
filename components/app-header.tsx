"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  User,
  Menu,
  Search,
  FileText,
  Briefcase,
  TrendingUp,
  Target,
  MessageCircle,
  Bell,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resume-analyzer", label: "Resume Analyzer", icon: FileText },
  { href: "/portfolio-builder", label: "Portfolio", icon: Briefcase },
  { href: "/skill-analysis", label: "Skills", icon: TrendingUp },
  { href: "/career-roadmap", label: "Career Path", icon: Target },
  { href: "/internship-search", label: "Search Jobs", icon: Search },
  { href: "/mentor-chat", label: "Mentor", icon: MessageCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IP</span>
          </div>
          <span className="font-bold text-xl">InternPortal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("flex items-center space-x-2", isActive && "bg-secondary")}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* User Menu & Mobile Navigation */}
        <div className="flex items-center space-x-2">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">IP</span>
                  </div>
                  <span className="font-bold text-xl">InternPortal</span>
                </div>
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn("w-full justify-start space-x-3", isActive && "bg-secondary")}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile-strength">Profile Strength</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Sign Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
