import Link from "next/link"
import { Linkedin, Instagram, Github } from "lucide-react"

// Custom X (Twitter) icon since lucide doesn't have it
function XIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const footerLinks = {
    product: {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Login", href: "/signin" },
            { name: "Register", href: "/signup" },
            { name: "Docs", href: "/docs" },
        ]
    },
    features: {
        title: "Features",
        links: [
            { name: "Save Links", href: "#" },
            { name: "AI Chat", href: "#" },
            { name: "Collections", href: "#" },
            { name: "Extension", href: "#" },
        ]
    },
    company: {
        title: "Company",
        links: [
            { name: "Contact", href: "#" },
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
        ]
    },
    compare: {
        title: "Compare",
        links: [
            { name: "Pocket", href: "https://getpocket.com", external: true },
            { name: "Raindrop", href: "https://raindrop.io", external: true },
            { name: "Notion", href: "https://notion.so", external: true },
        ]
    }
}

const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/alkushpipania/", label: "LinkedIn" },
    { icon: XIcon, href: "https://x.com/alkushx", label: "X" },
    { icon: Instagram, href: "https://www.instagram.com/al_ways_kush", label: "Instagram" },
    { icon: Github, href: "https://github.com/Alkush-Pipania", label: "GitHub" },
]

export function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-black py-12 px-4 md:px-8 border-t border-gray-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Left side - Description */}
                    <div className="lg:col-span-2 space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                            Built over hundreds of late nights. Carter gives you a smart, AI-powered way to save and find your links.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Operational</span>
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>

                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* Links columns */}
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}
