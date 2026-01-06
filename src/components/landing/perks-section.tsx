import type React from "react"
import { Key, Bot, Search, Chrome, FolderLock, Sparkles } from "lucide-react"

interface FeatureCardProps {
    icon: React.ReactNode
    iconBgColor: string
    title: string
    description: string
}

function FeatureCard({ icon, iconBgColor, title, description }: FeatureCardProps) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
            <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor}`}>
                {icon}
            </div>
            <h3 className="mb-3 text-xl font-medium text-gray-900 md:text-2xl">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
        </div>
    )
}

export function PerksSection() {
    const features = [
        {
            icon: <Key className="h-6 w-6 text-purple-900" strokeWidth={2} />,
            iconBgColor: "bg-purple-200",
            title: "Secret Key Sharing",
            description: "Generate a secret key for any folder and share it with others. They get instant access to all your curated links.",
        },
        {
            icon: <FolderLock className="h-6 w-6 text-cyan-900" strokeWidth={2} />,
            iconBgColor: "bg-cyan-200",
            title: "AI-Powered Folder Access",
            description: "Share your secret key and let others ask AI about your folder's links. Perfect for team collaboration and research sharing.",
        },
        {
            icon: <Search className="h-6 w-6 text-lime-900" strokeWidth={2} />,
            iconBgColor: "bg-lime-200",
            title: "Find Any Link Instantly",
            description: "Can't remember where you saved something? Just ask AI and it will find the exact link from your entire collection.",
        },
        {
            icon: <Chrome className="h-6 w-6 text-pink-900" strokeWidth={2} />,
            iconBgColor: "bg-pink-300",
            title: "Chrome Extension",
            description: "Save links with one click using our Chrome extension. Automatically captures title, description, and images.",
        },
        {
            icon: <Bot className="h-6 w-6 text-orange-900" strokeWidth={2} />,
            iconBgColor: "bg-orange-200",
            title: "AI Chat Assistant",
            description: "Have a conversation with your links. Ask questions, get summaries, and discover connections you never knew existed.",
        },
        {
            icon: <Sparkles className="h-6 w-6 text-indigo-900" strokeWidth={2} />,
            iconBgColor: "bg-indigo-200",
            title: "Smart Auto-Tagging",
            description: "AI automatically categorizes and tags your links as you save them. No manual organization needed.",
        },
    ]

    return (
        <section className="px-4 py-6 lg:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Badge */}
                <div className="mb-4 flex justify-center md:mb-6 md:justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-500 px-3 py-1.5 md:px-4 md:py-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium uppercase tracking-wide text-purple-500 md:text-sm">Features</span>
                    </div>
                </div>
                {/* Grid */}
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    )
}
