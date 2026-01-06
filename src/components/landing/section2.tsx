"use client"

import { motion } from "framer-motion"

export function Section2() {
    return (
        <section
            className="relative w-full py-12 md:py-24 bg-white dark:bg-black/20"
            style={{
                backgroundImage: "url('/bg-1.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Video Container */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative max-w-5xl mx-auto px-4 md:px-8"
            >
                {/* Video wrapper with border, rounded corners, and shadow */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl shadow-black/40 border border-white/10 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto rounded-xl md:rounded-2xl"
                    >
                        <source src="/video/hero.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </motion.div>
        </section>
    )
}
