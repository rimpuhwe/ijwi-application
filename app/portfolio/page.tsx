"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  clientName: string
}

// Default portfolio items
const defaultPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Brand Documentary",
    description: "A cinematic documentary showcasing the journey of a local business",
    category: "Video Production",
    imageUrl: "/cinematic-documentary-film-production.jpg",
    clientName: "Local Business Co.",
  },
  {
    id: "2",
    title: "Music Album Production",
    description: "Full album recording, mixing, and mastering for emerging artist",
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
    description: "Custom sound design and audio branding for digital platform",
    category: "Sound Design",
    imageUrl: "/sound-design-audio-mixing.jpg",
    clientName: "Digital Platform",
  },
]

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(defaultPortfolio)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("portfolio")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.length > 0) {
        setPortfolio(parsed)
      } else {
        setPortfolio(defaultPortfolio)
      }
    } else {
      setPortfolio(defaultPortfolio)
    }
  }, [])

  const handleViewProject = (item: PortfolioItem) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
            Our <span className="text-[#F97316]">Work</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
            Explore our portfolio of creative projects showcasing our expertise in audio and video production,
            storytelling, and sound design.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <Card
                key={item.id}
                className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-colors cursor-pointer overflow-hidden group"
                onClick={() => handleViewProject(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">{item.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-2">{item.description}</p>
                  <p className="text-[#C5A36C] text-sm">Client: {item.clientName}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#F3F4F6]">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.imageUrl || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full mb-4">
                  {selectedItem.category}
                </span>
                <p className="text-[#9CA3AF] leading-relaxed mb-4">{selectedItem.description}</p>
                <div className="border-t border-[#27272A] pt-4">
                  <p className="text-[#C5A36C]">
                    <span className="font-semibold">Client:</span> {selectedItem.clientName}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
