"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  trailerUrl?: string | null;
  clientName: string;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // Autoplay logic
  useEffect(() => {
    if (dialogOpen && selectedItem?.trailerUrl && videoRef.current) {
      const video = videoRef.current;
      // Ensure muted autoplay attempt (most browsers allow muted autoplay)
      video.muted = true;

      const tryPlay = () => {
        video
          .play()
          .then(() => {
            // playback started
            setShowControls(true);
          })
          .catch((err) => {
            // Autoplay blocked or other playback error
            console.warn("Autoplay blocked or play failed:", err);
          });
      };

      // Try programmatic play; also rely on canplaythrough/load events below
      tryPlay();

      const controlsTimer = setTimeout(() => setShowControls(true), 2000);

      // Clean up when dialog closes
      return () => {
        clearTimeout(controlsTimer);
        try {
          video.pause();
        } catch (e) {
          // ignore
        }
      };
    }
  }, [dialogOpen, selectedItem]);

  // Fetch portfolio
  useEffect(() => {
    async function fetchPortfolio() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        const normalized = (data ?? []).map((item: any) => ({
          ...item,
          trailerUrl: item.trailerUrl ?? item.trailler ?? null,
        }));
        setPortfolio(normalized);
      } catch (err: any) {
        console.error("Error fetching portfolio:", err.message);
        setPortfolio([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  const handleViewProject = (item: PortfolioItem) => {
    console.debug("Opening project, trailerUrl:", item.trailerUrl);
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6">
          Our <span className="text-[#F97316]">Work</span>
        </h1>
        <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
          Explore our cinematic productions — crafted with creativity,
          precision, and storytelling mastery.
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Spinner className="w-10 h-10 text-[#F97316] mb-4" />
              <p className="text-[#9CA3AF]">Loading projects…</p>
            </div>
          ) : portfolio.length === 0 ? (
            <div className="col-span-full text-center text-[#9CA3AF] py-12">
              No projects to show.
            </div>
          ) : (
            portfolio.map((item) => (
              <Card
                key={item.id}
                className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-all cursor-pointer overflow-hidden group"
                onClick={() => handleViewProject(item)}
              >
                <motion.div
                  className="relative h-64 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Dialog */}
      <AnimatePresence>
        {dialogOpen && selectedItem && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="bg-[#1A1A1A] border-[#27272A] text-[#F3F4F6] max-w-[1200px] w-[90vw] sm:max-w-[1100px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="md:col-span-2 relative">
                  {selectedItem.trailerUrl ? (
                    // If the URL looks like a YouTube/watch URL, embed it instead
                    selectedItem.trailerUrl.includes("youtube.com") ||
                    selectedItem.trailerUrl.includes("youtu.be") ? (
                      <div className="w-full h-[28rem] rounded-lg overflow-hidden bg-black">
                        <iframe
                          className="w-full h-full"
                          src={
                            selectedItem.trailerUrl.includes("embed")
                              ? selectedItem.trailerUrl
                              : selectedItem.trailerUrl.includes("youtu.be")
                              ? `https://www.youtube.com/embed/${selectedItem.trailerUrl
                                  .split("/")
                                  .pop()}?autoplay=1&mute=1&controls=1&rel=0`
                              : `https://www.youtube.com/embed/${new URL(
                                  selectedItem.trailerUrl
                                ).searchParams.get(
                                  "v"
                                )}?autoplay=1&mute=1&controls=1&rel=0`
                          }
                          title={selectedItem.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <motion.video
                        ref={videoRef}
                        key={selectedItem.id}
                        muted={isMuted}
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        src={selectedItem.trailerUrl}
                        poster={selectedItem.imageUrl || undefined}
                        className="w-full h-[28rem] rounded-lg bg-black object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        // Handlers to improve autoplay reliability and debugging
                        onCanPlay={() => {
                          // attempt to play once media is ready
                          if (videoRef.current) {
                            videoRef.current.play().catch((err) => {
                              console.warn("Play prevented on canplay:", err);
                            });
                          }
                        }}
                        onLoadedData={() => {
                          // ensure we attempt play once data is loaded
                          if (videoRef.current) {
                            videoRef.current.play().catch(() => {});
                          }
                        }}
                        onError={(e) => {
                          // Log detailed media error
                          console.error("Video error event:", e);
                          if (videoRef.current?.error) {
                            console.error(
                              "MediaError:",
                              videoRef.current.error
                            );
                          }
                        }}
                        onPlay={() => {
                          setShowControls(true);
                        }}
                        controls={showControls && !isMuted}
                      />
                    )
                  ) : (
                    <div className="h-[28rem] bg-[#0E0E0E] rounded-lg flex items-center justify-center text-[#9CA3AF]">
                      No trailer available
                    </div>
                  )}

                  {/* Unmute Button */}
                  {isMuted && (
                    <motion.button
                      onClick={async () => {
                        setIsMuted(false);
                        if (videoRef.current) {
                          try {
                            videoRef.current.muted = false;
                            await videoRef.current.play();
                          } catch (err) {
                            console.warn("Play after unmute prevented:", err);
                          }
                        }
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 text-white px-4 py-2 rounded-md backdrop-blur-sm"
                    >
                      Unmute
                    </motion.button>
                  )}
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-semibold rounded-full">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-xl font-semibold text-[#F3F4F6] mt-4">
                    {selectedItem.title}
                  </h3>
                  <p className="text-[#9CA3AF] mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <p className="text-[#C5A36C] mt-4">
                    <span className="font-semibold">Director:</span>{" "}
                    {selectedItem.clientName}
                  </p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
