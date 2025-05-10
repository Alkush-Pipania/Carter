"use client"

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getLinkContent } from '@/store/thunks/linkContentThunks'
import { Card, CardContent } from '@/components/ui/card'
import { MoreHorizontal, Trash2, Move, ChevronDown, ChevronUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface LinkDisplayProps {
  linkId: string
}

export function LinkDisplay({ linkId }: LinkDisplayProps) {
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector((state) => state.linkContent)
  const [expandedBody, setExpandedBody] = useState(false)
  const [expandedDescription, setExpandedDescription] = useState(false)
  const userId = localStorage.getItem('userId') as string

  useEffect(() => {
    dispatch(getLinkContent({ id: linkId, user_id: userId }))
  }, [dispatch, linkId, userId])

  const handleMoveTo = () => {
    toast.info("Move option selected", {
      description: "This feature will be implemented soon"
    })
  }

  const handleDelete = () => {
    toast.info("Delete option selected", {
      description: "This feature will be implemented soon"
    })
    // In future this would call a delete action
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 my-4">
        <div className="flex justify-between items-center">
          <div className="h-8 w-2/3 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
          <div className="h-9 w-9 rounded-md bg-slate-200 dark:bg-gray-700 transition-colors"></div>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="h-4 w-28 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
            <div className="h-4 w-4 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
          </div>
          <div className="h-5 w-full sm:w-3/4 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
        </div>
        
        <div className="rounded-lg border border-slate-200 dark:border-gray-700 p-4 space-y-3 transition-colors">
          <div className="h-6 w-1/3 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
            <div className="h-4 w-full bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-gray-700 rounded-md transition-colors"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return <div className="text-red-400 p-4">Failed to load link data</div>
  }

  const formattedDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString() : null
  const isYoutubeLink = data.links?.includes('youtube.com') || data.links?.includes('youtu.be')
  
  // Text truncation
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  const bodyText = data.body || ''
  const descriptionText = data.description || ''
  
  const truncatedBody = truncateText(bodyText, 80)
  const truncatedDescription = truncateText(descriptionText, 150)
  
  const showBodyViewMore = bodyText.length > 300
  const showDescriptionViewMore = descriptionText.length > 150

  return (
    <div className="space-y-6 my-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors">{data.title}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-9 w-9 p-0 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded-md transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5 text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[180px] bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 rounded-lg shadow-lg backdrop-blur-sm transition-colors"
          >
            <DropdownMenuItem
              onClick={handleMoveTo}
              className="flex items-center px-3 py-2 text-sm cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 dark:focus:bg-zinc-800/50 dark:focus:text-zinc-100 transition-colors"
            >
              <Move className="mr-2 h-4 w-4 text-slate-500 dark:text-zinc-400 transition-colors" />
              <span>Move To</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-zinc-800/50 transition-colors" />
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300 dark:focus:bg-red-500/10 dark:focus:text-red-300 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-1.5 text-slate-500 dark:text-gray-400 text-sm transition-colors">
        <div className="flex gap-2 items-center">
          <span className="text-slate-500 dark:text-gray-500 transition-colors">Page created on</span>
          {formattedDate && (
            <>
              <span className="text-slate-500 dark:text-gray-500 transition-colors">•</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>
        <a 
          href={data.links} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:text-blue-300 hover:underline transition-colors break-all"
        >
          {data.links}
        </a>
      </div>

      {data.body && (
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-500 transition-colors">
          <CardContent className="p-4">
            <div className="text-slate-700 dark:text-gray-300 transition-colors">
              <h3 className="text-lg font-medium mb-2">
                {isYoutubeLink ? "Transcription" : "Content"}
              </h3>
              <div className="whitespace-pre-line">
                <p>{expandedBody ? bodyText : truncatedBody}</p>
                
                {showBodyViewMore && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setExpandedBody(!expandedBody)}
                    className="mt-2  dark:text-gray-400   flex items-center gap-1 transition-colors"
                  >
                    {expandedBody ? (
                      <>
                        Show less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.description && (
        <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-500 transition-colors">
          <CardContent className="p-4">
            <div className="text-slate-700 dark:text-gray-300 transition-colors">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <div className="whitespace-pre-line">
                <p>{expandedDescription ? descriptionText : truncatedDescription}</p>
                
                {showDescriptionViewMore && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setExpandedDescription(!expandedDescription)}
                    className="mt-2  dark:text-gray-400   flex items-center gap-1 transition-colors"
                  >
                    {expandedDescription ? (
                      <>
                        Show less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 