"use client";
import Loader from '@/components/global/Loader';
import Retrive from '@/components/global/retrivecom';
import TitleSection from '@/components/landing-page/title-section';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast"
import { SecretinputSchema } from '@/lib/types/zod';
import { retriveAnnonmousData } from '@/server/actions/links';
import { zodResolver } from '@hookform/resolvers/zod';
import { Folder, Link2, Loader2, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";

const formSchema = z.object({
  secretKey: z
    .string()
    .uuid({ message: "Invalid secret code" })
    .describe("A valid Secret code"),
  isFolder: z.boolean().default(false),
})

const Find = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null);
  const [arewedone, setAreWeDone] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretKey: "",
      isFolder: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await retriveAnnonmousData(values.secretKey, values.isFolder);
      if (res.error == false) {
        setResponse(res.data)
        setIsLoading(false);
        setAreWeDone(true);
        if(res.data.length > 0){
          toast({
            title: "Success",
            description: "Data found successfully",
          }); 
        } else {
          toast({
            title: "Error",
            description: "No data found"
          })
        }
      } else {
        setIsLoading(false)
        toast({
          title: "Error",
          description: "Data not found"
        })
      }
    } catch (e) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Data not found"
      })
    }
  }

  return (
    <div className="min-h-screen bg-brand/brand-dark py-10 px-4 sm:px-6 lg:px-8">
      <section className='w-full max-w-7xl mx-auto'>
        <div className='max-w-md mx-auto relative mb-16'>
          <div className='absolute w-full max-w-[500px] blur-[120px] rounded-full h-32 bg-brand/brand-primaryblue/50 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />

          <div className='space-y-8'>
            <TitleSection 
              pill='❓ Your Secret Code'
              title="Enter Your Secret Code to Unlock!"
            />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6 bg-brand/brand-dark/80 backdrop-blur-sm px-4 sm:px-6 py-6 rounded-2xl border border-gray-800/50 shadow-xl">
                <FormField
                  control={form.control}
                  name="secretKey"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base sm:text-lg font-medium">Secret Key</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your secret key" 
                          className="bg-background/5 border-gray-700 focus:border-purple-500 transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isFolder"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-gray-800 p-4 space-x-3 hover:border-gray-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        {field.value ? (
                          <Folder className="w-5 h-5 text-purple-500" />
                        ) : (
                          <User className="w-5 h-5 text-blue-500" />

                        )}
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {field.value ? 'Folder' : 'Whole account'}
                          </FormLabel>
                          <p className="text-sm text-gray-400">
                            {field.value ? 'Search for a collection of links' : 'Search for whole account'}
                          </p>
                        </div>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-purple-500"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors py-6 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : "Search"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {arewedone && (
          <section className="w-full">
            {response && response.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                {response.map((item: any, index: number) => (
                  <div key={index} className="w-full flex justify-center">
                    <Retrive
                      url={item.links}
                      imgurl={item.imgurl}
                      description={item.description}
                      title={item.title}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center text-gray-400 py-10'>
                No results found
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
}

export default Find;
