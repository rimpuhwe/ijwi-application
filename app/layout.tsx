import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
// IntroSection removed per user request to avoid duplicate intros on the homepage.
// Keep Page-specific loaders (e.g. `Loader` used in `app/page.tsx`) instead.
import ClientOnly from "@/components/ClientOnly";
import ChunkErrorHandler from "@/components/ChunkErrorHandler";
import MainContent from "@/components/MainContent";
import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "IJWI HUB | Where African Cinema Finds Its Voice",
  description:
    "IJWI HUB is a Rwandan sound design and post-production studio dedicated to giving African cinema its true voice. We craft world-class audio for film, TV, and media, blending modern sound technology with Africa’s storytelling traditions.",
  keywords:
    "IJWI HUB, African cinema, sound design, post-production, film audio, Foley, ADR, dialogue editing, music scoring, sound mixing, Rwanda film studio, African storytelling, filmmaking, audio production",
  authors: [{ name: "IJWI HUB", url: "https://www.ijwihub.com" }],
  icons:{
    icon: "/ijwi-logo.png",
    shortcut: "/ijwi-logo.png",
    apple: "/ijwi-logo.png",
  },
  openGraph: {
    title: "IJWI HUB | Where African Cinema Finds Its Voice",
    description:
      "A sound design and post-production studio in Rwanda giving African cinema its true voice through world-class sound and storytelling.",
    url: "https://www.ijwihub.com",
    siteName: "IJWI HUB",
    images: [
      {
        url: "/ijwi-logo.png", 
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
    images: ["/img.jpg"], 
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
       <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IJWI HUB",
              url: "https://www.ijwihub.com",
              logo: "/ijwi-logo.png",
              description:
                "A Rwandan sound design and post-production studio dedicated to giving African cinema its true voice.",
              sameAs: [
                "https://www.instagram.com/ijwihub?utm_source=qr&igsh=NWIwMTduN3QyMXhu",
                "https://x.com/IjwiHub?t=Ur_lctseTpRwY7XIYnsezw&s=09",
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
      </head>
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* Global client-side helpers (error recovery). IntroSection intentionally removed to avoid
            duplicate cinematic intros on the homepage; homepage uses its own Loader instead. */}
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
