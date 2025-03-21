"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { updateLinkDetails } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { AddLinkSchema } from "@/lib/types/zod"
import { updatelinkform } from "@/server/actions/links"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  description: z.string().max(500, "Description must be 500 characters or less"),
})

type FormValues = z.infer<typeof formSchema>

type producttype = {
  title: string;
  links: string;
  description: string;
  secret_Id : string;
}

export function LinkDetailsForm({ initialData }: {initialData : producttype}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

   const form = useForm<z.infer<typeof AddLinkSchema>>({
      resolver: zodResolver(AddLinkSchema),
      defaultValues: initialData ? { title: initialData.title , description : initialData.description ,  url : initialData.links } : {
        title: "",
        url: "",
        description: ""
      }
  
    })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    try {
      const res = await updatelinkform(initialData.secret_Id , data)
      toast({
        title: "Link updated",
        description: "Your link details have been successfully updated.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base text-slate-200">Title</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-Neutrals/neutrals-10 border-gray-500/30 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-200"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm text-gray-400">
                  A descriptive title for your link
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base text-slate-200">URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      {...field} 
                      className="bg-Neutrals/neutrals-10 border-gray-500/30 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-200 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(field.value);
                        toast({
                          title: "Copied!",
                          description: "URL copied to clipboard",
                          variant: "default",
                        });
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-purple-500/20 rounded-full transition-colors duration-200"
                    >
                      <Copy className="h-4 w-4 text-gray-400 hover:text-purple-400" />
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs sm:text-sm text-gray-400">
                  The full URL of your link
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base text-slate-200">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    className="min-h-[120px] sm:min-h-[150px] bg-Neutrals/neutrals-10 border-gray-500/30 focus:border-purple-500/50 focus:ring-purple-500/20 text-slate-200 resize-none
                      scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent
                      hover:scrollbar-thumb-purple-500/70" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm text-gray-400">
                  A short description of your link (max 500 characters)
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm text-red-400" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
          >
            {isLoading ? "Updating..." : "Update Link"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
