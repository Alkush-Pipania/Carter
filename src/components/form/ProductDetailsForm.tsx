"use client"
import { useToast } from '@/hooks/use-toast';
import { AddLinkSchema } from '@/lib/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { updatelinkform } from '@/server/actions/links';


type producttype = {
  title: string;
  links: string;
  description: string;
  secret_Id : string;
}

export function ProductDetailsForm({ product  }: { product: producttype  }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof AddLinkSchema>>({
    resolver: zodResolver(AddLinkSchema),
    defaultValues: product ? { title: product.title , description : product.description ,  url : product.links } : {
      title: "",
      url: "",
      description: ""
    }

  })

  async function onSubmit(values: z.infer<typeof AddLinkSchema>) {
    const data = await updatelinkform(product.secret_Id , values)
    if(data?.message){
      toast({
        title : data.error ? "Error" : "Success",
        description : data.message,
        variant : data.error ? "destructive" : "default"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-6 w-full flex-col'>
        <div className='grid gap-6 w-full grid-cols-1 lg:grid-cols-2'>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the full path
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your link title </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Description</FormLabel>
            <FormControl>
              <Textarea className="min-h-20 resize-none" {...field} />
            </FormControl>
            <FormDescription>
              description of the link you have saved
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />
        <div className='self-end'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}