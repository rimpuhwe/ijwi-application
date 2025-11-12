"use client";

import type React from "react";

import { useState } from "react";
import MainContent from "@/components/MainContent";
import SectionReveal from "@/components/SectionReveal";
import CinematicCard from "@/components/CinematicCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xldondlo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <MainContent>
      <div className="bg-[#0E0E0E] min-h-screen">
        {/* Hero Section */}
        <SectionReveal>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
                Get In <span className="text-[#F97316]">Touch</span>
              </h1>
              <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
                Ready to bring your creative vision to life? Contact us today
                and let's start a conversation about your next project.
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* Contact Info Cards */}
        <SectionReveal>
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <CinematicCard>
                  <Card className="bg-[#1A1A1A] border-[#27272A]">
                    <CardContent className="p-6 text-center">
                      <Mail className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                      <h3 className="text-[#F3F4F6] font-semibold mb-2">
                        Email
                      </h3>
                      <p className="text-[#9CA3AF]">Info@ijwihub.com</p>
                    </CardContent>
                  </Card>
                </CinematicCard>
                <CinematicCard>
                  <Card className="bg-[#1A1A1A] border-[#27272A]">
                    <CardContent className="p-6 text-center">
                      <Phone className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                      <h3 className="text-[#F3F4F6] font-semibold mb-2">
                        Phone
                      </h3>
                      <p className="text-[#9CA3AF]">+250 787 441 489</p>
                    </CardContent>
                  </Card>
                </CinematicCard>
                <CinematicCard>
                  <Card className="bg-[#1A1A1A] border-[#27272A]">
                    <CardContent className="p-6 text-center">
                      <MapPin className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                      <h3 className="text-[#F3F4F6] font-semibold mb-2">
                        Location
                      </h3>
                      <p className="text-[#9CA3AF]">Kigali, Rwanda</p>
                    </CardContent>
                  </Card>
                </CinematicCard>
              </div>

              {/* Contact Form and Map */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <CinematicCard>
                  <Card className="bg-[#1A1A1A] border-[#27272A]">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">
                        Send Us a Message
                      </h2>
                      <form
                        action="https://formspree.io/f/xldondlo"
                        method="POST"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <Input
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            name="your name"
                            className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6] placeholder:text-[#9CA3AF]"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                            name="email"
                            className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6] placeholder:text-[#9CA3AF]"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            required
                            name="subject"
                            className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6] placeholder:text-[#9CA3AF]"
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            required
                            rows={6}
                            name="message"
                            className="bg-[#0E0E0E] border-[#27272A] text-[#F3F4F6] placeholder:text-[#9CA3AF]"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
                        >
                          {status === "loading" ? "Sending..." : "Send Message"}
                        </Button>
                        {status === "success" && (
                          <p className="text-[#10B981] text-sm text-center">
                            Message sent successfully!
                          </p>
                        )}
                        {status === "error" && (
                          <p className="text-[#EF4444] text-sm text-center">
                            Failed to send message. Please try again.
                          </p>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </CinematicCard>

                {/* Map and Social */}
                <div className="space-y-6">
                  <CinematicCard>
                    <Card className="bg-[#1A1A1A] border-[#27272A]">
                      <CardContent className="p-0">
                        <div className="h-64 bg-[#0E0E0E] rounded-lg overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.82403858!2d30.0618851!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xe9b7e68a6a8b5a8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </CinematicCard>

                  <CinematicCard>
                    <Card className="bg-[#1A1A1A] border-[#27272A]">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-[#F3F4F6] mb-4">
                          Follow Us
                        </h3>
                        <p className="text-[#9CA3AF] mb-6">
                          Stay connected with us on social media
                        </p>
                        <div className="flex gap-4">
                          <a
                            href="https://www.instagram.com/ijwihub?utm_source=qr&igsh=NWIwMTduN3QyMXhu"
                            target="_blank"
                            className="w-12 h-12 bg-[#0E0E0E] border border-[#27272A] rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] hover:border-[#F97316] transition-colors"
                          >
                            <Instagram size={20} />
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            className="w-12 h-12 bg-[#0E0E0E] border border-[#27272A] rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] hover:border-[#F97316] transition-colors"
                          >
                            <Youtube size={20} />
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            className="w-12 h-12 bg-[#0E0E0E] border border-[#27272A] rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] hover:border-[#F97316] transition-colors"
                          >
                            <Linkedin size={20} />
                          </a>
                          <a
                            href="https://x.com/IjwiHub?t=Ur_lctseTpRwY7XIYnsezw&s=09"
                            target="_blank"
                            className="w-12 h-12 bg-[#0E0E0E] border border-[#27272A] rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] hover:border-[#F97316] transition-colors"
                          >
                            <Twitter size={20} />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </CinematicCard>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>
    </MainContent>
  );
}
