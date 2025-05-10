"use client"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-200 transition-colors">{title}</h1>
        {description && (
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 dark:text-gray-400 transition-colors">{description}</p>
        )}
      </div>
      <Button 
        variant="ghost" 
        asChild
        className="self-start sm:self-auto hover:bg-purple-100 dark:hover:bg-purple-500/20 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white rounded-full transition-all duration-200"
      >
        <button onClick={() => window.history.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </button>
      </Button>
    </div>
  )
}
