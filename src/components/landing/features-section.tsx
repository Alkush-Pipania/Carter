"use client"

import { motion } from "framer-motion"
import { Link2, Bot, Sparkles, FolderOpen, Search, Zap } from "lucide-react"

const features = [
    {
        icon: Link2,
        title: "Save anything.",
        description: "Save links, articles, and resources from anywhere on the web with one click. Never lose a bookmark again."
    },
    {
        icon: Bot,
        title: "AI-powered chat.",
        description: "Ask your chatbot about your saved links. It knows everything you've saved and can find it instantly."
    },
    {
        icon: Sparkles,
        title: "Smart organization.",
        description: "AI automatically categorizes and tags your links. No manual sorting needed."
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
}

export function FeaturesSection() {
    return (
        <section className="w-full py-6 px-4 bg-white dark:bg-black">
            {/* Features Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
                {features.map((feature) => (
                    <motion.div
                        key={feature.title}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="mb-4 text-gray-400 dark:text-gray-500">
                            <feature.icon size={28} strokeWidth={1.5} />
                        </div>
                        <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                            <span className="font-semibold text-gray-900 dark:text-white">{feature.title}</span>{" "}
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Divider Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto mt-20 md:mt-32 text-center"
            >
                {/* Tag */}
                <div className="flex justify-center mb-6">
                    <span className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                        ─────── AI Chatbot ───────
                    </span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Find anything instantly.
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 leading-tight mt-1">
                    Just ask your AI assistant.
                </h2>
            </motion.div>
        </section>
    )
}
