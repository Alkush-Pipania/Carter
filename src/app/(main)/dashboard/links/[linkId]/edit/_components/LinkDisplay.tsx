"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { useToast } from '@/hooks/use-toast'

interface LinkDisplayProps {
  linkId: string
  userId: string
}

export function LinkDisplay({ linkId, userId }: LinkDisplayProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { data, loading, error } = useAppSelector((state) => state.linkContent)
  const [expandedBody, setExpandedBody] = useState(false)
  const [expandedDescription, setExpandedDescription] = useState(false)

  useEffect(() => {
    dispatch(getLinkContent({ id: linkId, user_id: userId }))
  }, [dispatch, linkId, userId])

  const handleMoveTo = () => {
    toast({
      title: "Move option selected",
      description: "This feature will be implemented soon",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Delete option selected",
      description: "This feature will be implemented soon",
    })
    // In future this would call a delete action
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 my-4">
        <div className="flex justify-between items-center">
          <div className="h-8 w-2/3 bg-gray-700 rounded-md"></div>
          <div className="h-9 w-9 rounded-md bg-gray-700"></div>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="h-4 w-28 bg-gray-700 rounded-md"></div>
            <div className="h-4 w-4 bg-gray-700 rounded-md"></div>
            <div className="h-4 w-24 bg-gray-700 rounded-md"></div>
          </div>
          <div className="h-5 w-full sm:w-3/4 bg-gray-700 rounded-md"></div>
        </div>
        
        <div className="rounded-lg border border-gray-700 p-4 space-y-3">
          <div className="h-6 w-1/3 bg-gray-700 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded-md"></div>
            <div className="h-4 w-full bg-gray-700 rounded-md"></div>
            <div className="h-4 w-2/3 bg-gray-700 rounded-md"></div>
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
  
  const truncatedBody = truncateText(bodyText, 300)
  const truncatedDescription = truncateText(descriptionText, 150)
  
  const showBodyViewMore = bodyText.length > 300
  const showDescriptionViewMore = descriptionText.length > 150

  return (
    <div className="space-y-6 my-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">{data.title}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-9 w-9 p-0 hover:bg-zinc-800/50 rounded-md"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5 text-zinc-400 hover:text-zinc-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[180px] bg-brand/brand-dark/95 border border-zinc-800 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <DropdownMenuItem
              onClick={handleMoveTo}
              className="flex items-center px-3 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 focus:bg-zinc-800/50 focus:text-zinc-100"
            >
              <Move className="mr-2 h-4 w-4 text-zinc-400" />
              <span>Move To</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-zinc-800/50" />
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-1.5 text-gray-400 text-sm">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500">Page created on</span>
          {formattedDate && (
            <>
              <span className="text-gray-500">•</span>
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
        <Card className="bg-gray-800/40 border-gray-700/30">
          <CardContent className="p-4">
            <div className="text-gray-300">
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
                    className="mt-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 flex items-center gap-1"
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
        <Card className="bg-gray-800/40 border-gray-700/30">
          <CardContent className="p-4">
            <div className="text-gray-300">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <div className="whitespace-pre-line">
                <p>{expandedDescription ? descriptionText : truncatedDescription}</p>
                
                {showDescriptionViewMore && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setExpandedDescription(!expandedDescription)}
                    className="mt-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 flex items-center gap-1"
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