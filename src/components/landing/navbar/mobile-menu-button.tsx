"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface MobileMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
    return (
        <button
            className="md:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={onClick}
        >
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <X size={24} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Menu size={24} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
