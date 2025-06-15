"use client"

import { Card, CardContent } from "@/components/ui/card"
import StructuredResponse from "./StructuredResponse"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { getUserDetails } from "@/store/thunks/userdetailThunks"

type MessageItemProps = {
  role: string
  content: string 
  isStructured?: boolean
  isStreaming?: boolean
  isLast?: boolean
}

export default function MessageItem({ role, content, isStructured, isStreaming, isLast }: MessageItemProps) {
  const { status } = useSession();
  const userId = localStorage.getItem('userId')
  const dispatch = useAppDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('.');

  console.log("content", content)

  // User data management
  React.useEffect(() => {
    if (status === 'authenticated' && userId) {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, status, userId]);
  const userData = useAppSelector((state) => state.userdetail.data);
  const userLoading = useAppSelector((state) => state.userdetail.loading);

  // Blinking cursor effect for streaming messages
  useEffect(() => {
    if (isStreaming && role === 'assistant' && isLast) {
      setIsTyping(true);

      // Return cleanup function
      return () => setIsTyping(false);
    }
    return () => { };
  }, [isStreaming, role, isLast]);

  // Animated typing dots
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingDots(prev => {
          if (prev === '...') return '.';
          return prev + '.';
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  return (
    <div className={`mb-6 ${role === "user" ? "pr-8 ml-auto max-w-[85%]" : "pl-8 max-w-[85%]"}`}>
      <div className="flex items-center mb-2 px-2">
        {role !== "user" && (
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium mr-2 shadow-md ring-2 ring-white dark:ring-transparent">
            AI
          </div>
        )}
        {role === "user" && (
          <div className="relative w-9 h-9 sm:w-8 sm:h-8 rounded-full overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-200 hover:ring-2 hover:ring-slate-300 dark:hover:ring-gray-400/30 focus:outline-none">
            {userLoading ? (
              <div className='animate-pulse bg-slate-200 dark:bg-zinc-700 w-full h-full rounded-full transition-colors'></div>
            ) : userData?.image ? (
              <Image
                src={userData.image}
                alt='Profile'
                fill
                className='object-cover'
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium mr-2 shadow-md ring-2 ring-white dark:ring-transparent">
                {userData?.name?.charAt(0)}
              </div>
            )}
          </div>
        )}
      </div>
      <Card
        className={`${role === "user"
          ? "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-md hover:shadow-lg dark:bg-zinc-800 dark:border-gray-700 dark:from-transparent dark:to-transparent"
          : "bg-white border border-slate-100 shadow-sm dark:bg-zinc-900/60 dark:border-gray-800"
          } backdrop-blur-sm transition-all duration-200 rounded-2xl overflow-hidden`}
      >
        <CardContent className="p-5 relative">
          
            <div className="text-slate-800 dark:text-white/95 markdown-content prose prose-slate dark:prose-invert prose-headings:text-slate-800 dark:prose-headings:text-white prose-headings:font-semibold prose-strong:text-slate-800 dark:prose-strong:text-white/95 prose-a:no-underline prose-p:leading-relaxed max-w-none transition-colors">
              <MarkdownRenderer>
                {`${content}`}
              </MarkdownRenderer>
              {isTyping && (
                <span className="typing-cursor inline-block w-2 h-4 ml-1 bg-blue-500 animate-blink rounded-sm dark:bg-blue-400"></span>
              )}
            </div>
        </CardContent>
      </Card>

      {/* Styling for animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s ease-in-out infinite;
        }
        
        /* Smooth fade-in for new content */
        .markdown-content > * {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        
        /* Improved code block styling */
        pre {
          position: relative;
          transition: all 0.2s ease;
        }
        
        pre:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  )
}