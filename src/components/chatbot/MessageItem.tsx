"use client"

import { Card, CardContent } from "@/components/ui/card"
import StructuredResponse from "./StructuredResponse"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ClassAttributes, HTMLAttributes } from 'react'
import { ExternalLink } from 'lucide-react'


interface CodeProps extends ClassAttributes<HTMLElement>, HTMLAttributes<HTMLElement> {
  inline?: boolean;
  node?: any;
}

type MessageItemProps = {
  role: string
  content: any
  isStructured?: boolean
}

export default function MessageItem({ role, content, isStructured }: MessageItemProps) {
  return (
    <div className="mb-5">
      <Card
        className={`${
          role === "user"
            ? "bg-zinc-800 border-gray-700"
            : "bg-transparent border-none"
        } backdrop-blur-sm `}
      >
        <CardContent className="p-5">
          {isStructured && typeof content !== "string" ? (
            <StructuredResponse content={content} />
          ) : (
            <div className="text-white/95 markdown-content prose-headings:text-white prose-strong:text-white/95 prose-a:no-underline max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Enhanced link rendering with icon and better spacing
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200 font-medium break-all"
                    >
                      Click here
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                      {"  "}
                    </a>
                  ),
                  // Improved paragraph spacing and line wrapping
                  p: ({ node, ...props }) => (
                    <p {...props} className="leading-7 text-gray-300 break-words" />
                  ),
                  // Adjusted list spacing for better separation
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc ml-6 mb-6 space-y-4" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal ml-6 mb-6 space-y-4" />
                  ),
                  // Enhanced list item styling for better readability
                  li: ({ node, ...props }) => {
                    const hasNumberPrefix = props.children && 
                      typeof props.children[0] === 'string' && 
                      /^\d+\.\s/.test(props.children[0]);
                    
                    return (
                      <li 
                        {...props} 
                        className={`py-1 mb-2 ${hasNumberPrefix ? 'pl-1' : ''}`}
                      />
                    );
                  },
                  // Improved header spacing and styling
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-xl font-bold mb-3 mt-6" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-lg font-bold mb-3 mt-5" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-md font-bold mb-2 mt-4" />
                  ),
                  // Improved code block styling
                  code: ({ node, inline, ...props }: CodeProps) => (
                    inline 
                      ? <code {...props} className="bg-gray-700 px-1.5 py-0.5 rounded text-sm" />
                      : <code {...props} className="block bg-gray-700 p-3 rounded-md text-sm my-4 overflow-x-auto" />
                  ),
                  // Custom strong element for better title highlighting
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold text-white block mb-1" />
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
                  : content
                }
              </ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}