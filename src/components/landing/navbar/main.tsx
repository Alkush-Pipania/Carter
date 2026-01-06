"use client"

import { Link2, Bot, FolderOpen, Search, Shield, Zap, Sparkles, Chrome } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { NavMenuItem } from "./types"
import { DesktopNavLinks } from "./desktop-nav-links"
import { DesktopDropdown } from "./desktop-dropdown"
import { MobileMenu } from "./mobile-menu"
import { MobileMenuButton } from "./mobile-menu-button"
import { Button } from "@/components/ui/button"

const featuresContent: NavMenuItem[] = [
    { icon: Link2, title: "Save Links", description: "One-click save from anywhere", color: "bg-purple-600" },
    { icon: Bot, title: "AI Chat", description: "Ask AI about your saved links", color: "bg-blue-600" },
    { icon: FolderOpen, title: "Collections", description: "Organize with smart folders", color: "bg-orange-500" },
    { icon: Chrome, title: "Extension", description: "Save directly from browser", color: "bg-green-600" },
]

const whyContent: NavMenuItem[] = [
    { icon: Shield, title: "Privacy First", description: "Your data stays private", color: "bg-purple-600" },
    { icon: Zap, title: "Lightning Fast", description: "Instant search and access", color: "bg-blue-600" },
    { icon: Sparkles, title: "AI Powered", description: "Smart auto-organization", color: "bg-orange-500" },
    { icon: Search, title: "Find Anything", description: "Never lose a link again", color: "bg-green-600" },
]

export function Navbar() {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 py-4 md:py-8">
            <div className="w-full max-w-[600px]" onMouseLeave={() => setExpandedMenu(null)}>
                <nav className="flex flex-col rounded-2xl md:rounded-3xl bg-neutral-900 text-white shadow-2xl">
                    {/* Main navbar row */}
                    <div className="flex items-center justify-between gap-4 md:gap-6 px-4 md:px-8 py-2">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/2alabs.png"
                                alt="2aLabs"
                                width={56}
                                height={56}
                                priority
                                unoptimized
                                className="w-12 md:w-16 object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <DesktopNavLinks
                            expandedMenu={expandedMenu}
                            setExpandedMenu={setExpandedMenu}
                        />

                        {/* Mobile Auth + Menu Button */}
                        <div className="flex md:hidden items-center gap-3">
                            <Link
                                href="/signin"
                                className="text-sm hover:text-gray-300 transition-colors"
                            >
                                Login
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 text-xs">
                                    Register
                                </Button>
                            </Link>
                            <MobileMenuButton
                                isOpen={mobileMenuOpen}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            />
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu
                        isOpen={mobileMenuOpen}
                        expandedMenu={expandedMenu}
                        setExpandedMenu={setExpandedMenu}
                        featuresContent={featuresContent}
                        whyContent={whyContent}
                    />

                    {/* Desktop Dropdown - inside nav, expands height */}
                    <DesktopDropdown
                        expandedMenu={expandedMenu}
                        mobileMenuOpen={mobileMenuOpen}
                        featuresContent={featuresContent}
                        whyContent={whyContent}
                    />
                </nav>
            </div>
        </div>
    )
}
