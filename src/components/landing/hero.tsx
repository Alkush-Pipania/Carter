"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const rotatingWords = [
    "AI-powered",
    "smart",
    "intelligent",
    "organized",
    "searchable",
]

export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="flex flex-col items-center justify-center px-4 pt-32 pb-8 md:pb-11 text-center">
            {/* Tagline with rotating text */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 text-sm md:text-base mb-4 md:mb-6 h-6"
            >
                Your personal{" "}
                <span className="inline-block relative">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={rotatingWords[currentIndex]}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="font-semibold text-purple-600"
                        >
                            {rotatingWords[currentIndex]}
                        </motion.span>
                    </AnimatePresence>
                </span>{" "}
                bookmarks
            </motion.p>

            {/* Main Heading with Epilogue font */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-[family-name:var(--font-epilogue)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.05] max-w-3xl tracking-tight"
            >
                Save, organize,
                <br className="md:hidden" />
                {" "}and find
                <br />
                your links with AI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-500 text-sm md:text-lg mt-4 md:mt-6 max-w-xl px-2"
            >
                Never lose a link again. Save anything from the web and
                <br className="hidden md:block" />
                {" "}let AI help you find it when you need it.
            </motion.p>

            {/* CTA Buttons - Full width on mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3 mt-6 md:mt-8 px-4 sm:px-0"
            >
                <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button
                        className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-6 text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                    >
                        Get Started
                    </Button>
                </Link>
                <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto rounded-full px-8 py-6 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Save Links
                    </Button>
                </Link>
            </motion.div>

            {/* Free notice */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-400 text-xs mt-5 md:mt-6"
            >
                No credit card required
            </motion.p>
        </section>
    )
}
