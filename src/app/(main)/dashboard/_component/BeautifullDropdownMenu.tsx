"use client"
import * as React from "react"
import { MoreHorizontal, Share, Cloud, Trash2 } from "lucide-react"

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
  onCloud: () => void
  onDelete: () => void
}

export function BeautifulDropdownMenu({ onShare, onCloud, onDelete }: BeautifulDropdownMenuProps) {
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
          onClick={(e) => {
            e.stopPropagation()
            onShare();
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 focus:bg-zinc-800/50 focus:text-zinc-100"
        >
          <Share className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onCloud();
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 focus:bg-zinc-800/50 focus:text-zinc-100"
        >
          <Cloud className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Cloud</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-zinc-800/50" />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onDelete();
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Move to Trash</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
