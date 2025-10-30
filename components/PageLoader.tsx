"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * PageLoader
 * A cinematic full-screen intro used on first paint. Shows "IJWI HUB" as bold
 * white text on black background, fades in, then slides up to reveal the site.
 * Total visual duration ~2.5s (configurable).
 */
export default function PageLoader({ duration = 2.5 }: { duration?: number }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Hide the loader after `duration` seconds plus a small buffer for the exit animation
    const timeout = setTimeout(() => setVisible(false), duration * 1000)
    return () => clearTimeout(timeout)
  }, [duration])

  // Variants give a cinematic feel: a quick soft fade-in, then a slower slide-up exit
  const containerVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, y: -120, transition: { duration: 0.7, delay: 0.05 } },
  }

  const textVariants = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.05 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.45 } },
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black text-white"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={containerVariants}
          custom={duration}
        >
          <motion.h1
            className="font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight"
            variants={textVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            IJWI HUB
          </motion.h1>

          {/* subtle backdrop gradient for cinematic depth */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
