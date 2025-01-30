"use client"
import TitleSection from "@/components/landing-page/title-section";
import ShinyButton from "@/components/ui/shiny-button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import heroimg from '../../../../public/Section 1.png';
import { useInView } from 'react-intersection-observer';

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
    <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <TitleSection
          pill="✨ Introducing Carter"
          title={`Organize, Share, and Manage Your Links with Ease`}
        />
      </motion.div>

      <div className="md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40" />
      <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex gap-4 sm:gap-6"
      >
        <div className="w-full sm:flex-row md:gap-16 flex-col-reverse flex justify-center mt-10">
          <div className="flex mx-3 max-w-[620px] gap-y-5 mt-10 flex-col items-start justify-start">
            <h3 className="text-3xl font-bold">Save links to visit later</h3>
            <p className="max-w-[512px] text-gray-400">
              Store your links securely in a well-organized format and access
              them anytime with ease. Seamlessly share links with others without
              clutter, and manage them like a pro by categorizing, tagging, and
              sorting for quick retrieval. Accidentally delete something? No
              problem—restore links from trash with a single click.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="/dashboard">
                <ShinyButton className="bg-washed-purple/washed-purple-500 text-nowrap font-bold hover:bg-washed-purple/washed-purple-700">
                  let&apos;s Carter
                </ShinyButton>
              </Link>
              <Link href="/find">
                <ShinyButton className="bg-washed-purple/washed-purple-500 text-nowrap font-bold hover:bg-washed-purple/washed-purple-700">
                  Secret code?
                </ShinyButton>
              </Link>
            </div>
          </div>
          <div className="mx-10 flex items-center relative w-[250px]">
            <Image src={heroimg} alt="heroimg" className="w-full" />
          </div>
        </div>
    </motion.div >
    </section>
  )
}