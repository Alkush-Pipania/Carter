"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import docu from '../../../public/Document add.png';
import Link from 'next/link';
import search from '../../../public/Search.png';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { AddLinkSchema } from '@/lib/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Loader from '../global/Loader';
import axios from 'axios';
import carterlogo from "../../../public/logo.png"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Rightmenu from './rightmenu';
import { Loader2Icon } from 'lucide-react';
import { Button } from '../ui/button';



interface UserDetail {
  username: string;
  email: string;
}




const Dashbar = (
) => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const toggleBox = () => setIsOpen(!isOpen);
  const router = useRouter();

  const [dataloading, setdataLoading] = useState(false);








  const [searchQuery, setSearchQuery] = useState('');















  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [boxRef]);

  const form = useForm<z.infer<typeof AddLinkSchema>>({
    mode: 'onChange',
    resolver: zodResolver(AddLinkSchema),
    defaultValues: { url: '', title: '', description: '' },
  });

  const isLoading = form.formState.isSubmitting;
  // @ts-ignore
  const userId = session.data?.user.id;

  const { watch, setValue, setError, clearErrors, reset } = form;
  const url = watch("url");

  const fetchData = async (url: string) => {
    try {
      const validationResult = form.trigger("url");
      validationResult.then(async (isValid) => {
        if (isValid) {
          clearErrors('url')
          setdataLoading(true)
          const response = await axios.post('https://gemini.alkush.workers.dev/getdata', {
            prompt: url,
          });
          const { title, description } = response.data.data;
          setValue('title', title);
          setValue('description', description);
          setdataLoading(false)

        } else {
          // URL is invalid; show a validation error
          setError("url", { type: "manual", message: "Invalid URL format" });
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

 


  const onSubmit: SubmitHandler<z.infer<typeof AddLinkSchema>> = async (FormData) => {
    const { url, title, description } = FormData;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/addLink`, {
        url,
        title,
        description,
        userId,
      }).then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.error(error.response ? error.response.data : error.message);
      });
      form.reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      setErrorMessage("Failed to add link");
    }



  };

  return (
    <div className='w-[100%] my-3 flex justify-between items-start px-2'>
      <Link href="/" >

        <Image src={carterlogo} alt='logo' className='w-[50px]' />
      </Link>
      <div className='flex flex-col-reverse gap-y-5 sm:gap-y-0 sm:mr-12 mr-8 sm:items-center items-end justify-center sm:flex-row sm:justify-center gap-x-5'>
        <button onClick={toggleBox} className='flex text-sm items-center gap-1 p-2 border border-white rounded-full'>
          <Image src={docu} alt='add button' className='w-[21px]' />
          Add
        </button>
        <div className='absolute top-4 sm:right-36'>
          {isOpen && (
            <motion.div
              ref={boxRef}
              className="bg-brand/brand-dark border-8 z-10 rounded-3xl py-4 px-5 border-brand/brand-primaryblue"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Component */}
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                  {/* URL Input */}
                  <div className="flex flex-col justify-center  gap-4">

                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <div className='flex items-center justify-start  gap-4'>
                          <FormLabel className='text-center text-xl'>Url:</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://"
                              className="w-full bg-Neutrals/neutrals-10 outline-none px-1 py-1 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='bg-gray-500 w-fit px-2 rounded-full py-1'>
                      {dataloading ? <Loader2Icon className='w-6 h-6 bg-transparent text-white' /> : (<h3 onClick={() => fetchData(url)}
                        className='cursor-pointer'>✨Use AI
                      </h3>)}
                    </div>

                  </div>

                  {/* Title Input */}
                  <div className="flex items-center justify-start gap-4">
                    <h3 className="text-center text-xl">Title: </h3>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="title"
                              placeholder="Title of the link"
                              className="w-full  bg-Neutrals/neutrals-10 outline-none px-2 py-1 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description Input */}
                  <div className="flex  flex-col items-start justify-center gap-4">
                    <h3 className="text-center text-xl">Description:</h3>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              placeholder="Summary"
                              className=" bg-Neutrals/neutrals-10 resize-none outline-none px-1 py-1 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                  
                  <div className='flex justify-between items-center'>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 self-start rounded"
                    disabled={isLoading}
                  >
                    {!isLoading ? 'Submit' : <Loader />}
                  </button>
                  <h3 onClick={() => reset()} 
                  className='text-gray-400 underline underline-offset-4 hover:text-gray-300 active:text-gray-500 cursor-pointer'>
                    clear
                  </h3>
                  </div>
                </form>
              </FormProvider>
            </motion.div>
          )}
        </div>
        <div className='flex justify-center items-center gap-7'>
          <div className='bg-Neutrals/neutrals-10 flex items-center w-[171px] justify-start p-2 gap-2 rounded-full'>
            <Image src={search} alt='search button' className='w-[21px]' />
            <input placeholder='Search' onChange={(event) => {
              const query = event.target.value;
              setSearchQuery(event.target.value);
            }} className='bg-transparent outline-none focus:outline-none w-full' />

          </div>
          <div onClick={() => {

            signOut();

            router.push('/signin');

          }} className='bg-primary-purple/primary-purple-400 px-3  py-1 rounded-full hidden sm:block
           hover:border-x-primary-purple/primary-purple-500
           hover:bg-primary-purple/primary-purple-500 duration-75 ease-in-out text-gray-200 hover:text-gray-100 cursor-pointer'>
            <h3 >Sign Out</h3>
          </div>

          <Rightmenu userid={userId} />


        </div>
      </div>
    </div>
  );
};

export default Dashbar;
