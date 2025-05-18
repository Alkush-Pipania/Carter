"use client"

import { Card, CardContent } from "@/components/ui/card"
import StructuredResponse from "./StructuredResponse"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { ResponseType } from '@/lib/store/chat'
import React, { useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { getUserDetails } from "@/store/thunks/userdetailThunks"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CodeProps {
  inline?: boolean;
  children?: React.ReactNode;
  className?: string;
}

type MessageItemProps = {
  role: string
  content: string | ResponseType
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

  // Smart Link Renderer for handling duplicate URLs and better display
  const SmartLinkRenderer = ({ href, children }: { href: string, children: React.ReactNode }) => {
    // Get all child text content
    const displayText = React.Children.toArray(children)
      .map(child => typeof child === 'string' ? child : '')
      .join('');

    // Clean up URLs that might appear in the text
    let finalText = displayText;

    // Check if this is a duplicate URL situation (text contains the URL)
    if (href && typeof href === 'string') {
      const urlWithoutProtocol = href.replace(/^https?:\/\//, '');
      if (displayText.includes(urlWithoutProtocol) || displayText.includes(href)) {
        // This is a case where the URL appears in both text and href
        finalText = href; // Just show the URL once
      }
    }

    // If we've removed everything, or text is basically the URL, just use the URL
    if (!finalText.trim() || displayText === href) {
      finalText = href;
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors duration-200 font-medium break-all"
      >
        {finalText}
        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
      </a>
    );
  };

  // Preprocess content to fix common markdown issues
  const preprocessContent = (content: string | ResponseType) => {
    if (typeof content !== 'string') return JSON.stringify(content);

    let processed = content;

    // Fix broken links where the domain appears in both text and href
    processed = processed.replace(
      /\[(https?:\/\/[^\]\s]+)[^\]]*\]\((https?:\/\/[^\)\s]+)[^\)]*\)/g,
      (match, linkText, linkHref) => {
        // Get the base domains to compare
        const domain1 = linkText.replace(/^https?:\/\//, '').split('/')[0];
        const domain2 = linkHref.replace(/^https?:\/\//, '').split('/')[0];

        // If domains match, simplify to just use the href
        if (domain1 === domain2) {
          return `[${linkHref}](${linkHref})`;
        }
        return match;
      }
    );

    // Fix duplicate URLs that appear after a markdown link
    processed = processed.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)(?:\s*)\((https?:\/\/[^\s\)]+)\)/g,
      (match, text, url1, url2) => {
        const domain1 = url1.replace(/^https?:\/\//, '').split('/')[0];
        const domain2 = url2.replace(/^https?:\/\//, '').split('/')[0];

        if (domain1 === domain2) {
          return `[${text}](${url1})`;
        }
        return match;
      }
    );

    // Make sure numbers followed by dots have a space after them for proper list rendering
    processed = processed.replace(/(\d+\.)\s*(\S)/g, '$1 $2');

    return processed;
  };

  // Copy code function
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Code copied to clipboard");
      return true;
    } catch (err) {
      toast.error("Failed to copy code");
      return false;
    }
  }, []);

  // Code block component with copy button
  const CodeBlock = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);
    const codeString = React.Children.toArray(children).join('');

    const handleCopy = async () => {
      const success = await copyToClipboard(codeString);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    // Extract language from className (e.g., "language-javascript")
    const language = className?.replace('language-', '') || 'code';

    return (
      <div className="relative group my-4">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            )}
          </button>
        </div>
        <div className="absolute left-2 top-2 z-10">
          <span className="px-2 py-1 text-xs font-medium rounded text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50">
            {language}
          </span>
        </div>
        <pre className={cn(
          "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
          "p-4 pt-10 rounded-md text-sm overflow-x-auto border border-slate-200 dark:border-slate-700",
          "text-slate-800 dark:text-slate-200 font-mono shadow-sm transition-colors"
        )}>
          {children}
        </pre>
      </div>
    );
  };

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
          {isStructured && typeof content !== "string" ? (
            <StructuredResponse content={content} />
          ) : (
            <div className="text-slate-800 dark:text-white/95 markdown-content prose prose-slate dark:prose-invert prose-headings:text-slate-800 dark:prose-headings:text-white prose-headings:font-semibold prose-strong:text-slate-800 dark:prose-strong:text-white/95 prose-a:no-underline prose-p:leading-relaxed max-w-none transition-colors">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Enhanced link rendering with smart handling
                  a: SmartLinkRenderer,
                  // Improved paragraph spacing and line wrapping
                  p: (props) => (
                    <p {...props} className="leading-7 text-slate-600 dark:text-gray-300 break-words transition-colors font-normal" />
                  ),
                  // Adjusted list spacing for better separation
                  ul: (props) => (
                    <ul {...props} className="list-disc ml-6 mb-6 space-y-2" />
                  ),
                  ol: (props) => (
                    <ol {...props} className="list-decimal ml-6 mb-6 space-y-2" />
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
                        className={`py-1 mb-1 ${hasNumberPrefix ? 'pl-1' : ''}`}
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
                  // Improved code block styling with copy button
                  code: (props) => {
                    const { inline, className, children, ...rest } = props as CodeProps;
                    return inline
                      ? <code {...rest} className="bg-slate-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm text-slate-700 dark:text-gray-200 font-mono transition-colors">{children}</code>
                      : <CodeBlock className={className}>{children}</CodeBlock>;
                  },
                  // Custom strong element for better title highlighting
                  strong: (props) => (
                    <strong {...props} className="font-bold text-slate-900 dark:text-white block mb-1 transition-colors">
                      {props.children}
                    </strong>
                  ),
                }}
              >
                {preprocessContent(content)}
              </ReactMarkdown>
              {isTyping && (
                <span className="typing-cursor inline-block w-2 h-4 ml-1 bg-blue-500 animate-blink rounded-sm dark:bg-blue-400"></span>
              )}
            </div>
          )}
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