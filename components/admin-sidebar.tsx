"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FolderOpen, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex md:h-screen md:w-64 md:flex-col bg-[#1A1A1A] border-r border-[#27272A]">
        <div className="flex h-16 items-center border-b border-[#27272A] px-6">
          <h1 className="text-xl font-bold text-[#F97316]">IJWI Hub Admin</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F97316] text-white"
                    : "text-[#9CA3AF] hover:bg-[#0E0E0E] hover:text-[#F3F4F6]"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
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
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between bg-[#1A1A1A] border-b border-[#27272A] px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#9CA3AF] hover:bg-[#0E0E0E]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-[#F97316]">IJWI Hub Admin</h1>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-[#9CA3AF]"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      {/* Mobile slide-over nav */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#1A1A1A] border-r border-[#27272A] p-4 overflow-auto">
            <div className="flex items-center h-16 px-2 border-b border-[#27272A] mb-4">
              <h2 className="text-lg font-bold text-[#F97316]">Menu</h2>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#F97316] text-white"
                        : "text-[#9CA3AF] hover:bg-[#0E0E0E] hover:text-[#F3F4F6]"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
