"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function LinkCardLoading() {
  return (
    <Card className="w-full bg-[#121212] shadow-2xl hover:shadow-sm shadow-purpleShadow sm:max-w-[321px] h-[227px] flex flex-col p-2 rounded-lg border-0">
      {/* Image skeleton with darker background */}
      <div className="w-full h-[150px] overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-800/50" />
      </div>
      
      <div className="flex flex-col gap-y-1 mt-1 px-2 w-full">
        {/* URL and cloud button row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[60%] bg-gray-800/50" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-800/50" />
        </div>
        
        {/* Title and action button row */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[70%] bg-gray-800/50" />
          <Skeleton className="h-6 w-6 rounded-md bg-gray-800/50" />
        </div>
      </div>
    </Card>
  )
}
