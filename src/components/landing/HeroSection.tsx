"use client"
import TitleSection from "@/components/landing/title-section";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import HeroVideo from "./HeroVideo";
import Particles from "../ui/Particles";
import { Button } from "../ui/button";
import { FaChrome } from "react-icons/fa";

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
    <section className="relative overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center min-h-[500px]">
      {/* Brand background gradient with enhanced dark/light mode support */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/5 via-[#111111]/10 to-[#111111]/20 dark:from-[#111111]/20 dark:via-[#111111]/30 dark:to-[#111111]/40 transition-colors duration-300" />
      {/* Particles background container */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        <Particles
          className="pointer-events-none" 
          particleColors={[
            // Light mode colors
            '#3498db', '#9b59b6', '#3498db', '#74b9ff',
            // Dark mode colors 
            '#e056fd', '#f368e0', '#ff9ff3', '#d2dae2'
          ]}
          particleCount={300}
          particleSpread={10}
          speed={0.07}
          particleBaseSize={280}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          cameraDistance={25}
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
        <Button onClick={() => window.open("/signin", "_self")}
         className="">
          Get Started
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-5xl mt-8 mb-12">
        <HeroVideo videoSrc="/video/hero.mp4" />
      </motion.div>

    
    </section>
    <section className="overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:bg-gradient-to-b dark:from-brand-bg dark:via-[#1C1C1C] dark:to-[#1C1C1C] dark:text-[#CDCDCD] px-4 sm:px-6 py-10 sm:py-16 mt-[50px] sm:mt-[80px] rounded-lg">
      <ScrollComponent>
        <TitleSection
          pill="✨ Carter AI"
          title={`Chatbot to Assist You`}
          subheading="Find Links and get Insight about your Links and ideas you have."
        />  
      </ScrollComponent>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto mt-8 mb-4 sm:mb-8 gap-0 items-stretch border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/30">
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
          className="w-full lg:w-1/2 space-y-2 sm:space-y-4 text-left p-4 sm:p-6 lg:p-8 border-t lg:border-l lg:border-t-0 border-gray-200 dark:border-gray-800 pt-6 lg:pt-4 mt-4 lg:mt-0"
        >
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <span className="text-primary-purple dark:text-primary-purple-400 text-lg">•</span> Ask Question about your data
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-purple dark:text-primary-purple-400 text-lg">•</span> Find Your Links 
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-purple dark:text-primary-purple-400 text-lg">•</span> Check out your folders
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-purple dark:text-primary-purple-400 text-lg">•</span> Share Your links through secret keys
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-purple dark:text-primary-purple-400 text-lg">•</span> AI Agent
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
    <section className="overflow-hidden  bg-gradient-to-b from-slate-50 to-white dark:bg-gradient-to-b dark:to-brand-bg dark:via-[#1C1C1C] dark:from-[#1C1C1C] dark:text-[#CDCDCD] px-4 sm:px-6 py-10  sm:py-16  ">
      <div className="border flex flex-col items-center justify-center gap-4 border-gray-200 rounded-3xl mx-10 p-10">
        <ScrollComponent>
        <TitleSection
          pill="✨ Chrome Extension"
          title={`Save Links with One Click`}
          subheading="save your ideas with carter"
        />  
      </ScrollComponent>
      <Button onClick={()=>window.open("https://chromewebstore.google.com/detail/link-saver-extension/cojbmogjbkpopmmkcbpeihnidojophfi", "_blank")}
      className="">
        <FaChrome className="mr-2 h-5 w-5" />
        Install Chrome Extension
      </Button>
      </div>
      
    </section>
    </>
  )
}