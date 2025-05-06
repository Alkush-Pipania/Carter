"use client"
import type React from "react"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen bg-gradient-to-b from-brand-bg via-[#1C1C1C] to-[#1C1C1C]  text-white">
    {children}</div>
} 