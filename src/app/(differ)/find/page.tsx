"use client";
import Loader from '@/components/global/Loader';
import Retrive from '@/components/global/retrivecom';
import TitleSection from '@/components/landing-page/title-section';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast"
import { SecretinputSchema } from '@/lib/types/zod';
import { retriveAnnonmousData } from '@/server/actions/links';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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
      console.log(values)
      const res = await retriveAnnonmousData(values.secretKey, values.isFolder);
      console.log(res)
      if (res.error == false) {
        setResponse(res.data)
        setIsLoading(false);
        setAreWeDone(true);
        if(res.data.length > 0){
         toast({
          title: "Success",
          description: "Data found successfully",
        }); 
        }else{
          toast({
            title: "Error",
            description: `Data not found`
          })
        }
        
      }else{
        setIsLoading(false)
        toast({
          title: "Error",
          description: `Data not found`
        })
      }

    } catch (e) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: `Data not found`
      })
    }
  }




  return (
    <>
      <section
        className='overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center'
      >
        <div className='md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40' />

        <div className='flex flex-col gap-y-8'>
          <TitleSection pill='❓ Your Secret Code'
            title={`Enter Your Secret Code to Unlock!`}
          />

          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-brand/brand-dark/50 px-2 py-4 rounded-md">
              <FormField
                control={form.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your secret key" {...field} />
                    </FormControl>
                    <FormDescription>Enter the secret key to retrieve your data.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFolder"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      {field.value == false ? (
                        <FormLabel className="text-base">Not a Folder</FormLabel>
                      ) : (
                        <FormLabel className="text-base">Folder</FormLabel>
                      )}

                      <FormDescription className='text-red-500'>Toggle if the secret key belongs to a folder.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value}
                        onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
        <section>
          {arewedone && (
            response && response.length > 0 ? (
              <div className='sm:px-6 grid grid-cols-1 gap-4 mt-10 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {response.map((item: any, index: number) => (
                  <Retrive
                    key={index} 
                    url={item.links}
                    imgurl={item.imgurl}
                    description={item.description}
                    title={item.title}
                  />
                ))}
              </div>
            ) : (
              <div className=''>Nothing to display ?</div>
            )
          )}
        </section>
      </section>
    </>
  );
}

export default Find;
