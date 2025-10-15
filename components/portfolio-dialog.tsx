"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PortfolioWork } from "@/lib/portfolio-data"

interface PortfolioDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  work?: PortfolioWork | null
  onSave: (work: Omit<PortfolioWork, "id"> | PortfolioWork) => void
}

export function PortfolioDialog({ open, onOpenChange, work, onSave }: PortfolioDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    clientName: "",
  })

  useEffect(() => {
    if (work) {
      setFormData({
        title: work.title,
        description: work.description,
        imageUrl: work.imageUrl,
        category: work.category,
        clientName: work.clientName || "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        clientName: "",
      })
    }
  }, [work, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (work) {
      onSave({ ...work, ...formData })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6]">
        <DialogHeader>
          <DialogTitle className="text-[#F3F4F6]">{work ? "Edit Portfolio Work" : "Add New Work"}</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            {work ? "Update the portfolio work details below." : "Fill in the details for the new portfolio work."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#F3F4F6]">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#F3F4F6]">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-[#F3F4F6]">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
                placeholder="https://example.com/image.jpg"
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#F3F4F6]">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Music Production, Sound Design"
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-[#F3F4F6]">
                Client Name
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
                placeholder="e.g., Local Business Co."
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#27272A] text-[#9CA3AF] hover:bg-[#0E0E0E]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#F97316] hover:bg-[#EA580C] text-white">
              {work ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
