"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import InputBox from "./Input-Box"
import { Skeleton } from "@/components/ui/skeleton"
import { useChatStore } from "@/lib/store/chat"
import { ResponseSchema, type ResponseType } from "@/lib/store/chat"
import { config } from "dotenv"

config()

function StructuredResponse({ content }: { content: ResponseType }) {
  return (
    <div className="text-white space-y-4 sm:space-y-6 max-w-full">
      {/* Intro paragraph with subtle highlight */}
      <div className="bg-primary-purple/primary-purple-500/5 p-3 sm:p-4 rounded-lg">
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">{content.intro}</p>
      </div>

      {/* Content sections */}
      {content.contentSections.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          {content.contentSections.map((section, index) => (
            <div 
              key={index} 
              className="bg-primary-blue/primary-blue-500/5 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3"
            >
              <h3 className="text-base sm:text-lg font-medium text-white flex items-start sm:items-center gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-purple/primary-purple-500/20 text-xs sm:text-sm">
                  {index + 1}
                </span>
                <span className="flex-1">{section.title}</span>
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed pl-7 sm:pl-8">
                {section.content}
              </p>

              {section.links.length > 0 && (
                <div className="pl-7 sm:pl-8 space-y-1.5 sm:space-y-2 mt-2">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 text-primary-purple/primary-purple-400 hover:text-primary-purple/primary-purple-300 transition-colors group text-sm sm:text-base"
                    >
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                      <span className="underline underline-offset-2 break-all">
                        {link.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Outro with different styling */}
      <div className="bg-primary-purple/primary-purple-500/5 p-3 sm:p-4 rounded-lg">
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">{content.outro}</p>
      </div>
    </div>
  )
}

type ChatComponentProps = {
  greetings: string
}

export default function Chatcomponent({ greetings }: ChatComponentProps) {
  const { id: chatId } = useParams<{ id: string }>()
  const { messages, isLoading, addMessage, setLoading } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    const container = chatContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNewMessage = async (message: string) => {
    setLoading(true)
    addMessage({ role: "user", content: message })
     const token = localStorage.getItem('token')
     const userId = localStorage.getItem('userId')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          userId: userId,   
          userInput: message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || "Something went wrong")
      }

      const result = ResponseSchema.safeParse(data)
      if (!result.success) {
        console.error("Schema validation errors:", result.error)
        throw new Error("Invalid response format from server")
      }

      addMessage({
        role: "assistant",
        content: result.data,
        isStructured: true,
      })
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to communicate with the server")
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden  text-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar my-4 px-6 py-8 sm:mb-0 mb-32 max-w-4xl mx-auto w-full relative"
      >
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl font-semibold text-white/90">{greetings}</h1>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === "user" ? "ml-auto max-w-[80%]" : "mr-auto max-w-[90%]"}`}
          >
            <Card
              className={`${
                message.role === "user"
                  ? "bg-primary-purple/primary-purple-500/20 border-primary-purple/primary-purple-400/30"
                  : "bg-primary-blue/primary-blue-500/20 border-primary-blue/primary-blue-400/30"
              } backdrop-blur-sm`}
            >
              <CardContent className="p-4">
                {message.isStructured && typeof message.content !== "string" ? (
                  <StructuredResponse content={message.content} />
                ) : (
                  <p className="text-white/90">{message.content as string}</p>
                )}
              </CardContent>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="mb-4 mr-auto w-2/3">
            <Card className="bg-primary-blue/primary-blue-500/20 border-primary-blue/primary-blue-400/30 backdrop-blur-sm">
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4 bg-primary-blue/primary-blue-400/30" />
                <Skeleton className="h-4 w-full bg-primary-blue/primary-blue-400/30" />
                <Skeleton className="h-4 w-1/2 bg-primary-blue/primary-blue-400/30" />
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-3 w-1/3 bg-primary-blue/primary-blue-400/30" />
                  <Skeleton className="h-3 w-1/4 bg-primary-blue/primary-blue-400/30" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />

        {showScrollButton && (
          <Button
            onClick={scrollToBottom}
            className="fixed sm:bottom-36 lg:right-2/4 bottom-40 right-8 sm:right-24 rounded-full p-3 bg-primary-purple/primary-purple-500 hover:bg-primary-purple/primary-purple-600 shadow-lg shadow-primary-purple/primary-purple-500/20 z-10"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        )}
      </div>
      <InputBox id={chatId} isMobile={isMobile} onSendMessage={handleNewMessage} />
    </div>
  )
}

