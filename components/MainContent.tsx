"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * MainContent
 * Initializes Lenis smooth scrolling on the client and provides a simple wrapper
 * for the page's main content. This makes scrolling buttery and consistent
 * across the site.
 */
export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    // Use `any` to avoid TypeScript type constraints for Lenis options across versions
    const lenis: any = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      orientation: "vertical",
    } as any);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // If Lenis exposes a destroy/stop method in your version, call it here.
    };
  }, []);

  return (
    <div id="lenis-wrap" className="min-h-screen">
      {children}
    </div>
  );
}
