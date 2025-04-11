import { Skeleton } from "@/components/ui/skeleton"

export function LinkDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 my-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-2/3 bg-gray-700 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md bg-gray-700" />
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-28 bg-gray-700 rounded-md" />
          <Skeleton className="h-4 w-4 bg-gray-700 rounded-md" />
          <Skeleton className="h-4 w-24 bg-gray-700 rounded-md" />
        </div>
        <Skeleton className="h-5 w-full sm:w-3/4 bg-gray-700 rounded-md" />
      </div>
      
      <div className="rounded-lg border border-gray-700 p-4 space-y-3">
        <Skeleton className="h-6 w-1/3 bg-gray-700 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-700 rounded-md" />
          <Skeleton className="h-4 w-full bg-gray-700 rounded-md" />
          <Skeleton className="h-4 w-2/3 bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  )
}