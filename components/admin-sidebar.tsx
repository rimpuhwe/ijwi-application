"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, FolderOpen, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: FolderOpen,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-[#1A1A1A] border-r border-[#27272A]">
      <div className="flex h-16 items-center border-b border-[#27272A] px-6">
        <h1 className="text-xl font-bold text-[#F97316]">IJWI Hub Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-[#F97316] text-white" : "text-[#9CA3AF] hover:bg-[#0E0E0E] hover:text-[#F3F4F6]",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-[#27272A] p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-[#9CA3AF] hover:bg-[#0E0E0E] hover:text-[#F3F4F6]"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
