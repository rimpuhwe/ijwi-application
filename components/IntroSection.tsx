"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * IntroSection
 * - Full-screen cinematic intro overlay that runs once per user (persisted in localStorage).
 * - Shows layered soft-shape backgrounds with subtle motion and a center countdown 00 → 100.
 * - After countdown finishes it animates out to reveal the page content underneath.
 *
 * Props:
 * - duration: total time (seconds) for the countdown and visible intro (default 2.5)
 *
 * Notes:
 * - The overlay is rendered above the app content (high z-index) and doesn't unmount
 *   the page content; it simply hides itself when finished.
 * - Tweak colors/timing by adjusting `BRAND` and `duration`.
 */
export default function IntroSection({
  duration = 2.5,
}: {
  duration?: number;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const STORAGE_KEY = "ijwi_intro_shown_v1";

  // Do not render the cinematic intro on any admin route or its children.
  // Keep the hooks order stable by evaluating `skipIntro` after hooks are
  // declared — returning early here will not change the hooks call order.
  const skipIntro = pathname && pathname.startsWith("/admin");
  if (skipIntro) return null;

  const BRAND = {
    orange: "#FF7A00",
    gray: "#E5E7EB",
  };

  // Show only if not seen before
  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setVisible(true);
      }
    } catch (e) {
      // If localStorage fails (SSR/privacy) show intro once
      setVisible(true);
    }
  }, []);

  // Countdown using requestAnimationFrame for smooth, frame-synced updates.
  useEffect(() => {
    if (!visible) return;

    const total = Math.max(0.8, duration) * 1000; // ms

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(1, elapsed / total);
      const value = Math.floor(progress * 100);
      setCount(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // hold last frame briefly then hide with exit animation
        setTimeout(() => {
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {}
          setVisible(false);
        }, 260); // small buffer for cinematic timing
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [visible, duration]);

  // Motion variants
  const overlayVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.7 } },
  };

  const blobVariantA: any = {
    animate: {
      x: [0, -12, 0],
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const blobVariantB: any = {
    animate: {
      x: [0, 10, 0],
      y: [0, 8, 0],
      scale: [1, 0.995, 1],
      transition: {
        duration: 7.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] h-screen w-full flex items-center justify-center overflow-hidden bg-black"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={overlayVariants}
        >
          {/* Layered soft shapes for cinematic depth */}
          <motion.div
            className="absolute -left-24 -top-24 w-[420px] h-[420px] rounded-[40%] blur-3xl opacity-80"
            style={{
              background: `linear-gradient(135deg, ${BRAND.orange} 0%, ${BRAND.gray} 100%)`,
            }}
            variants={blobVariantA}
            animate="animate"
          />

          <motion.div
            className="absolute -right-28 -bottom-28 w-[520px] h-[520px] rounded-[48%] blur-2xl opacity-60"
            style={{
              background: `linear-gradient(45deg, ${BRAND.gray} 0%, ${BRAND.orange} 100%)`,
            }}
            variants={blobVariantB}
            animate="animate"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          />

          {/* Center content: numeric countdown and subtle brand label */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <motion.div
              className="text-[72px] sm:text-[96px] md:text-[120px] font-extrabold tracking-tight leading-none text-white"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6 },
              }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
            >
              {String(count).padStart(2, "0")}
            </motion.div>

            <motion.div
              className="mt-4 text-sm text-gray-300"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.12 },
              }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.45 } }}
            >
              IJWI HUB
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
