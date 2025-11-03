"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
// Dialog removed: portfolio items no longer open a dialog on public pages
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

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
  // Dialog and trailer playback removed on public pages — cards are static

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

  // No-op: dialog removed
  const handleViewProject = (_item: PortfolioItem) => {};

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
                className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-all overflow-hidden group"
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
      {/* Dialog removed — portfolio items no longer open a modal on public pages */}
    </div>
  );
}
