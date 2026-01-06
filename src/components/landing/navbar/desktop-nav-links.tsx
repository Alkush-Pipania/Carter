"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { chevronSpring } from "./animations"
import Link from "next/link"

interface DesktopNavLinksProps {
    expandedMenu: string | null
    setExpandedMenu: (menu: string | null) => void
}

export function DesktopNavLinks({ expandedMenu, setExpandedMenu }: DesktopNavLinksProps) {
    return (
        <>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
                <button
                    onMouseEnter={() => setExpandedMenu("features")}
                    className="flex items-center gap-1 text-sm hover:text-gray-300 transition-colors"
                >
                    Features
                    <motion.span
                        animate={{ rotate: expandedMenu === "features" ? 180 : 0 }}
                        transition={chevronSpring}
                    >
                        <ChevronDown size={14} />
                    </motion.span>
                </button>

                <button
                    onMouseEnter={() => setExpandedMenu("why")}
                    className="flex items-center gap-1 text-sm hover:text-gray-300 transition-colors"
                >
                    Why
                    <motion.span
                        animate={{ rotate: expandedMenu === "why" ? 180 : 0 }}
                        transition={chevronSpring}
                    >
                        <ChevronDown size={14} />
                    </motion.span>
                </button>

                <Link
                    href="/blog"
                    className="text-sm hover:text-gray-300 transition-colors"
                    onMouseEnter={() => setExpandedMenu(null)}
                >
                    Blog
                </Link>
                <Link
                    href="/docs"
                    className="text-sm hover:text-gray-300 transition-colors"
                    onMouseEnter={() => setExpandedMenu(null)}
                >
                    Docs
                </Link>
            </div>

            {/* Right Side - Login & Register */}
            <div className="hidden md:flex items-center gap-4">
                <Link
                    href="/signin"
                    className="text-sm hover:text-gray-300 transition-colors"
                    onMouseEnter={() => setExpandedMenu(null)}
                >
                    Login
                </Link>
                <Link href="/signup">
                    <Button
                        className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 text-sm"
                        onMouseEnter={() => setExpandedMenu(null)}
                    >
                        Register
                    </Button>
                </Link>
            </div>
        </>
    )
}

