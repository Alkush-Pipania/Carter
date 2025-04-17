"use client"
import TitleSection from "@/components/landing-page/title-section"
import * as React from 'react'
import * as Motion from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import HeroVideo from "./HeroVideo"
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

      {/* Dashboard Video Section */}
      <Motion.motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-5xl mt-8 mb-12">
        <HeroVideo videoSrc="/video/hero.mov" posterSrc={heroimg.src} />
      </Motion.motion.div>
      
    </section>
  )
}
