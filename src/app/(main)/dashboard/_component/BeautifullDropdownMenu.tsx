import * as React from "react"
import { MoreHorizontal, Edit, Share, Cloud, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface BeautifulDropdownMenuProps {
  onEdit: () => void
  onShare: () => void
  onCloud: () => void
  onDelete: () => void
}

export function BeautifulDropdownMenu({ onEdit, onShare, onCloud, onDelete }: BeautifulDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 hover:bg-transparent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] text-foreground border border-border rounded-lg shadow-lg"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
           onShare();
          }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <Share className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem
         onClick={(e) => {
          e.stopPropagation()
          onCloud();
        }}
          className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <Cloud className="mr-2 h-4 w-4" />
          <span>Cloud</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-border" />
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center px-3 py-2 text-sm cursor-pointer text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Move to Trash</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
