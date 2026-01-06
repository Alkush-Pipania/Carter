"use client"

import { motion, AnimatePresence } from "framer-motion"
import { NavMenuItem } from "./types"
import { mobileMenuVariants, mobileItemVariants } from "./animations"
import Link from "next/link"

interface MobileMenuProps {
    isOpen: boolean
    expandedMenu: string | null
    setExpandedMenu: (menu: string | null) => void
    featuresContent: NavMenuItem[]
    whyContent: NavMenuItem[]
}

export function MobileMenu({
    isOpen,
    expandedMenu,
    setExpandedMenu,
    featuresContent,
    whyContent
}: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="md:hidden px-4 py-6 overflow-y-auto max-h-[80vh]"
                >
                    {/* Features Section */}
                    <motion.div variants={mobileItemVariants}>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Features</p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {featuresContent.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex flex-col items-center p-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
                                >
                                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-2`}>
                                        <item.icon size={20} className="text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-white text-center">{item.title}</span>
                                    <span className="text-xs text-gray-400 text-center mt-1">{item.description}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Why Section */}
                    <motion.div variants={mobileItemVariants}>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Why Carter</p>
                        <div className="space-y-2 mb-6">
                            {whyContent.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                                >
                                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <item.icon size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">{item.title}</span>
                                        <span className="text-xs text-gray-400 ml-2">{item.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Regular Links */}
                    <motion.div variants={mobileItemVariants} className="border-t border-neutral-800 pt-4 space-y-1">
                        <Link
                            href="/blog"
                            className="block py-3 text-sm hover:text-gray-300 transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/docs"
                            className="block py-3 text-sm hover:text-gray-300 transition-colors"
                        >
                            Docs
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
