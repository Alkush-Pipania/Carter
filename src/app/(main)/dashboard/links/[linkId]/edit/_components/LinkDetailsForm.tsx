"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>A descriptive title for your link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The full URL of your link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea  className="resize-none" {...field} />
              </FormControl>
              <FormDescription>A short description of your link (max 500 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Link"}
        </Button>
      </form>
    </Form>
  )
}
