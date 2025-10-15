"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { PortfolioDialog } from "@/components/portfolio-dialog"
import type { PortfolioWork } from "@/lib/portfolio-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

export default function PortfolioPage() {
  const [works, setWorks] = useState<PortfolioWork[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [workToDelete, setWorkToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchWorks()
  }, [])

  const fetchWorks = async () => {
    const response = await fetch("/api/portfolio")
    const data = await response.json()
    setWorks(data)
  }

  const handleSave = async (work: Omit<PortfolioWork, "id"> | PortfolioWork) => {
    if ("id" in work) {
      // Update existing work
      await fetch(`/api/portfolio/${work.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
      })
    } else {
      // Create new work
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
      })
    }
    fetchWorks()
    setSelectedWork(null)
  }

  const handleEdit = (work: PortfolioWork) => {
    setSelectedWork(work)
    setDialogOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setWorkToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (workToDelete) {
      await fetch(`/api/portfolio/${workToDelete}`, {
        method: "DELETE",
      })
      fetchWorks()
      setWorkToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleAddNew = () => {
    setSelectedWork(null)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F3F4F6]">Portfolio Management</h1>
          <p className="text-[#9CA3AF] mt-2">Showcase your creative works and projects</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#F97316] hover:bg-[#EA580C] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Work
        </Button>
      </div>

      {works.length === 0 ? (
        <Card className="bg-[#1A1A1A] border-[#27272A]">
          <CardContent className="py-12">
            <div className="text-center">
              <p className="text-[#9CA3AF]">No portfolio works yet. Add your first work to get started.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <Card key={work.id} className="bg-[#1A1A1A] border-[#27272A] overflow-hidden group">
              <div className="relative h-48 bg-[#0E0E0E]">
                <Image
                  src={work.imageUrl || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(work.title)}`
                  }}
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-[#F3F4F6] text-lg">{work.title}</CardTitle>
                    <p className="text-sm text-[#C5A36C] mt-1">{work.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(work)}
                      className="text-[#C5A36C] hover:bg-[#0E0E0E] hover:text-[#C5A36C] h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(work.id)}
                      className="text-[#EF4444] hover:bg-[#0E0E0E] hover:text-[#EF4444] h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#9CA3AF] text-sm line-clamp-2">{work.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PortfolioDialog open={dialogOpen} onOpenChange={setDialogOpen} work={selectedWork} onSave={handleSave} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#27272A]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F3F4F6]">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              This action cannot be undone. This will permanently delete the portfolio work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#27272A] text-[#9CA3AF] hover:bg-[#0E0E0E]">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
