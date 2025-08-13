"use client"
import TitleSection from "@/components/landing/title-section";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import HeroVideo from "./HeroVideo";
import Particles from "../ui/Particles";
import { Button } from "../ui/button";
import { FaChrome } from "react-icons/fa";
import { LiquidButton } from "../liquid-glass-button";

export const ScrollComponent = ({ children , x=0 , y=-50 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: y , x:x , }} // Initial state (hidden)
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.5 }} // Animation duration
      viewport={{ once: true }} // Ensure animation happens only once
    >
      {children}
    </motion.div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {

  return (
    <>
      {/* Hero Section with Particles Background */}
      <section className="relative overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center min-h-[500px]">
        {/* Global Particles Background - covers entire component with highest z-index */}
        <div className="absolute inset-0 top-0" >
          <Particles
            className="pointer-events-none" 
            particleColors={[
              // Dark theme optimized colors
              '#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9',
              '#c084fc', '#a78bfa', '#ddd6fe', '#e9d5ff'
            ]}
            particleCount={400}
            particleSpread={15}
            speed={0.05}
            particleBaseSize={300}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
            cameraDistance={30}
          />
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-y-8 items-center relative z-20"
        >
          <TitleSection
            pill="✨ Introducing Carter"
            title={`Organize, Share, and Manage Your Links with Ease`}
            subheading="Carter is the home to your links and ideas. "
          />
          <LiquidButton onClick={() => window.open("/signin", "_self")}
           className=" text-white">
            Get Started
          </LiquidButton>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-5xl mt-8 mb-12 relative z-20">
          <HeroVideo videoSrc="/video/hero.mp4" />
        </motion.div>
      </section>

      {/* AI Chatbot Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-10 sm:py-16 mt-[50px] sm:mt-[80px]">
        {/* Semi-transparent dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl" />
        
        <div className="relative z-20">
          <ScrollComponent>
            <TitleSection
              pill="✨ Carter AI"
              title={`Chatbot to Assist You`}
              subheading="Find Links and get Insight about your Links and ideas you have."
            />  
          </ScrollComponent>

          <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto mt-8 mb-4 sm:mb-8 gap-0 items-stretch border border-violet-500/20 rounded-xl overflow-hidden shadow-lg shadow-violet-500/10 bg-black/30 backdrop-blur-sm">
            {/* Left side - Video */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full lg:w-1/2 h-auto">
              <div className="w-full h-full">
                <HeroVideo videoSrc="/video/chatbot.mp4" />
              </div>
            </motion.div>
            
            {/* Right side - Feature list */}
            <motion.div 
              variants={fadeInUp} 
              initial="hidden" 
              animate="visible" 
              className="w-full lg:w-1/2 space-y-2 sm:space-y-4 text-left p-4 sm:p-6 lg:p-8 border-t lg:border-l lg:border-t-0 border-violet-500/20 pt-6 lg:pt-4 mt-4 lg:mt-0"
            >
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
                <li className="flex items-center gap-2">
                  <span className="text-violet-400 text-lg">•</span> Ask Question about your data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400 text-lg">•</span> Find Your Links 
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400 text-lg">•</span> Check out your folders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400 text-lg">•</span> Share Your links through secret keys
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400 text-lg">•</span> AI Agent
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-10 sm:py-16">
        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl" />
        
        <div className="relative z-20">
          <div className="border flex flex-col items-center justify-center gap-4 border-violet-500/20 rounded-3xl mx-10 p-10 bg-black/30 backdrop-blur-sm">
            <ScrollComponent>
              <TitleSection
                pill="✨ Chrome Extension"
                title={`Save Links with One Click`}
                subheading="save your ideas with carter"
              />  
            </ScrollComponent>
            <Button onClick={()=>window.open("https://chromewebstore.google.com/detail/link-saver-extension/cojbmogjbkpopmmkcbpeihnidojophfi", "_blank")}
            className="bg-violet-600 hover:bg-violet-700 text-white">
              <FaChrome className="mr-2 h-5 w-5" />
              Install Chrome Extension
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}