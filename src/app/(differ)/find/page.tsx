"use client";
import Loader from '@/components/global/Loader';
import Retrive from '@/components/global/retrivecom';
import TitleSection from '@/components/landing-page/title-section';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SecretinputSchema } from '@/lib/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as z from "zod";

const Find = () => {
  const [arewedone, setAreWeDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null); 

  const form = useForm<z.infer<typeof SecretinputSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SecretinputSchema),
    defaultValues: { secret: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof SecretinputSchema>> = async (FormData) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/find`, {
        params: { secretkey: FormData.secret },
      });
      setResponse(response.data); 
      
      setAreWeDone(true);
    } catch (error: any) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data);
        console.error("Status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(response)

  

  return (
    <>
      <section
        className='overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center'
      >
        <div className='md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40' />

        <div>
          <TitleSection pill='❓ Your Secret Code'
            title={`Enter Your Secret Code to Unlock!`}
          />

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center my-10 gap-y-5'>
              <FormField disabled={isLoading} control={form.control}
                name='secret'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='text' placeholder='secret code?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='p-6' type='submit' disabled={isLoading}>
                {!isLoading || !loading ? 'Get carter' : <Loader />}
              </Button>
            </form>
          </FormProvider>
        </div>
        <section className='sm:px-6 grid grid-cols-1 gap-4 mt-10 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {arewedone && response && response.linkform.length > 0 && (
            response.linkform.map((item : any )=>(
             <Retrive url={item.links} imgurl={item.imgurl} description={item.description} title={item.title} />
            ))
            
          )}
        </section>
      </section>
    </>
  );
}

export default Find;
