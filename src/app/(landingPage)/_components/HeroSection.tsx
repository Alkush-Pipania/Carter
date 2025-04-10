"use client"
import TitleSection from "@/components/landing-page/title-section"
import * as React from 'react'
import * as Motion from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import heroimg from '/public/hero-section.png';

export const ScrollComponent = ({
  children,
  x = 0,
  y = -50,
}: { children: React.ReactNode; x?: number; y?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  })

  return (
    <Motion.motion.div
      ref={ref}
      initial={{ opacity: 0, y: y, x: x }} // Initial state (hidden)
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.5 }} // Animation duration
      viewport={{ once: true }} // Ensure animation happens only once
    >
      {children}
    </Motion.motion.div>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  const scrollToWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist-section')
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
      <Motion.motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full">
        <TitleSection pill="✨ Introducing Carter" title={`Organize, Share, and Manage Your Links with Ease`} />
      </Motion.motion.div>

      <div className="md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40" />

      {/* Dashboard Image Section */}
      <Motion.motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-5xl mt-8 mb-12">
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient border */}
          <div
            className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-purple-400/80 to-purple-600/30 opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md ${isHovered ? "animate-pulse" : ""}`}
          ></div>

          {/* Image container with shadow */}
          <div className="relative rounded-lg overflow-hidden border border-purple-500/20 bg-[#0e0525]/90 transition-transform duration-500 group-hover:scale-[1.01] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] select-none">
            <Image
              src={heroimg}
              alt="Carter Dashboard"
              width={1200}
              height={675}
              draggable={false}
              className="w-full h-auto transition-all duration-500 group-hover:brightness-110 pointer-events-none"
            />

            {/* Overlay gradient at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0e0525] to-transparent"></div>

            {/* Floating elements for depth */}
            <div className="absolute top-5 right-5 w-20 h-20 rounded-full bg-purple-500/10 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-70"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-70"></div>
          </div>
        </div>
      </Motion.motion.div>
      
    </section>
  )
}
