"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import LetterGlitch from "../ui/LetterGlitch"
import { memo } from "react"

// FAQ data for easier maintenance
const faqItems = [
  {
    id: "item-1",
    question: "What is Carter, and how can it help me?",
    answer:
      "Carter is a smart, serverless link management tool designed to help you organize, store, and retrieve your important links effortlessly. It offers features like link categorization, AI-driven link suggestions, and real-time access, allowing you to stay productive and focus on what matters most.",
  },
  {
    id: "item-2",
    question: "Is my data secure with Carter?",
    answer:
      "Carter is built with security as a priority. All your data is encrypted, and we never share your information with third parties. You have complete control over your links and can choose to keep them private or share them selectively. Our serverless architecture also means minimal attack surfaces for potential threats.",
  },
  {
    id: "item-3",
    question: "How does the Carter Extension enhance my browsing experience?",
    answer:
      "The Carter Extension lets you save links directly from your browser to your Carter account with just one click. Organize your links into folders or save them globally without leaving your current tab. The extension also provides quick access to your saved links, making it easier than ever to manage and retrieve important resources while browsing.",
  },
]

// Memoized LetterGlitch to prevent unnecessary re-renders
const MemoizedLetterGlitch = memo(LetterGlitch)

export default function FAQ() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden text-white" id="about">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Side - About */}
          <div className="order-2 lg:order-1 flex flex-col justify-center self-start">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA] to-[#FAFAFA]">
              About Carter
            </h2>

            <Accordion
              type="single"
              collapsible
              className="space-y-3 text-base text-[#FAFAFA] overflow-y-auto max-h-[calc(100vh-200px)]"
              defaultValue="item-1"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  className="border border-purple-900/30 px-4 py-3 rounded-xl transition-all duration-300 hover:border-purple-700/50"
                  value={item.id}
                >
                  <AccordionTrigger className="text-lg font-semibold text-[#FAFAFA] hover:text-white transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAFAFA]/90 leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Side - LetterGlitch */}
          <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden  border    sticky top-8">
            <MemoizedLetterGlitch
              glitchColors={["#6917AA", "#9333EA", "#A855F7", "#8B5CF6", "#6366F1"]}
              
              glitchSpeed={70}
              centerVignette={false}
              outerVignette={true}
              smooth={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
