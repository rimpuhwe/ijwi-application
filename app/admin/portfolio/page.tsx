"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import type { PortfolioWork } from "@/lib/portfolio-data";
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
  const defaultPortfolio = [
    {
      id: "1",
      title: "Brand Documentary",
      description:
        "A cinematic documentary showcasing the journey of a local business",
      category: "Video Production",
      imageUrl: "/cinematic-documentary-film-production.jpg",
      clientName: "Local Business Co.",
    },
    {
      id: "2",
      title: "Music Album Production",
      description:
        "Full album recording, mixing, and mastering for emerging artist",
      category: "Audio Production",
      imageUrl: "/music-studio-recording-session.jpg",
      clientName: "Rising Star Artist",
    },
    {
      id: "3",
      title: "Commercial Campaign",
      description: "Multi-platform commercial campaign with stunning visuals",
      category: "Video Production",
      imageUrl: "/commercial-video-production-set.jpg",
      clientName: "Tech Startup",
    },
    {
      id: "4",
      title: "Podcast Series",
      description: "Professional podcast recording and post-production",
      category: "Audio Production",
      imageUrl: "/podcast-recording-studio-setup.jpg",
      clientName: "Media Company",
    },
    {
      id: "5",
      title: "Event Coverage",
      description: "Comprehensive video and audio coverage of corporate event",
      category: "Video Production",
      imageUrl: "/event-videography-coverage.jpg",
      clientName: "Corporate Client",
    },
    {
      id: "6",
      title: "Sound Design Project",
      description:
        "Custom sound design and audio branding for digital platform",
      category: "Sound Design",
      imageUrl: "/sound-design-audio-mixing.jpg",
      clientName: "Digital Platform",
    },
  ];

  const [works, setWorks] = useState<PortfolioWork[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setWorks(parsed);
      } else {
        localStorage.setItem("portfolio", JSON.stringify(defaultPortfolio));
        setWorks(defaultPortfolio);
      }
    } else {
      localStorage.setItem("portfolio", JSON.stringify(defaultPortfolio));
      setWorks(defaultPortfolio);
    }
  }, []);

  const saveToLocalStorage = (data: PortfolioWork[]) => {
    localStorage.setItem("portfolio", JSON.stringify(data));
    setWorks(data);
  };

  const handleSave = (work: Omit<PortfolioWork, "id"> | PortfolioWork) => {
    let updated: PortfolioWork[];
    if ("id" in work) {
      // Update
      updated = works.map((w) => (w.id === work.id ? { ...work } : w));
    } else {
      // Create
      updated = [...works, { ...work, id: Date.now().toString() }];
    }
    saveToLocalStorage(updated);
    setSelectedWork(null);
  };

  const handleEdit = (work: PortfolioWork) => {
    setSelectedWork(work);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = works.filter((w) => w.id !== id);
    saveToLocalStorage(updated);
    setDeleteDialogOpen(false);
    setWorkToDelete(null);
  };

  const handleDeleteClick = (id: string) => {
    setWorkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (workToDelete) {
      const updated = works.filter((w) => w.id !== workToDelete);
      localStorage.setItem("portfolio", JSON.stringify(updated));
      setWorks(updated);
      setWorkToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleAddNew = () => {
    setSelectedWork(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F3F4F6]">
            Portfolio Management
          </h1>
          <p className="text-[#9CA3AF] mt-2">
            Showcase your creative works and projects
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-[#F97316] hover:bg-[#EA580C] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Work
        </Button>
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
                  Client: {work.clientName}
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
