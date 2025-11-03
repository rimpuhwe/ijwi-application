import type React from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "IJWI Hub - Creative Innovation & Sound Technology",
  description:
    "Empowering creators and communities through sound and technology",
  generator: "v0.app",
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
