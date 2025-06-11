"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center" | "right"
}

export function SectionHeading({ title, subtitle, className, align = "left" }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 space-y-4",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold font-heading tracking-tight"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
