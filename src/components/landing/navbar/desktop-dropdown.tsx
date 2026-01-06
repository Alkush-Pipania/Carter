"use client"

import { motion, AnimatePresence } from "framer-motion"
import { NavMenuItem } from "./types"
import { containerVariants } from "./animations"
import { DropdownContent } from "./dropdown-content"

interface DesktopDropdownProps {
    expandedMenu: string | null
    mobileMenuOpen: boolean
    featuresContent: NavMenuItem[]
    whyContent: NavMenuItem[]
}

export function DesktopDropdown({
    expandedMenu,
    mobileMenuOpen,
    featuresContent,
    whyContent
}: DesktopDropdownProps) {
    const hasContent = expandedMenu === "features" || expandedMenu === "why"

    return (
        <AnimatePresence>
            {hasContent && !mobileMenuOpen && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="hidden md:block px-8 pt-5 overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {expandedMenu === "features" && (
                            <DropdownContent content={featuresContent} contentKey="features" />
                        )}
                        {expandedMenu === "why" && (
                            <DropdownContent content={whyContent} contentKey="why" />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
