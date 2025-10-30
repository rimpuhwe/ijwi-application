"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Loader
 * Two-stage upward wipe cinematic loader:
 * 1) Orange background with big counter (build-up) -> orange panel wipes upward
 * 2) Dark-gray panel remains for a short hold (1s) -> dark-gray panel wipes upward
 * 3) Loader unmounts revealing the page
 *
 * Runs on every page load (no caching) and uses rAF for smooth counting.
 */
export default function Loader({ duration = 2800, initialDelay = 900 }: { duration?: number; initialDelay?: number }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"initial" | "counting" | "wipeOrange" | "holdGray" | "wipeGray" | "done">(
    "initial"
  )
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // Brand colors
  const ORANGE = "#FF7A00"
  const DARK_GRAY = "#111827" // a dark gray for the intermediate hold

  // Timing
  const WIPE_DURATION = 700 // ms for each upward wipe
  const HOLD_DURATION = 1000 // ms dark-gray hold
  const REMOVE_DELAY = 80 // ms after final wipe before unmount

  // Start sequence: initial -> counting
  useEffect(() => {
    if (phase !== "initial") return
    const t = setTimeout(() => setPhase("counting"), initialDelay)
    return () => clearTimeout(t)
  }, [phase, initialDelay])

  // Counting (0 -> 100)
  useEffect(() => {
    if (phase !== "counting") return

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(1, elapsed / duration)
      const value = Math.floor(progress * 100)
      setCount(value)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // start orange wipe when counter completes
        setPhase("wipeOrange")
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      startRef.current = null
    }
  }, [phase, duration])

  // Phase transitions: wipeOrange -> holdGray -> wipeGray -> done
  useEffect(() => {
    if (phase === "wipeOrange") {
      const t = setTimeout(() => setPhase("holdGray"), WIPE_DURATION)
      return () => clearTimeout(t)
    }
    if (phase === "holdGray") {
      const t = setTimeout(() => setPhase("wipeGray"), HOLD_DURATION)
      return () => clearTimeout(t)
    }
    if (phase === "wipeGray") {
      const t = setTimeout(() => setPhase("done"), WIPE_DURATION + REMOVE_DELAY)
      return () => clearTimeout(t)
    }
  }, [phase])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-auto">
        {/* Dark-gray panel sits below the orange panel. It will wipe up second. */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: DARK_GRAY }}
          initial={{ y: 0 }}
          animate={{ y: phase === "wipeGray" ? "-100%" : 0 }}
          transition={{ duration: WIPE_DURATION / 1000, ease: "easeInOut" }}
        />

        {/* Orange panel on top initially; it wipes up first to reveal the dark-gray panel. */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: ORANGE }}
          initial={{ y: 0 }}
          animate={{ y: phase === "wipeOrange" || phase === "wipeGray" ? "-100%" : 0 }}
          transition={{ duration: WIPE_DURATION / 1000, ease: "easeInOut" }}
        >
          {/* Optional diagonal accent for cinematic depth */}
          <motion.div
            className="absolute -left-1/3 top-0 h-full w-[40%] bg-white/6 transform-gpu"
            style={{ rotate: -10 }}
            initial={{ x: "-120%" }}
            animate={{ x: phase === "wipeOrange" || phase === "wipeGray" ? "120%" : "-120%" }}
            transition={{ duration: WIPE_DURATION / 1000, ease: "easeInOut" }}
          />

          {/* Counter (big, bold) */}
          <motion.span
            className="relative z-10 block text-[10rem] font-extrabold tracking-widest text-white text-center"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{
              opacity: phase === "counting" || phase === "wipeOrange" ? 1 : 0,
              scale: phase === "wipeOrange" ? 0.96 : 1,
              y: phase === "wipeOrange" ? -10 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {String(count).padStart(2, "0")}
            <span className="ml-2 text-4xl align-top">%</span>
          </motion.span>

          {/* Brand label */}
          <motion.div
            className="relative z-10 mt-4 text-sm text-white/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "counting" || phase === "wipeOrange" ? 1 : 0, y: phase === "wipeOrange" ? -6 : 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            IJWI HUB
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
