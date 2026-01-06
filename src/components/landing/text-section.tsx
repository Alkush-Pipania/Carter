"use client"

import { motion } from "framer-motion"

export function TextSection() {
    return (
        <section className="w-full py-12 px-4 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
            >
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Don't lose track of important links, see how your
                    collection grows in realtime. Study which categories,
                    tags, and sources are performing well and
                    supercharge your research.
                </p>
            </motion.div>
        </section>
    )
}
