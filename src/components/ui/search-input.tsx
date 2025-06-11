"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder = "Search...", className }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Clear search and focus input
  const handleClear = () => {
    onChange("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className={`relative group ${className}`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
          isFocused ? "text-primary" : "text-muted-foreground"
        }`}
      />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        className="pl-10 pr-10 glass border-white/10 focus-visible:ring-purple-500 focus-visible:border-purple-500/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        {!value && <span className="hidden md:inline">Ctrl+K</span>}
      </div>
    </div>
  )
}
