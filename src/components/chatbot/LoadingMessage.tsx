"use client"

import { useState, useEffect } from "react"
import { Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThinkingLoaderProps {
  isLoading: boolean
  className?: string
}

export function ThinkingLoader({ isLoading, className }: ThinkingLoaderProps) {
  const [dotCount, setDotCount] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  // Colors for the brain icon to cycle through
  const colors = ["text-blue-500", "text-purple-500", "text-pink-500", "text-indigo-500", "text-cyan-500"]

  // Text options to alternate between
  const textOptions = ["Thinking", "Finding"]

  useEffect(() => {
    if (!isLoading) return

    // Animate the ellipsis dots
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4)
    }, 500)

    // Animate the brain icon color
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 1000)

    // Alternate between text options
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % textOptions.length)
    }, 2000)

    return () => {
      clearInterval(dotInterval)
      clearInterval(colorInterval)
      clearInterval(textInterval)
    }
  }, [isLoading, colors.length, textOptions.length])

  if (!isLoading) return null

  const dots = ".".repeat(dotCount)

  return (
    <div className={cn("flex items-center gap-2 w-fit animate-fade-in", className)}>
      <Brain className={cn("h-5 w-5 transition-colors duration-700", colors[colorIndex])} />
      <span className="text-sm font-medium">
        {textOptions[textIndex]}
        {dots}
        <span className="invisible">...</span>
      </span>
    </div>
  )
}
