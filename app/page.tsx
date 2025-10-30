"use client"

import Link from "next/link"
import React, { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Users, Lightbulb, Award } from "lucide-react"

export default function HomePage() {
  // heroRef is used to derive scroll progress for the hero section. We map
  // that progress to subtle scale/opacity changes so the hero gracefully
  // transitions as the user scrolls.
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef })

  // Map scroll progress (0 -> 1) to desired visual values.
  // As the hero scrolls out, scale down slightly and reduce opacity.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <div className="bg-[#0E0E0E]">
      {/* Page load cinematic loader (runs on every reload) */}
      <Loader />
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F3F4F6] mb-6 leading-tight text-balance">
            Empowering Creators Through
            <span className="text-[#F97316]"> Sound & Technology</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9CA3AF] mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            IJWI Hub is a creative innovation and sound technology hub focused on storytelling, cinematography, and
            audiovisual production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#F97316] hover:bg-[#EA580C] text-white">
              <Link href="/services">Explore Our Services</Link>
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

      {/* Our Impact Section - revealed on scroll */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "200+", label: "Happy Clients" },
                { number: "50+", label: "Creative Partners" },
                { number: "10+", label: "Years Experience" },
              ].map((stat, index) => (
                <Card key={index} className="bg-[#0E0E0E] border-[#27272A]">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-[#F97316] mb-2">{stat.number}</div>
                    <div className="text-[#9CA3AF]">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose Us Section - revealed on scroll */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-4">Why Choose IJWI Hub</h2>
            <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              We combine creativity, authenticity, and collaboration to deliver exceptional results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Creativity",
                  description: "Innovative approaches to storytelling and sound design that captivate audiences",
                },
                {
                  icon: Award,
                  title: "Authenticity",
                  description: "Genuine narratives that resonate with your audience and reflect your brand",
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "Working closely with you to bring your creative vision to life",
                },
              ].map((value, index) => (
                <Card key={index} className="bg-[#1A1A1A] border-[#27272A] hover:border-[#F97316] transition-colors">
                  <CardContent className="p-6">
                    <value.icon className="w-12 h-12 text-[#F97316] mb-4" />
                    <h3 className="text-xl font-semibold text-[#F3F4F6] mb-3">{value.title}</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Packages Section - revealed on scroll */}
      <SectionReveal>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-4">Our Packages</h2>
            <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Comprehensive solutions tailored to your creative needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Audio Production",
                  description: "Professional recording, mixing, and mastering services for music and podcasts",
                  features: ["Studio Recording", "Sound Mixing", "Audio Mastering"],
                },
                {
                  title: "Video Production",
                  description: "Cinematic storytelling through high-quality video production and editing",
                  features: ["Cinematography", "Video Editing", "Color Grading"],
                },
                {
                  title: "Creative Consulting",
                  description: "Strategic guidance for your creative projects and brand storytelling",
                  features: ["Brand Strategy", "Content Planning", "Creative Direction"],
                },
              ].map((pkg, index) => (
                <Card key={index} className="bg-[#0E0E0E] border-[#27272A] hover:border-[#C5A36C] transition-colors">
                  <CardContent className="p-6">
                    <Lightbulb className="w-10 h-10 text-[#C5A36C] mb-4" />
                    <h3 className="text-xl font-semibold text-[#F3F4F6] mb-3">{pkg.title}</h3>
                    <p className="text-[#9CA3AF] mb-4 leading-relaxed">{pkg.description}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="text-[#9CA3AF] text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white">
                      <Link href="/services">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
              Let's collaborate on your next project and create something extraordinary together
            </p>
            <Button asChild size="lg" className="bg-[#F97316] hover:bg-[#EA580C] text-white">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </SectionReveal>
    </div>
  )
}


/**
 * SectionReveal
 * A small reusable wrapper that reveals its children when they enter the
 * viewport using IntersectionObserver (via framer-motion's useInView).
 * It applies a subtle slide-up + fade animation. Use it to wrap page
 * sections for smooth scroll-based entrance effects.
 */
function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  // useInView returns true when the element is visible within the viewport.
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }

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
  )
}
