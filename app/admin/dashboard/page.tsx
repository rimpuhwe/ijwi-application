import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FolderOpen, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#F3F4F6]">Dashboard</h1>
        <p className="text-[#9CA3AF] mt-2">Welcome to IJWI Hub Admin Dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#1A1A1A] border-[#27272A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Total Services</CardTitle>
            <Briefcase className="h-4 w-4 text-[#F97316]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F3F4F6]">0</div>
            <p className="text-xs text-[#9CA3AF] mt-1">Manage your services</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#27272A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Portfolio Works</CardTitle>
            <FolderOpen className="h-4 w-4 text-[#C5A36C]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F3F4F6]">0</div>
            <p className="text-xs text-[#9CA3AF] mt-1">Showcase your projects</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#27272A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#9CA3AF]">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F3F4F6]">0</div>
            <p className="text-xs text-[#9CA3AF] mt-1">Track your engagement</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1A1A1A] border-[#27272A]">
        <CardHeader>
          <CardTitle className="text-[#F3F4F6]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-[#9CA3AF]">Use the sidebar to navigate to Services or Portfolio management sections.</p>
        </CardContent>
      </Card>
    </div>
  )
}
