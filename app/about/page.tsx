"use client";

import MainContent from "@/components/MainContent";
import SectionReveal from "@/components/SectionReveal";
import CinematicCard from "@/components/CinematicCard";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Mic, Users, Rocket, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <MainContent>
      <div className="bg-[#0E0E0E] min-h-screen">
        {/* Hero Section */}
        <SectionReveal>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
                About <span className="text-[#F97316]">IJWI Hub</span>
              </h1>
              <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
                We are a creative innovation and sound technology hub dedicated
                to empowering creators and communities through cutting-edge
                audiovisual production and storytelling.
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* Mission Section */}
        <SectionReveal>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">
                    Our Mission
                  </h2>
                  <p className="text-[#9CA3AF] leading-relaxed text-lg">
                    Empowering creators and communities through sound and
                    technology. We believe in the transformative power of
                    storytelling and are committed to providing the tools,
                    expertise, and support needed to bring creative visions to
                    life.
                  </p>
                </div>
                <CinematicCard>
                  <Card className="bg-[#0E0E0E] border-[#27272A]">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To empower local talent and nurture African sound
                            professionals
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To support and collaborate with independent film and
                            media productions
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To train and inspire the next generation shaping the
                            future of African sound
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CinematicCard>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Vision Section */}
        <SectionReveal>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <CinematicCard>
                  <Card className="bg-[#1A1A1A] border-[#27272A] lg:order-1">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To elevate African cinema and media through
                            world-class sound design and post-production
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To blend modern technology with Africa’s rich
                            storytelling traditions
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                          <p className="text-[#9CA3AF]">
                            To make sound the soulful core of every African
                            story
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CinematicCard>
                <div className="lg:order-2">
                  <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">
                    Our Vision
                  </h2>
                  <p className="text-[#9CA3AF] leading-relaxed text-lg">
                    To lead Africa's creative sound innovation and storytelling
                    revolution. We envision a future where every creator has
                    access to world-class production facilities and expertise to
                    share their unique stories with the world.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Values Section */}
        <SectionReveal>
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-4">
                Our Values
              </h2>
              <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Creativity",
                    description: "Innovative thinking and artistic expression",
                  },
                  {
                    icon: Mic,
                    title: "Authenticity",
                    description: "Genuine stories that resonate",
                  },
                  {
                    icon: Users,
                    title: "Collaboration",
                    description: "Working together for success",
                  },
                  {
                    icon: Rocket,
                    title: "Empowerment",
                    description: "Enabling creators to thrive",
                  },
                  {
                    icon: Star,
                    title: "Excellence",
                    description: "Delivering outstanding quality",
                  },
                ].map((value, index) => (
                  <CinematicCard key={index} className="">
                    <Card className="bg-[#0E0E0E] border-[#27272A] hover:border-[#F97316] transition-colors">
                      <CardContent className="p-6 text-center">
                        <value.icon className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-[#9CA3AF] leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CinematicCard>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>
    </MainContent>
  );
}
