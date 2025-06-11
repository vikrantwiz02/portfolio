"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionContainerProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={cn("py-24 px-6 sm:px-8 relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
}
