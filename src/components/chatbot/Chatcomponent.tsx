"use client"

import { useEffect, useRef, useState } from "react"

import { toast } from "sonner"
import { useChatStore } from "@/lib/store/chat"
import MessageItem from "./MessageItem"
import { ThinkingLoader } from "./LoadingMessage"
import ScrollButton from "./ScrollButton"
import { Shield, Sparkles } from "lucide-react"
import { chatStream, chatWithSecretKeyStream } from "@/services/API_Services"
import { useParams } from "next/navigation"
import InputBox from "./Input-Box"

type ChatComponentProps = {
  greetings: string
}

export default function ChatComponent({ greetings }: ChatComponentProps) {
  const { id: chatId } = useParams<{ id: string }>()

  const { messages, isLoading, isStreaming, addMessage, setLoading } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [secretKey, setSecretKey] = useState<string>("")
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  const scrollToBottom = (behavior: "auto" | "smooth" = "smooth") => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior })
    }, 100)
  }

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    if (autoScrollEnabled) {
      scrollToBottom()
    }
  }, [messages, isLoading, autoScrollEnabled])

  useEffect(() => {
    const container = chatContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isCloseToBottom = scrollHeight - scrollTop - clientHeight < 100

      setShowScrollButton(!isCloseToBottom)
      setAutoScrollEnabled(isCloseToBottom)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Normal API request function (without secret key)
  const handleNormalMessage = async (message: string) => {
    addMessage({ role: "user", content: message })
    scrollToBottom("auto")

    const userId = localStorage.getItem("userId")

    setLoading(true)
    useChatStore.getState().setStreaming(false)

    try {
      const chatHistory = useChatStore
        .getState()
        .messages.slice(-5)
        .map((msg) => ({
          role: msg.role,
          content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
        }))

      const response = await chatStream({
        userId: userId,
        userInput: message,
        chatHistory: chatHistory,
      })


      await processStreamResponse(response)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to communicate with the server")
      useChatStore.getState().finalizeStreamedMessage()
      setLoading(false)
    }
  }

  // Secret key API request function (with secret key)
  const handleSecretMessage = async (message: string) => {
    addMessage({ role: "user", content: message })
    scrollToBottom("auto")

    const userId = localStorage.getItem("userId")

    setLoading(true)
    useChatStore.getState().setStreaming(false)

    try {
      const chatHistory = useChatStore
        .getState()
        .messages.slice(-5)
        .map((msg) => ({
          role: msg.role,
          content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
        }))

      const response = await chatWithSecretKeyStream({
        userId: userId,
        userInput: message,
        chatHistory: chatHistory,
        secretKey: secretKey,
      })


      await processStreamResponse(response)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to communicate with secure server")
      useChatStore.getState().finalizeStreamedMessage()
      setLoading(false)
    }
  }

  // Common stream processing function
  const processStreamResponse = async (response: Response) => {
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error("Stream not available")
    }

    const processStream = async () => {
      let buffer = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            if (buffer.trim()) {
              processEventData(buffer)
            }
            break
          }

          const chunk = new TextDecoder().decode(value)
          buffer += chunk

          const messages = buffer.split("\n\n")
          buffer = messages.pop() || ""

          for (const message of messages) {
            if (message.trim()) {
              processEventData(message)
            }
          }
        }
      } finally {
        useChatStore.getState().finalizeStreamedMessage()
        setLoading(false)
        setAutoScrollEnabled(true)
        scrollToBottom()
      }
    }

    const processEventData = (message: string) => {
      if (message.startsWith("data: ")) {
        const dataRaw = message.replace(/^data: /, "")

        if (!useChatStore.getState().isStreaming) {
          useChatStore.getState().setStreaming(true)
          scrollToBottom("auto")
        }

        // An empty data field from the stream indicates a newline.
        if (dataRaw.trim() === "") {
          useChatStore.getState().appendToLastMessage("\n")
        } else {
          try {
            const jsonData = JSON.parse(dataRaw)
            useChatStore.getState().appendToLastMessage(jsonData)
          } catch (e) {
            useChatStore.getState().appendToLastMessage(dataRaw)
          }
        }

        if (autoScrollEnabled) {
          scrollToBottom("auto")
        }
      } else if (message.startsWith("event: error")) {
        const errorMatch = message.match(/data: (.+)/)
        const errorMessage = errorMatch ? errorMatch[1] : "Unknown error"
        toast.error(`Error: ${errorMessage}`)
      }
    }

    processStream()
  }

  // Main message handler that routes to appropriate function
  const handleNewMessage = async (message: string) => {
    if (secretKey) {
      await handleSecretMessage(message)
    } else {
      await handleNormalMessage(message)
    }
  }

  // Dynamic styling based on secret key presence
  const hasSecretKey = !!secretKey
  const containerBg = hasSecretKey
    ? "bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-emerald-950/10"
    : "bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"

  const chatContainerBg = hasSecretKey
    ? ""
    : "bg-transparent"

  return (
    <div
      className={`flex flex-col h-screen w-full overflow-hidden text-slate-800 dark:text-white transition-all duration-500 ${containerBg}`}
    >
      {/* Secret Key Status Bar */}
      {hasSecretKey && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 backdrop-blur-sm border-b border-emerald-400/20">
          <div className="max-w-[800px] mx-auto px-6 py-2 flex items-center justify-center gap-2">
            <Shield size={16} className="text-white animate-pulse" />
            <span className="text-white text-sm font-medium">Secret key Mode Active</span>
            <Sparkles size={14} className="text-emerald-200 animate-bounce" />
          </div>
        </div>
      )}

      <div
        ref={chatContainerRef}
        className={`flex-1  overflow-y-auto mb-44 hide-scrollbar ${hasSecretKey ? "pt-20" : "pt-16"} pb-8 px-6 max-w-[800px] mx-auto w-full relative transition-all duration-500 ${chatContainerBg}`}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              hasSecretKey ? "animate-in slide-in-from-left-2 fade-in-50" : "animate-in fade-in-50"
            }`}
          >
            <MessageItem
              role={message.role}
              content={message.content}
              isStructured={message.isStructured}
              isStreaming={isStreaming && index === messages.length - 1 && message.role === "assistant"}
              isLast={index === messages.length - 1}
            />
          </div>
        ))}

        {isLoading && !isStreaming && (
          <div className={`transition-all duration-300 ${hasSecretKey ? "animate-pulse" : ""}`}>
            <ThinkingLoader isLoading={true} />
          </div>
        )}

        <div ref={messagesEndRef} className="h-[15vh]" />

        <ScrollButton
          onClick={() => {
            scrollToBottom()
            setAutoScrollEnabled(true)
          }}
          show={showScrollButton}
        />
      </div>

      <InputBox
        setSecretKey={setSecretKey}
        id={chatId}
        onSendMessage={handleNewMessage}
        greeting={messages.length === 0 ? greetings : undefined}
        hasMessages={messages.length > 0}
      />

      {/* Floating particles effect for secret mode */}
      {hasSecretKey && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-300/40 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-500/20 rounded-full animate-bounce animation-delay-3000"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-ping animation-delay-4000"></div>
        </div>
      )}
    </div>
  )
}
