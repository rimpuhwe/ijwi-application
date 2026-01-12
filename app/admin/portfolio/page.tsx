"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import type { PortfolioWork } from "@/lib/portfolio-data";
import { getJwtCookie } from "@/lib/jwt";
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
export default function PortfolioPage() {
  // Removed legacy defaultPortfolio and Supabase logic

  const [works, setWorks] = useState<PortfolioWork[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const token = getJwtCookie();
        const res = await fetch(`${apiUrl}/admin/portfolios`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch portfolios");
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : []);
      } catch (error: any) {
        console.error("Error fetching portfolios:", error?.message || error);
        setWorks([]);
      }
    }
    fetchPortfolio();
  }, []);

  // Removed: localStorage and Supabase logic

  const handleSave = (work: Omit<PortfolioWork, "id"> | PortfolioWork) => {
    async function saveWork() {
      try {
        let res;
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const token = getJwtCookie();
        if ("id" in work) {
          // Update
          res = await fetch(`${apiUrl}/admin/portfolios/${work.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(work),
          });
        } else {
          // Create
          res = await fetch(`${apiUrl}/admin/portfolios`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(work),
          });
        }
        if (!res.ok) throw new Error("Failed to save portfolio work");
      } catch (error: any) {
        console.error("Error saving portfolio work:", error?.message || error);
      }
      // Refetch after save
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const token = getJwtCookie();
        const res = await fetch(`${apiUrl}/admin/portfolios`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : []);
      } catch {
        setWorks([]);
      }
      setSelectedWork(null);
    }
    saveWork();
  };

  const handleEdit = (work: PortfolioWork) => {
    setSelectedWork(work);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    async function deleteWork() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const token = getJwtCookie();
        const res = await fetch(`${apiUrl}/admin/portfolios/${id}`, {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to delete portfolio work");
      } catch (error: any) {
        console.error(
          "Error deleting portfolio work:",
          error?.message || error
        );
      }
      // Refetch after delete
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const token = getJwtCookie();
        const res = await fetch(`${apiUrl}/admin/portfolios`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : []);
      } catch {
        setWorks([]);
      }
      setDeleteDialogOpen(false);
      setWorkToDelete(null);
    }
    deleteWork();
  };

  const handleDeleteClick = (id: string) => {
    setWorkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (workToDelete) {
      handleDelete(workToDelete);
    } else {
      setDeleteDialogOpen(false);
    }
  };

  const handleAddNew = () => {
    setSelectedWork(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6]">
            Portfolio Management
          </h1>
          <p className="text-[#9CA3AF] mt-2">
            Showcase your creative works and projects
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            onClick={handleAddNew}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Work
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.length === 0 ? (
          <div className="text-center py-12 col-span-3">
            <p className="text-[#9CA3AF]">
              No portfolio works yet. Add your first work to get started.
            </p>
          </div>
        ) : (
          works.map((work) => (
            <Card
              key={work.id}
              className="bg-[#1A1A1A] border-[#27272A] overflow-hidden group relative"
            >
              <div className="relative h-48 bg-[#0E0E0E]">
                <Image
                  src={work.imageUrl || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(
                      work.title
                    )}`;
                  }}
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-[#F3F4F6] text-lg">
                      {work.title}
                    </CardTitle>
                    <p className="text-sm text-[#C5A36C] mt-1">
                      {work.category}
                    </p>
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
                      onClick={() => handleDelete(work.id)}
                      className="text-[#EF4444] hover:bg-[#0E0E0E] hover:text-[#EF4444] h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#9CA3AF] text-sm line-clamp-2">
                  {work.description}
                </p>
                <p className="text-[#C5A36C] text-xs mt-2">
                  Director: {work.clientName}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <PortfolioDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        work={selectedWork}
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
              portfolio work.
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
