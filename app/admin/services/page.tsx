"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ServiceDialog } from "@/components/service-dialog"
import type { Service } from "@/lib/services-data"
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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const response = await fetch("/api/services")
    const data = await response.json()
    setServices(data)
  }

  const handleSave = async (service: Omit<Service, "id"> | Service) => {
    if ("id" in service) {
      // Update existing service
      await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      })
    } else {
      // Create new service
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      })
    }
    fetchServices()
    setSelectedService(null)
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setDialogOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (serviceToDelete) {
      await fetch(`/api/services/${serviceToDelete}`, {
        method: "DELETE",
      })
      fetchServices()
      setServiceToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleAddNew = () => {
    setSelectedService(null)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F3F4F6]">Services Management</h1>
          <p className="text-[#9CA3AF] mt-2">Manage your services and offerings</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#F97316] hover:bg-[#EA580C] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <Card className="bg-[#1A1A1A] border-[#27272A]">
        <CardHeader>
          <CardTitle className="text-[#F3F4F6]">All Services</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#9CA3AF]">No services yet. Add your first service to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-[#27272A] hover:bg-[#0E0E0E]">
                  <TableHead className="text-[#9CA3AF]">Icon</TableHead>
                  <TableHead className="text-[#9CA3AF]">Title</TableHead>
                  <TableHead className="text-[#9CA3AF]">Description</TableHead>
                  <TableHead className="text-[#9CA3AF]">Price</TableHead>
                  <TableHead className="text-[#9CA3AF] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className="border-[#27272A] hover:bg-[#0E0E0E]">
                    <TableCell className="text-[#F3F4F6]">{service.icon}</TableCell>
                    <TableCell className="font-medium text-[#F3F4F6]">{service.title}</TableCell>
                    <TableCell className="text-[#9CA3AF] max-w-md truncate">{service.description}</TableCell>
                    <TableCell className="text-[#F3F4F6]">{service.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(service)}
                          className="text-[#C5A36C] hover:bg-[#0E0E0E] hover:text-[#C5A36C]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(service.id)}
                          className="text-[#EF4444] hover:bg-[#0E0E0E] hover:text-[#EF4444]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ServiceDialog open={dialogOpen} onOpenChange={setDialogOpen} service={selectedService} onSave={handleSave} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#27272A]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F3F4F6]">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              This action cannot be undone. This will permanently delete the service.
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
