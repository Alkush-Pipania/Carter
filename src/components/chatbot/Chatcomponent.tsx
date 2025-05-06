"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useChatStore } from "@/lib/store/chat"
import InputBox from "./Input-Box"
import MessageItem from "./MessageItem"
import { ThinkingLoader } from "./LoadingMessage"
import ScrollButton from "./ScrollButton"

type ChatComponentProps = {
  greetings: string
}

export default function Chatcomponent({ greetings }: ChatComponentProps) {
  const { id: chatId } = useParams<{ id: string }>()
  const { messages, isLoading, isStreaming, addMessage, setLoading } = useChatStore()
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
    addMessage({ role: "user", content: message })
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    
    // Set loading state, but don't set streaming yet
    // We'll set streaming to true only when we start receiving content
    setLoading(true)
    useChatStore.getState().setStreaming(false)
    
    try {
      // Use the fetch API with streams for the POST endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({
          userId: userId,   
          userInput: message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || "Something went wrong")
      }

      // Process the streaming response
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Stream not available")
      }

      // Function to read from the stream
      const processStream = async () => {
        let buffer = '';
        
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              // Process any remaining data in the buffer
              if (buffer.trim()) {
                processEventData(buffer);
              }
              break;
            }
            
            // Convert the chunk to a string and add to buffer
            const chunk = new TextDecoder().decode(value)
            buffer += chunk;
            
            // Process complete SSE messages
            const messages = buffer.split('\n\n');
            buffer = messages.pop() || ''; // Keep the last incomplete message in the buffer
            
            for (const message of messages) {
              if (message.trim()) {
                processEventData(message);
              }
            }
          }
        } finally {
          // Finalize the message when stream is complete
          useChatStore.getState().finalizeStreamedMessage();
          setLoading(false);
        }
      };
      
      // Helper function to process SSE event data
      const processEventData = (message: string) => {
        if (message.startsWith('data: ')) {
          const dataRaw = message.replace(/^data: /, '');
          if (!dataRaw) return;
          
          // Set streaming to true when we receive the first data chunk
          // This will hide the ThinkingLoader and show the streaming content
          if (!useChatStore.getState().isStreaming) {
            useChatStore.getState().setStreaming(true);
          }
          
          try {
            // First try to parse as JSON (backward compatibility)
            const jsonData = JSON.parse(dataRaw);
            useChatStore.getState().appendToLastMessage(jsonData);
          } catch (e) {
            // If not JSON, treat as raw text (for word-by-word streaming)
            useChatStore.getState().appendToLastMessage(dataRaw);
          }
          
          scrollToBottom();
        } else if (message.startsWith('event: complete')) {
          // console.log('Stream completed');
        } else if (message.startsWith('event: error')) {
          // Handle error event
          const errorMatch = message.match(/data: (.+)/);
          const errorMessage = errorMatch ? errorMatch[1] : 'Unknown error';
          toast.error(`Error: ${errorMessage}`);
        }
      };
      
      // Start processing the stream
      processStream();
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to communicate with the server");
      useChatStore.getState().finalizeStreamedMessage();
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      {messages.length > 0 && (
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-44 hide-scrollbar pt-16 pb-8 px-6 max-w-[800px] mx-auto w-full relative"
        >
          {messages.map((message, index) => (
            <MessageItem 
              key={index}
              role={message.role}
              content={message.content}
              isStructured={message.isStructured}
            />
          ))}

          {isLoading && !isStreaming && <ThinkingLoader isLoading={true} />}
          <div ref={messagesEndRef} className="h-[15vh]" />

          <ScrollButton
            onClick={scrollToBottom}
            show={showScrollButton}
          />
        </div>
      )}
      <InputBox 
        id={chatId} 
        onSendMessage={handleNewMessage}
        greeting={messages.length === 0 ? greetings : undefined}
        hasMessages={messages.length > 0}
      />
    </div>
  )
}
