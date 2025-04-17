"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroVideoProps {
  videoSrc: string
  posterSrc?: string
}

export default function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Set a lower volume when component mounts
  useEffect(() => {
    if (videoRef.current) {
      // Set volume to 30% of maximum
      videoRef.current.volume = 0.3;
    }
  }, []);

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
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="w-full h-auto rounded-xl cursor-pointer"
        playsInline
        muted={isMuted}
        loop
        onClick={togglePlay}
      />

      {/* Gradient overlay - only shown when video is not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 to-transparent pointer-events-none transition-opacity duration-300" />
      )}

      {/* Center play/pause button that fades when playing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className={cn(
            "flex items-center justify-center w-20 h-20 rounded-full bg-purple-600/90 hover:bg-purple-500 transition-all duration-300 text-white z-10 backdrop-blur-sm",
            isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100",
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
      </div>

      {/* Bottom controls for volume and progress */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-800/80 hover:bg-purple-700/80 transition-colors text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
      </div>
    </div>
  )
} 