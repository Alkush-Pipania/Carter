'use client'

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface CooldownTimerProps {
  durationMs: number
  onComplete: () => void
  isActive: boolean
}

export function CooldownTimer({ durationMs, onComplete, isActive }: CooldownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationMs)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(durationMs)
      setProgress(100)
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval)
          onComplete()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, durationMs, onComplete])

  useEffect(() => {
    setProgress((timeRemaining / durationMs) * 100)
  }, [timeRemaining, durationMs])

  if (!isActive || timeRemaining === 0) return null

  // Format time to display minutes and seconds
  const totalSeconds = Math.ceil(timeRemaining / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  return (
    <div className="mb-4 mt-1">
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          <span>Resend available in:</span>
        </span>
        <span className="font-mono font-medium">{formattedTime}</span>
      </div>
      <Progress 
        value={progress} 
        className="h-1 w-full bg-zinc-700" 
        indicatorClassName="bg-white/70"
      />
    </div>
  )
} 