"use client"

import { useState, useRef, useCallback } from "react"
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Image from "next/image"

// Function to get center crop with 1:1 aspect ratio
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

interface ImageCropDialogProps {
  open: boolean
  onClose: () => void
  onComplete: (croppedFile: File, previewUrl: string) => void
  imageSrc: string
  selectedFile: File | null
}

export function ImageCropDialog({
  open,
  onClose,
  onComplete,
  imageSrc,
  selectedFile
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>()
  const [isCompletingCrop, setIsCompletingCrop] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Handle image load - set initial crop
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
    imgRef.current = e.currentTarget
  }, [])

  // Process the crop when user clicks Apply
  const completeCrop = useCallback(async () => {
    if (!imgRef.current || !crop || !selectedFile) return

    setIsCompletingCrop(true)
    
    try {
      // Create a canvas to draw the cropped image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('No 2d context')
      }

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height
      
      const pixelRatio = window.devicePixelRatio
      
      canvas.width = crop.width * scaleX * pixelRatio
      canvas.height = crop.height * scaleY * pixelRatio
      
      // Clear the canvas with a transparent background (important for PNGs)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.scale(pixelRatio, pixelRatio)
      ctx.imageSmoothingQuality = 'high'
      
      const cropX = crop.x * scaleX
      const cropY = crop.y * scaleY
      
      ctx.drawImage(
        imgRef.current,
        cropX,
        cropY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      )
      
      // Convert canvas to blob with proper quality options for the file type
      const blob = await new Promise<Blob>((resolve) => {
        const fileType = selectedFile.type;
        const quality = fileType === 'image/png' ? undefined : 0.95; // PNG uses lossless compression
        
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else throw new Error('Canvas to Blob conversion failed')
        }, fileType, quality)
      })
      
      // Create a new file from the blob
      const croppedFile = new File([blob], selectedFile.name, {
        type: selectedFile.type,
        lastModified: Date.now(),
      })
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(blob)
      
      // Call the completion handler with the cropped file and preview URL
      onComplete(croppedFile, objectUrl)
    } catch (error) {
      console.error('Error cropping image:', error)
      toast.error("Error", {
        description: "Failed to crop image."
      })
      onClose()
    } finally {
      setIsCompletingCrop(false)
    }
  }, [crop, imgRef, selectedFile, onComplete, onClose])

  return (
    <Dialog open={open} onOpenChange={(open) => !isCompletingCrop && !open && onClose()}>
      <DialogContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm w-[95%] max-w-md mx-auto transition-colors">
        <DialogHeader>
          <DialogTitle className="text-slate-800 dark:text-white transition-colors">Crop Image</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-gray-400 transition-colors">
            Adjust the crop to select the part of the image you want to use
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-auto py-4">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
              className="max-w-full"
              circularCrop
            >
              <Image 
                ref={imgRef}
                src={imageSrc} 
                alt="Crop preview" 
                onLoad={onImageLoad}
                className="max-w-full"
                width={400}
                height={400}
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-slate-200 dark:border-zinc-700 transition-colors"
            disabled={isCompletingCrop}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={completeCrop}
            disabled={!crop || isCompletingCrop}
          >
            {isCompletingCrop && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isCompletingCrop ? "Processing..." : "Apply Crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 