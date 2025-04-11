"use client"
import * as React from "react"
import { MoreHorizontal, Share, Cloud, Trash2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { moveToTrash } from "@/store/thunks/folderThunks"
import { useToast } from "@/hooks/use-toast"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface BeautifulDropdownMenuProps {
  onShare: () => void
  onDelete: () => void
  folderId?: string
  folderName?: string
  numberOfLinks?: number
}

export function BeautifulDropdownMenu({ 
  onShare, 
  onDelete, 
  folderId,
  folderName,
  numberOfLinks = 0
}: BeautifulDropdownMenuProps) {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { movingToTrash } = useAppSelector(state => state.trashFolder)
  
  const handleMoveToTrash = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Use the onDelete prop if no folder info is provided (backward compatibility)
    if (!folderId || !folderName || !session?.user?.id) {
      onDelete()
      return
    }
    
    try {
      const result = await dispatch(
        moveToTrash({
          userId: session.user.id,
          folderId,
          folderName,
          numberOfLinks
        })
      ).unwrap()
      
      if (!result.error) {
        toast({
          title: "Success",
          description: "Folder moved to trash",
          variant: "default",
        })
        
        // Navigate to dashboard if we're on the folder that was deleted
        const currentPath = window.location.pathname
        if (currentPath.includes(`/dashboard/folder/${folderId}`)) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move folder to trash",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 hover:bg-zinc-800/50 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-zinc-400 hover:text-zinc-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[180px] bg-brand/brand-dark/95 border border-zinc-800 rounded-lg shadow-lg backdrop-blur-sm"
      >
        <DropdownMenuItem
          // onClick={(e) => {
          //   e.stopPropagation()
          //   onCloud();
          // }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 focus:bg-zinc-800/50 focus:text-zinc-100"
        >
          <Cloud className="mr-2 h-4 w-4 text-zinc-400" />
          <span>manage</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onShare();
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 focus:bg-zinc-800/50 focus:text-zinc-100"
        >
          <Share className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-zinc-800/50" />
        <DropdownMenuItem
          onClick={handleMoveToTrash}
          disabled={folderId ? movingToTrash === folderId : false}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>{folderId && movingToTrash === folderId ? "Moving..." : "Move to Trash"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
