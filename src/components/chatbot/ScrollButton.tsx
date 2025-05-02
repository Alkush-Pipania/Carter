"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

type ScrollButtonProps = {
  onClick: () => void
  show: boolean
}

export default function ScrollButton({ onClick, show }: ScrollButtonProps) {
  if (!show) return null
  
  return (
    <Button
      onClick={onClick}
      className="fixed sm:bottom-36 lg:right-2/4 bottom-32 right-8 sm:right-24 rounded-full p-3 bg-primary-purple/primary-purple-500 hover:bg-primary-purple/primary-purple-600 shadow-lg shadow-primary-purple/primary-purple-500/20 z-10"
      aria-label="Scroll to bottom"
    >
      <ArrowDown className="w-5 h-5" />
    </Button>
  )
} 