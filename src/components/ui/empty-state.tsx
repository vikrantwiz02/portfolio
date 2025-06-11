"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center py-12 px-4"
    >
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" className="mt-4 glass glass-hover border-white/10" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
