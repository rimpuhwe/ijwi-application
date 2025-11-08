import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ClientOnly from "@/components/ClientOnly";
import ChunkErrorHandler from "@/components/ChunkErrorHandler";
import MainContent from "@/components/MainContent";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "IJWI HUB | Where African Cinema Finds Its Voice",
  description:
    "IJWI HUB is a Rwandan sound design and post-production studio dedicated to giving African cinema its true voice. We craft world-class audio for film, TV, and media, blending modern sound technology with Africa’s storytelling traditions.",
  keywords:
    "IJWI HUB, African cinema, sound design, post-production, film audio, Foley, ADR, dialogue editing, music scoring, sound mixing, Rwanda film studio, African storytelling, filmmaking, audio production",
  authors: [{ name: "IJWI HUB", url: "https://www.ijwihub.com" }],
  icons: {
    icon: "https://www.ijwihub.com/favicon.ico",
    shortcut: "https://www.ijwihub.com/favicon.ico",
    apple: "https://www.ijwihub.com/apple-touch-icon.png",
  },
  openGraph: {
    title: "IJWI HUB | Where African Cinema Finds Its Voice",
    description:
      "A sound design and post-production studio in Rwanda giving African cinema its true voice through world-class sound and storytelling.",
    url: "https://www.ijwihub.com",
    siteName: "IJWI HUB",
    images: [
      {
        url: "https://www.ijwihub.com/ijwi-logo.png",
        width: 1200,
        height: 630,
        alt: "IJWI HUB - Where African Cinema Finds Its Voice",
      },
    ],
    locale: "en_RW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IJWI HUB | Where African Cinema Finds Its Voice",
    description:
      "IJWI HUB crafts world-class sound for African cinema — from Foley and dialogue editing to music scoring and final mixing.",
    images: ["https://www.ijwihub.com/img.jpg"],
    creator: "@IjwiHub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* JSON-LD structured data for Google */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IJWI HUB",
              url: "https://www.ijwihub.com",
              logo: "https://www.ijwihub.com/ijwi-logo.png",
              description:
                "A Rwandan sound design and post-production studio dedicated to giving African cinema its true voice.",
              sameAs: [
                "https://www.instagram.com/ijwihub",
                "https://x.com/IjwiHub",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+250-788-544-839",
                contactType: "customer service",
                areaServed: "RW",
                availableLanguage: "English",
              },
            }),
          }}
        />
        {/* Global client-side helpers */}
        <ClientOnly>
          <ChunkErrorHandler />
        </ClientOnly>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <MainContent>{children}</MainContent>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
