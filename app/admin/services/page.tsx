"use client";
import { supabase } from "@/lib/supabaseClient";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Video, Lightbulb, Music, Camera, Headphones } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ServiceDialog } from "@/components/service-dialog";
import type { Service } from "@/lib/services-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ServicesPage() {
  const iconMap: Record<string, any> = {
    mic: Mic,
    video: Video,
    lightbulb: Lightbulb,
    music: Music,
    camera: Camera,
    headphones: Headphones,
  };

  const [services, setServices] = useState<Service[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.error("Error fetching services:", error.message);
        setServices([]);
      } else if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  const saveToLocalStorage = (data: Service[]) => {
    // Removed: localStorage logic
    // Use Supabase for all CRUD
    setServices(data);
  };

  const handleSave = (service: Omit<Service, "id"> | Service) => {
    // Auto-generate icon based on title
    const getIconFromTitle = (title: string) => {
      const lower = title.toLowerCase();
      if (lower.includes("audio")) return "music";
      if (lower.includes("sound")) return "headphones";
      if (lower.includes("video")) return "video";
      if (lower.includes("mic") || lower.includes("record")) return "mic";
      if (lower.includes("camera") || lower.includes("photo")) return "camera";
      if (lower.includes("creative") || lower.includes("consult"))
        return "lightbulb";
      return "lightbulb";
    };
    async function saveService() {
      if ("id" in service) {
        // Update
        const icon = getIconFromTitle(service.title);
        const { error } = await supabase
          .from("services")
          .update({ ...service, icon })
          .eq("id", service.id);
        if (error) console.error("Error updating service:", error.message);
      } else {
        // Create
        const icon = getIconFromTitle(service.title);
        const { error } = await supabase
          .from("services")
          .insert([{ ...service, icon }]);
        if (error) console.error("Error creating service:", error.message);
      }
      // Refetch after save
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });
      setServices(data || []);
      setSelectedService(null);
    }
    saveService();
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    async function deleteService() {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) console.error("Error deleting service:", error.message);
      // Refetch after delete
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });
      setServices(data || []);
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
    deleteService();
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      handleDelete(serviceToDelete);
    } else {
      setDeleteDialogOpen(false);
    }
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6]">
            Services Management
          </h1>
          <p className="text-[#9CA3AF] mt-2">
            Manage your services and offerings
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            onClick={handleAddNew}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length === 0 ? (
          <div className="text-center py-12 col-span-3">
            <p className="text-[#9CA3AF]">
              No services yet. Add your first service to get started.
            </p>
          </div>
        ) : (
          services.map((service) => {
            const IconComponent = iconMap[service.icon] || Lightbulb;
            return (
              <Card
                key={service.id}
                className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-colors relative"
              >
                <CardHeader>
                  <IconComponent className="w-12 h-12 text-[#F97316] mb-4" />
                  <CardTitle className="text-[#F3F4F6]">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex gap-2 mt-4">
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
                      onClick={() => handleDelete(service.id)}
                      className="text-[#EF4444] hover:bg-[#0E0E0E] hover:text-[#EF4444]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selectedService}
        onSave={handleSave}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#27272A]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F3F4F6]">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              This action cannot be undone. This will permanently delete the
              service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#27272A] text-[#9CA3AF] hover:bg-[#0E0E0E]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
