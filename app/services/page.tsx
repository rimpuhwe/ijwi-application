"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mic, Video, Lightbulb, Music, Camera, Headphones } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  mic: Mic,
  video: Video,
  lightbulb: Lightbulb,
  music: Music,
  camera: Camera,
  headphones: Headphones,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Carousel API and current slide index
  const [carouselApi, setCarouselApi] = useState<any | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
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
      } catch (err) {
        console.error("Unexpected error fetching services:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // detect small screens (matches Tailwind 'sm' breakpoint)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(!!e.matches);
    // set initial
    setIsMobile(!!mq.matches);
    // add listener
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler as any);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", handler as any);
      else mq.removeListener(handler as any);
    };
  }, []);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  // Helper: group services into chunks. On mobile show one card per slide; otherwise 3 per slide
  const slides: Service[][] = [];
  const groupSize = isMobile ? 1 : 3;
  for (let i = 0; i < services.length; i += groupSize) {
    slides.push(services.slice(i, i + groupSize));
  }

  // Sync selected index with embla api
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      try {
        const idx = carouselApi.selectedScrollSnap();
        setCurrentSlide(idx);
      } catch (e) {}
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi?.off("select", onSelect);
      carouselApi?.off("reInit", onSelect);
    };
  }, [carouselApi]);

  // Auto-advance carousel on mobile every 60s
  useEffect(() => {
    if (!carouselApi || !isMobile) return;
    const interval = setInterval(() => {
      try {
        carouselApi.scrollNext();
      } catch (e) {}
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [carouselApi, isMobile]);

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
            Our <span className="text-[#F97316]">Services</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
            Comprehensive creative solutions tailored to bring your vision to
            life through professional audio and video production services.
          </p>
        </div>
      </section>

      {/* Reserve CTA - encourage users to book after reviewing services (moved after carousel) */}

      {/* Services Carousel */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Spinner className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                <div className="text-[#9CA3AF]">Loading services…</div>
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center text-[#9CA3AF] py-12">
              No services available at the moment.
            </div>
          ) : (
            <div className="relative">
              <Carousel setApi={setCarouselApi} className="py-4 px-6">
                <CarouselContent>
                  {slides.map((group, idx) => (
                    <CarouselItem key={idx} className="!basis-full">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {group.map((service) => {
                          const IconComponent =
                            iconMap[service.icon] || Lightbulb;
                          return (
                            <div key={service.id} className="px-2">
                              <Card className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-colors">
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
                                </CardContent>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Arrows: position inside carousel padding so they remain visible when cards are wide */}
                <CarouselPrevious className="disabled:hidden left-4 z-20" />
                <CarouselNext className="right-4 z-20" />
              </Carousel>

              {/* Bullets */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => carouselApi?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === i ? "bg-gray-400" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reserve CTA - encourage users to book after reviewing services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-[#111111] via-[#161616] to-[#111111] border border-[#27272A] p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] mb-3">
              Ready to bring your project to life?
            </h2>
            <p className="text-[#9CA3AF] mb-6">
              Your next project deserves more than production, it deserves
              passion. The next masterpiece starts with one click.
            </p>

            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#F97316] hover:bg-[#EA580C] text-white w-full sm:w-auto"
              >
                <Link href="/booking" className="block text-center w-full">
                  Start Your Project Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#F3F4F6]">
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="text-[#9CA3AF]">
              {selectedService?.description}
            </DialogDescription>
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
            <Button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white">
              Get Started
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
