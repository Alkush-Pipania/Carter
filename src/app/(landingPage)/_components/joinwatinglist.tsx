import { Waitlist } from "@/components/waitlist"
import * as Motion from "framer-motion"

export default function WaitlistPage() {
  return (
    <div id="waitlist-section" className="flex flex-col border-gray-600 items-center mt-8 justify-center bg-[#0e0525] px-4 sm:py-12">
      <Motion.motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-md"
      >
        <Motion.motion.h1 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Join the <span className="text-purple-400">Carter</span> Waitlist
        </Motion.motion.h1>
        <Motion.motion.p 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center text-gray-300"
        >
          Be among the first to organize, share, and manage your links with ease.
        </Motion.motion.p>
        <Motion.motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Waitlist />
        </Motion.motion.div>
      </Motion.motion.div>
    </div>
  )
}
