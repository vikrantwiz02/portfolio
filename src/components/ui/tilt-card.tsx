"use client"

import type React from "react"
import { animated } from "@react-spring/web"
import { useTilt } from "@/hooks/use-tilt"
import { cn } from "@/lib/utils"

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glareClassName?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  glareEnable?: boolean
}

export function TiltCard({
  children,
  className,
  glareClassName,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.03,
  glareEnable = true,
  ...props
}: TiltCardProps) {
  const { ref, style, glareStyle, isHovered } = useTilt({
    maxTilt,
    perspective,
    scale,
    glareEnable,
  })

  return (
    <animated.div
      ref={ref}
      style={style}
      className={cn("relative transform-gpu transition-shadow duration-300", className)}
      {...props}
    >
      {children}
      {glareEnable && (
        <animated.div
          style={glareStyle}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
            glareClassName,
          )}
        />
      )}
    </animated.div>
  )
}
