"use client"

import { useState } from "react"
import { Link, Loader2, Construction } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface ImportLinksDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ImportLinksDialog({ open, onOpenChange }: ImportLinksDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#121212] border-[#2a2a2a] text-white max-h-[90vh] w-[95vw] sm:w-auto top-[5%] sm:top-[50%] translate-y-0 sm:translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Link className="h-5 w-5 text-purple-400" />
            Import Links
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This feature is coming soon!
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex flex-col items-center justify-center gap-4">
          <Construction className="h-12 w-12 text-purple-400" />
          <div className="text-center">
            <p className="text-lg font-medium text-purple-400">Feature Under Development</p>
            <p className="text-sm text-gray-400 mt-2">
              Our team is working hard to bring you this feature. Stay tuned for updates!
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 