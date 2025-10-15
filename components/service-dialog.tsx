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
import type { Service } from "@/lib/services-data"

interface ServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: Service | null
  onSave: (service: Omit<Service, "id"> | Service) => void
}

export function ServiceDialog({ open, onOpenChange, service, onSave }: ServiceDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    price: "",
  })

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        price: service.price,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        icon: "",
        price: "",
      })
    }
  }, [service, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (service) {
      onSave({ ...service, ...formData })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6]">
        <DialogHeader>
          <DialogTitle className="text-[#F3F4F6]">{service ? "Edit Service" : "Add New Service"}</DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            {service ? "Update the service details below." : "Fill in the details for the new service."}
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
              <Label htmlFor="icon" className="text-[#F3F4F6]">
                Icon (emoji or text)
              </Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#F3F4F6]">
                Price
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
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
              {service ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
