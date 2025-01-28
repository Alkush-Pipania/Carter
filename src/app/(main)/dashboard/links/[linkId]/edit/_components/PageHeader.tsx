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
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
      </div>
      <Button variant="ghost" asChild>
        <button onClick={()=> window.history.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </button>
      </Button>
    </div>
  )
}
