"use client"

import { useRef, useState, useEffect } from "react"
import { useSpring } from "@react-spring/web"

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  reset?: boolean
  easing?: string
}

export function useTilt(options: TiltOptions = {}) {
  const {
    maxTilt = 20,
    perspective = 1000,
    scale = 1.05,
    speed = 1000,
    glareEnable = true,
    glareMaxOpacity = 0.3,
    glareColor = "#ffffff",
    reset = true,
    easing = "cubic-bezier(.03,.98,.52,.99)",
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const [{ rotateX, rotateY, glareX, glareY, glareOpacity, transformScale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    transformScale: 1,
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }))

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = element.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const left = rect.left
      const top = rect.top

      const x = e.clientX - left
      const y = e.clientY - top

      const centerX = width / 2
      const centerY = height / 2

      const percentX = (x - centerX) / centerX
      const percentY = (y - centerY) / centerY

      api.start({
        rotateX: -percentY * maxTilt,
        rotateY: percentX * maxTilt,
        glareX: (x / width) * 100,
        glareY: (y / height) * 100,
        glareOpacity: glareEnable ? glareMaxOpacity : 0,
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      api.start({
        transformScale: scale,
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (reset) {
        api.start({
          rotateX: 0,
          rotateY: 0,
          glareOpacity: 0,
          transformScale: 1,
        })
      }
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isHovered, api, maxTilt, scale, glareEnable, glareMaxOpacity, reset])

  const transform = {
    transform: rotateX.to((rx) => `perspective(${perspective}px) rotateX(${rx}deg)`),
  }

  const glareStyle = glareEnable
    ? {
        background: glareX.to(
          (x) => `radial-gradient(circle at ${x}% ${glareY.get()}%, ${glareColor} 0%, transparent 60%)`,
        ),
        opacity: glareOpacity,
      }
    : {}

  return {
    ref,
    style: {
      ...transform,
      scale: transformScale,
    },
    glareStyle,
    isHovered,
  }
}
