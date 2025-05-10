"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function LinkCardLoading() {
  return (
    <Card className="w-full dark:bg-card bg-white shadow-md hover:shadow-sm dark:shadow-zinc-800 shadow-zinc-200 sm:max-w-[321px] h-[227px] flex flex-col p-2 rounded-lg border-0 transition-all duration-200">
      {/* Image skeleton with proper light/dark mode */}
      <div className="w-full h-[150px] overflow-hidden">
        <Skeleton className="w-full h-full dark:bg-muted/70 bg-slate-100" />
      </div>
      
      <div className="flex flex-col gap-y-1 mt-1 px-2 w-full">
        {/* URL and cloud button row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[60%] dark:bg-muted/70 bg-slate-100" />
          <Skeleton className="h-6 w-6 rounded-full dark:bg-muted/70 bg-slate-100" />
        </div>
        
        {/* Title and action button row */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[70%] dark:bg-muted/70 bg-slate-100" />
          <Skeleton className="h-6 w-6 rounded-md dark:bg-muted/70 bg-slate-100" />
        </div>
      </div>
    </Card>
  )
}
