"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface HeroVideoProps {
  videoSrc: string
  posterSrc?: string
}

export default function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted by default
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.4, // Trigger when 40% of the video is in view
    triggerOnce: false
  })

  // Auto-play when in view
  useEffect(() => {
    if (videoRef.current) {
      if (inView && !isPlaying) {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(err => {
            console.log('Autoplay prevented:', err)
          })
      } else if (!inView && isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [inView, isPlaying])

  // Ensure video is muted initially (for autoplay)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.volume = 0
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div ref={ref} className="relative w-full h-full z-30 overflow-hidden">
      {/* Brand background gradient with dark/light mode support */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/80 via-[#181818]/70 to-[#252525]/60 dark:from-[#111111]/95 dark:via-[#181818]/90 dark:to-[#252525]/80 z-0 transition-colors duration-300" />
      {/* Video with color grading filters */}
      <div className="relative w-full h-full z-10">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
          muted={true} /* Always muted for autoplay compatibility */
          loop
          onClick={togglePlay}
        />
        {/* Color grading layer with blend mode */}
        <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-indigo-900/40 via-purple-800/30 to-pink-600/40 dark:from-indigo-500/50 dark:via-purple-400/40 dark:to-pink-500/50" />
      </div>

      {/* Gradient overlay - only shown when video is not playing */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/60 to-transparent pointer-events-none transition-opacity duration-500 z-20",
        isPlaying ? "opacity-0" : "opacity-100"
      )} />

      {/* Center play/pause button that fades when playing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className={cn(
            "flex items-center justify-center w-20 h-20 rounded-full bg-primary-purple/primary-purple-600 hover:bg-primary-purple/primary-purple-500 transition-all duration-300 text-white z-10 backdrop-blur-sm shadow-lg",
            isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100",
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
      </div>

      {/* Bottom controls for volume - hidden but kept for future use */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/80 dark:bg-gray-700/80 hover:bg-gray-700/80 dark:hover:bg-gray-600/80 transition-colors text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}