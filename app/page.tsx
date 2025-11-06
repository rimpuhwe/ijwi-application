"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Lightbulb, Award } from "lucide-react";
import CinematicCard from "@/components/CinematicCard";

export default function HomePage() {
  // heroRef is used to derive scroll progress for the hero section. We map
  // that progress to subtle scale/opacity changes so the hero gracefully
  // transitions as the user scrolls.
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  // Map scroll progress (0 -> 1) to desired visual values.
  // As the hero scrolls out, scale down slightly and reduce opacity.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <div className="bg-[#0E0E0E]">
      {/* Hero Section (full viewport) */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F3F4F6] mb-6 leading-tight text-balance">
            The soul of African cinema in sound.
            <span className="text-[#F97316]">
              {" "}
              Telling stories through sound.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9CA3AF] mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            IJWI Hub is a creative innovation and sound technology hub focused
            on storytelling, cinematography, and audiovisual production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              <Link href="/booking">Reserve Your Spot</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#C5A36C] text-[#C5A36C] hover:bg-[#C5A36C] hover:text-[#0E0E0E] bg-transparent"
            >
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Our Services Section - revealed on scroll */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-8">
              Our Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CinematicCard>
                <Card className="bg-[#0E0E0E] border-[#27272A] h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">
                      Sound Editing & Design
                    </h3>
                    <p className="text-[#9CA3AF] mb-3">
                      We bring your story to life through immersive soundscapes.
                      From dialogue cleanup to Foley and original sound effects,
                      our team crafts every detail to match your film’s emotion
                      and rhythm.
                    </p>
                    <div className="mt-3">
                      <div className="text-sm text-[#C5A36C] font-medium mb-2">
                        Includes:
                      </div>
                      <ul className="text-sm text-[#9CA3AF] list-disc list-inside marker:text-[#F97316] space-y-1">
                        <li>Dialogue editing</li>
                        <li>Foley</li>
                        <li>Sound effects</li>
                        <li>Ambience creation</li>
                        <li>Noise reduction</li>
                        <li>Sound restoration</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CinematicCard>

              <CinematicCard>
                <Card className="bg-[#0E0E0E] border-[#27272A] h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">
                      ADR & Voice Recording
                    </h3>
                    <p className="text-[#9CA3AF] mb-3">
                      Perfecting every word and tone. Our ADR and voice
                      recording sessions ensure crystal-clear dialogue and
                      powerful voice performances that align perfectly with your
                      visuals.
                    </p>
                    <div className="mt-3">
                      <div className="text-sm text-[#C5A36C] font-medium mb-2">
                        Includes:
                      </div>
                      <ul className="text-sm text-[#9CA3AF] list-disc list-inside marker:text-[#F97316] space-y-1">
                        <li>ADR sessions</li>
                        <li>Voiceovers</li>
                        <li>Character voice performance</li>
                        <li>Sync-to-picture recording</li>
                        <li>Multilingual recording</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CinematicCard>

              <CinematicCard>
                <Card className="bg-[#0E0E0E] border-[#27272A] h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">
                      Mixing & Mastering
                    </h3>
                    <p className="text-[#9CA3AF] mb-3">
                      We blend every sound element into a rich, balanced
                      soundtrack ready for cinema, TV, or streaming platforms.
                      Your project receives the final polish it deserves.
                    </p>
                    <div className="mt-3">
                      <div className="text-sm text-[#C5A36C] font-medium mb-2">
                        Includes:i
                      </div>
                      <ul className="text-sm text-[#9CA3AF] list-disc list-inside marker:text-[#F97316] space-y-1">
                        <li>Stereo, 5.1, or Dolby Atmos mixing</li>
                        <li>Sound balancing</li>
                        <li>Loudness mastering</li>
                        <li>Final deliverables for DCP or broadcast</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CinematicCard>
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                size="lg"
                className="bg-[#F97316] hover:bg-[#EA580C] text-white"
              >
                <Link href="/services">View more services</Link>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA Section - revealed on scroll */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] mb-6 text-balance">
              Ready to Bring Your Creative Vision to Life?
            </h2>
            <p className="text-lg text-[#9CA3AF] mb-8 leading-relaxed">
              Let's collaborate on your next project and create something
              extraordinary together
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}

/**
 * SectionReveal
 * A small reusable wrapper that reveals its children when they enter the
 * viewport using IntersectionObserver (via framer-motion's useInView).
 * It applies a subtle slide-up + fade animation. Use it to wrap page
 * sections for smooth scroll-based entrance effects.
 */
function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  // useInView returns true when the element is visible within the viewport.
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
