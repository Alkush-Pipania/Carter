"use client"

import { Card, CardContent } from "@/components/ui/card"
import StructuredResponse from "./StructuredResponse"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLink, User } from 'lucide-react'
import { ResponseType } from '@/lib/store/chat'
import React from 'react'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { getUserDetails } from "@/store/thunks/userdetailThunks"


interface CodeProps {
  inline?: boolean;
  children?: React.ReactNode;
}

type MessageItemProps = {
  role: string
  content: string | ResponseType
  isStructured?: boolean
}

export default function MessageItem({ role, content, isStructured }: MessageItemProps) {
    const { status } = useSession();
    const userId = localStorage.getItem('userId')
    const dispatch = useAppDispatch();

    React.useEffect(() => {
      if (status === 'authenticated' && userId) {
        dispatch(getUserDetails(userId));
      }
    }, [dispatch, status, userId]);
   const userData = useAppSelector((state) => state.userdetail.data);
   const userLoading = useAppSelector((state) => state.userdetail.loading);

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
        className={`${
          role === "user"
            ? "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-md hover:shadow-lg dark:bg-zinc-800 dark:border-gray-700 dark:from-transparent dark:to-transparent"
            : "bg-white border border-slate-100 shadow-sm dark:bg-transparent dark:border-none"
        } backdrop-blur-sm transition-all duration-200 rounded-2xl overflow-hidden`}
      >
        <CardContent className="p-5 relative">
          {isStructured && typeof content !== "string" ? (
            <StructuredResponse content={content} />
          ) : (
            <div className="text-slate-800 dark:text-white/95 markdown-content prose prose-slate dark:prose-invert prose-headings:text-slate-800 dark:prose-headings:text-white prose-headings:font-semibold prose-strong:text-slate-800 dark:prose-strong:text-white/95 prose-a:no-underline prose-p:leading-relaxed max-w-none transition-colors">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Enhanced link rendering with icon and better spacing
                  a: (props) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors duration-200 font-medium break-all"
                    >
                      {props.children}
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                    </a>
                  ),
                  // Improved paragraph spacing and line wrapping
                  p: (props) => (
                    <p {...props} className="leading-7 text-slate-600 dark:text-gray-300 break-words transition-colors font-normal" />
                  ),
                  // Adjusted list spacing for better separation
                  ul: (props) => (
                    <ul {...props} className="list-disc ml-6 mb-6 space-y-4" />
                  ),
                  ol: (props) => (
                    <ol {...props} className="list-decimal ml-6 mb-6 space-y-4" />
                  ),
                  // Enhanced list item styling for better readability
                  li: (props) => {
                    const hasNumberPrefix = props.children && 
                      Array.isArray(props.children) &&
                      typeof props.children[0] === 'string' && 
                      /^\d+\.\s/.test(props.children[0]);
                    
                    return (
                      <li 
                        {...props} 
                        className={`py-1 mb-2 ${hasNumberPrefix ? 'pl-1' : ''}`}
                      >
                        {props.children}
                      </li>
                    );
                  },
                  // Improved header spacing and styling
                  h1: (props) => (
                    <h1 {...props} className="text-xl font-bold mb-3 mt-6" />
                  ),
                  h2: (props) => (
                    <h2 {...props} className="text-lg font-bold mb-3 mt-5" />
                  ),
                  h3: (props) => (
                    <h3 {...props} className="text-md font-bold mb-2 mt-4" />
                  ),
                  // Improved code block styling
                  code: (props) => {
                    const {inline, children, ...rest} = props as CodeProps & {children: React.ReactNode};
                    return inline 
                      ? <code {...rest} className="bg-slate-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm text-slate-700 dark:text-gray-200 font-mono transition-colors">{children}</code>
                      : <code {...rest} className="block bg-gradient-to-r from-slate-50 to-slate-100 dark:bg-gray-700 p-3 rounded-md text-sm my-4 overflow-x-auto text-slate-700 dark:text-gray-200 font-mono border border-slate-200 dark:border-transparent transition-colors">{children}</code>
                  },
                  // Custom strong element for better title highlighting
                  strong: (props) => (
                    <strong {...props} className="font-bold text-slate-900 dark:text-white block mb-1 transition-colors">
                      {props.children}
                    </strong>
                  ),
                }}
              >
                {/* Process content to properly format numbered lists with links */}
                {typeof content === 'string' 
                  ? content
                      // Make sure numbers followed by dots have a space after them
                      .replace(/(\d+\.)\s*(\S)/g, '$1 $2')
                      // Add an extra line break before URLs to ensure they display on their own line
                      .replace(/(https?:\/\/\S+)/g, '\n$1\n')
                  : JSON.stringify(content)  // Convert non-string content to string
                }
              </ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}