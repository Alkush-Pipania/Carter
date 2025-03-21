"use client"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
interface PageHeaderProps {
  title: string
  description?: string
  backHref: string
}

export function PageHeader({ title, description, backHref }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-200">{title}</h1>
        {description && (
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">{description}</p>
        )}
      </div>
      <Button 
        variant="ghost" 
        asChild
        className="self-start sm:self-auto hover:bg-purple-500/20 text-slate-300 hover:text-white rounded-full transition-all duration-200"
      >
        <button onClick={() => window.history.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </button>
      </Button>
    </div>
  )
}
