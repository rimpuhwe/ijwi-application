"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * CinematicCard
 * A small wrapper that adds cinematic entrance and hover interactions to any
 * card-like element. It uses framer-motion's whileInView and whileHover for
 * engaging, performant animations.
 */
export default function CinematicCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const variants = {
    hidden: { opacity: 0, y: 28, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
