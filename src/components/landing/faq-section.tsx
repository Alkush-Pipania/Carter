"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
    {
        question: "What is Carter, and how can it help me?",
        answer:
            "Carter is a smart, serverless link management tool designed to help you organize, store, and retrieve your important links effortlessly. It offers features like link categorization, AI-driven link suggestions, and real-time access, allowing you to stay productive and focus on what matters most.",
    },
    {
        question: "Is my data secure with Carter?",
        answer:
            "Carter is built with security as a priority. All your data is encrypted, and we never share your information with third parties. You have complete control over your links and can choose to keep them private or share them selectively. Our serverless architecture also means minimal attack surfaces for potential threats.",
    },
    {
        question: "How does the Carter Extension enhance my browsing experience?",
        answer:
            "The Carter Extension lets you save links directly from your browser to your Carter account with just one click. Organize your links into folders or save them globally without leaving your current tab. The extension also provides quick access to your saved links, making it easier than ever to manage and retrieve important resources while browsing.",
    },
    {
        question: "How does the AI find my links?",
        answer:
            "Our AI indexes all your saved links including titles, descriptions, and content. When you ask a question, it uses semantic search to find the most relevant links from your collection instantly.",
    },
    {
        question: "What is a secret key?",
        answer:
            "A secret key is a unique code generated for any folder. Share it with others and they can access your curated links or ask the AI about them. Perfect for team collaboration and research sharing.",
    },
    {
        question: "Does the Chrome extension work on all websites?",
        answer:
            "Yes! Our Chrome extension works on any website. With one click, it captures the URL, title, description, and preview image automatically. You can also add custom tags and notes.",
    },
    {
        question: "How are my links organized?",
        answer:
            "AI automatically categorizes and tags your links as you save them. You can also create custom folders and collections. The system learns from your behavior to improve organization over time.",
    },
    {
        question: "Is my data private and secure?",
        answer:
            "Absolutely. We use enterprise-grade encryption for all data. Your links and personal information are never shared or sold. You have full control over what you share via secret keys.",
    },
]

export function FAQSection() {
    return (
        <section className="w-full py-12 md:py-20 px-4 bg-white dark:bg-black">
            <div className="w-full max-w-2xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    Frequently Asked Questions
                </h2>

                <Accordion type="single" collapsible className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    {faqData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className={`${index !== faqData.length - 1 ? "border-b border-gray-200 dark:border-zinc-800" : ""} data-[state=open]:bg-purple-500 data-[state=open]:text-white group`}
                        >
                            <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline transition-colors duration-200 [&>svg]:hidden text-gray-900 dark:text-gray-200 data-[state=open]:text-white">
                                <div className="flex justify-between items-center w-full">
                                    <span>{item.question}</span>
                                    <span className="text-xl font-normal">
                                        <span className="group-data-[state=open]:hidden">+</span>
                                        <span className="hidden group-data-[state=open]:inline">−</span>
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 group-data-[state=open]:text-white/90">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section >
    )
}
