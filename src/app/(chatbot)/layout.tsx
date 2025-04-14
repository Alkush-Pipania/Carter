"use client"
import type React from "react"
import Header from "@/components/chatbot/Headers"
import { useEffect } from "react"
import axios from "axios"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen bg-[#131314] text-white">
    <div className="fixed inset-0 pointer-events-none">
        {/* Primary Beam */}
        <div className="absolute top-0 left-0 w-[250px] sm:w-[400px] h-[40vh] sm:h-[70vh] bg-gradient-to-b from-primary-purple/primary-purple-500/50 sm:from-primary-purple/primary-purple-500/70 via-primary-purple/primary-purple-400/30 sm:via-primary-purple/primary-purple-400/40 to-transparent transform -rotate-6 blur-[44px] sm:blur-[84px] animate-pulse" />
        
        {/* Secondary Beam */}
        <div className="absolute -top-10 sm:-top-20 left-[5%] w-[200px] sm:w-[300px] h-[35vh] sm:h-[60vh] bg-gradient-to-b from-primary-blue/primary-blue-500/40 sm:from-primary-blue/primary-blue-500/60 via-primary-blue/primary-blue-400/20 sm:via-primary-blue/primary-blue-400/30 to-transparent transform rotate-6 blur-[56px] sm:blur-[96px] animate-pulse" />
        
        {/* Accent Glow */}
        <div className="absolute -top-5 sm:-top-10 left-[10%] w-[300px] sm:w-[500px] h-[25vh] sm:h-[40vh] bg-primary-purple/primary-purple-500/30 sm:bg-primary-purple/primary-purple-500/40 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
      </div>
    {children}</div>
} a 