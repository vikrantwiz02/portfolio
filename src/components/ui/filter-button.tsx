"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FilterButtonProps {
  active: boolean
  label: string
  onClick: () => void
  count?: number
}

export function FilterButton({ active, label, onClick, count }: FilterButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "relative",
        active
          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
          : "glass glass-hover border-white/10",
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "ml-1.5 px-1.5 py-0.5 text-xs rounded-full",
            active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
      {active && (
        <motion.span
          layoutId="activeFilterIndicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Button>
  )
}
