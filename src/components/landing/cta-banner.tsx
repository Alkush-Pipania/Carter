"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function CTABanner() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-10
                           px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28
                           rounded-3xl md:rounded-[3.5rem] text-center
                           bg-purple-500 bg-gradient-to-b from-purple-500 to-purple-700"
            >
                {/* Main Heading */}
                <div className="space-y-1 md:space-y-2">
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                                   leading-tight tracking-tight text-white"
                    >
                        No more lost bookmarks.
                    </h2>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                                   leading-tight tracking-tight text-white"
                    >
                        No more endless searching.
                    </h2>
                </div>

                {/* Description */}
                <p
                    className="text-lg sm:text-xl md:text-2xl font-normal 
                               leading-relaxed max-w-3xl text-white/90 px-2 sm:px-0"
                >
                    With Carter, your links are organized automatically — saved, tagged, and ready
                    to find with AI whenever you need them.
                </p>

                {/* CTA Button */}
                <Link href="/dashboard">
                    <Button
                        className="bg-white hover:bg-gray-100 text-purple-600 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Get Started Free
                    </Button>
                </Link>
            </motion.div>
        </section>
    )
}
