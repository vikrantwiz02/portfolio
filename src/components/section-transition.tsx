"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

type TransitionType = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "rotate"

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  id?: string
  index?: number
  transitionType?: TransitionType
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
}

export function SectionTransition({
  children,
  className,
  id,
  index = 0,
  transitionType = "fade",
  duration = 0.7,
  delay = 0,
  threshold = 0.2,
  once = true,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Apply spring physics for smoother transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Get opacity based on scroll progress
  const opacity = useTransform(smoothProgress, [0, threshold, threshold + 0.3, 1], [0, 1, 1, 1])

  // Get transform values based on transition type
  const y = useTransform(smoothProgress, [0, threshold, 1], [50, 0, 0])
  const x = useTransform(smoothProgress, [0, threshold, 1], [50, 0, 0])
  const scale = useTransform(smoothProgress, [0, threshold, 1], [0.9, 1, 1])
  const rotate = useTransform(smoothProgress, [0, threshold, 1], [-5, 0, 0])

  // Create different animation variants based on transition type
  const getAnimationProps = () => {
    const baseDelay = delay + index * 0.1

    switch (transitionType) {
      case "slide-up":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "slide-down":
        return {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "slide-left":
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "slide-right":
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -5 },
          animate: { opacity: 1, rotate: 0 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration, delay: baseDelay, ease: "easeOut" },
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn("will-change-transform", className)}
      whileInView="animate"
      viewport={{ once, margin: "-100px" }}
      {...getAnimationProps()}
      style={{
        opacity,
        y: ["slide-up", "slide-down"].includes(transitionType) ? y : undefined,
        x: ["slide-left", "slide-right"].includes(transitionType) ? x : undefined,
        scale: transitionType === "zoom" ? scale : undefined,
        rotate: transitionType === "rotate" ? rotate : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
