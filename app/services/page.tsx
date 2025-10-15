"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mic, Video, Lightbulb, Music, Camera, Headphones } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  price: string
}

const iconMap: Record<string, any> = {
  mic: Mic,
  video: Video,
  lightbulb: Lightbulb,
  music: Music,
  camera: Camera,
  headphones: Headphones,
}

// Default services to display
const defaultServices = [
  {
    id: "1",
    title: "Audio Production",
    description: "Professional recording, mixing, and mastering services for music, podcasts, and voiceovers",
    icon: "mic",
    price: "Starting at $500",
  },
  {
    id: "2",
    title: "Video Production",
    description: "Cinematic storytelling through high-quality video production, editing, and color grading",
    icon: "video",
    price: "Starting at $1,000",
  },
  {
    id: "3",
    title: "Sound Design",
    description: "Custom sound effects, foley, and audio post-production for film and media",
    icon: "headphones",
    price: "Starting at $750",
  },
  {
    id: "4",
    title: "Music Production",
    description: "Original composition, arrangement, and production for various media projects",
    icon: "music",
    price: "Starting at $800",
  },
  {
    id: "5",
    title: "Cinematography",
    description: "Professional camera work and lighting for commercials, documentaries, and films",
    icon: "camera",
    price: "Starting at $1,200",
  },
  {
    id: "6",
    title: "Creative Consulting",
    description: "Strategic guidance for your creative projects, brand storytelling, and content planning",
    icon: "lightbulb",
    price: "Starting at $300",
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("services")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.length > 0) {
        setServices(parsed)
      } else {
        setServices(defaultServices)
      }
    } else {
      setServices(defaultServices)
    }
  }, [])

  const handleLearnMore = (service: Service) => {
    setSelectedService(service)
    setDialogOpen(true)
  }

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
            Our <span className="text-[#F97316]">Services</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
            Comprehensive creative solutions tailored to bring your vision to life through professional audio and video
            production services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Lightbulb
              return (
                <Card
                  key={service.id}
                  className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-colors"
                >
                  <CardHeader>
                    <IconComponent className="w-12 h-12 text-[#F97316] mb-4" />
                    <CardTitle className="text-[#F3F4F6]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#9CA3AF] mb-4 leading-relaxed">{service.description}</p>
                    <p className="text-[#C5A36C] font-semibold mb-4">{service.price}</p>
                    <Button
                      onClick={() => handleLearnMore(service)}
                      className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#F3F4F6]">{selectedService?.title}</DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">{selectedService?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-[#F3F4F6] mb-2">Benefits</h4>
              <ul className="space-y-2">
                <li className="text-[#9CA3AF] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-2"></span>
                  Professional quality results
                </li>
                <li className="text-[#9CA3AF] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-2"></span>
                  Expert guidance throughout the process
                </li>
                <li className="text-[#9CA3AF] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-2"></span>
                  Fast turnaround times
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F3F4F6] mb-2">Pricing</h4>
              <p className="text-[#C5A36C] text-lg font-semibold">{selectedService?.price}</p>
            </div>
            <Button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white">Get Started</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
