"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
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
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Rightmenu from './rightmenu';
import { Loader2Icon, Plus } from 'lucide-react';
import { AddLink } from '@/server/actions/links';
import { useFolderlinkStore, useLinkStore } from '@/lib/store/links';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import dotenv from 'dotenv';
dotenv.config();




const Dashbar = (
) => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const toggleBox = () => setIsOpen(!isOpen);
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>();
  const [dataloading, setdataLoading] = useState(false);
  const pathname = usePathname();
  const pathsToHide = ['/trash','links'];
  const hideFeature = pathsToHide.some(path => pathname?.includes(path));


  React.useEffect(() => {
    function handleRouteChange() {
      const pathId = pathname.split('/').pop();
      if (pathId == 'dashboard') {
        setActiveRoute('global')
      } else {
        setActiveRoute(pathId);
      }
    }
    handleRouteChange();
  }, [pathname]);






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
          const response = await axios.post(process.env.NEXT_PUBLIC_GEMINI_BACKEND_URL, {
            Prompt: url,
          });
          const { title, description } = response.data;
          setValue('title', title);
          setValue('description', description);
          setdataLoading(false)
          	
        } else {
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
      const res = await AddLink(url, title, description, userId, activeRoute);
      // Add the new link to the store
      const newLink = {
        secret_Id: res.data.secret_Id,
        imgurl: res.data.imgurl,
        links: url,
        title: title,
        description: description,
      };
      if (activeRoute === "global") {
        useLinkStore.getState().addLink(newLink);
      } else {
        useFolderlinkStore.getState().addfolderLink(parseInt(activeRoute, 10), newLink);
      }
      form.reset();
      setIsOpen(false);
    } catch (error) {
      setErrorMessage("Failed to add link");
    }
  };

  return (
    <div className='w-full border-b border-gray-500/30 backdrop-blur-md z-10 h-16 sm:h-20 bg-brand/brand-dark/60 flex items-center justify-between px-3 sm:px-6 sticky top-0'>
      <Link href="/dashboard" className="flex items-center">
        <Image src={carterlogo} alt='logo' className='w-10 sm:w-[50px] transition-all duration-200' />
      </Link>

      <div className='flex items-center gap-3 sm:gap-6'>
        {!hideFeature && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button 
                className='flex text-slate-200 hover:text-white font-medium text-sm sm:text-base 
                         relative group px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500 
                         hover:bg-purple-600 active:bg-purple-700 rounded-full 
                         transition-all duration-200'
              >
                <div className='absolute inset-0 bg-purple-500/30 blur-lg rounded-full 
                              transition-all duration-200 group-hover:bg-purple-500/40'></div>
                <div className='relative flex items-center gap-1.5'>
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add</span>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-brand/brand-dark border-brand/brand-primaryblue">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">Add New Link</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the URL of the website you want to save
                </DialogDescription>
              </DialogHeader>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col justify-center gap-4">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <div className='flex items-center justify-start gap-3 sm:gap-4'>
                            <FormLabel className='text-base sm:text-xl whitespace-nowrap'>URL:</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://"
                                className="w-full bg-Neutrals/neutrals-10 outline-none px-2 py-1.5 rounded-xl text-sm sm:text-base"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                  <div className='flex justify-between items-center mt-4'>
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
            </DialogContent>
          </Dialog>
        )}

        <div className='flex items-center gap-3 sm:gap-6'>
          {!hideFeature && (
            <div className='relative group'>
              <div className='absolute inset-0 bg-purple-500/20 blur-md rounded-full transition-all duration-200 group-hover:bg-purple-500/30'></div>
              <div className='relative bg-Neutrals/neutrals-10 flex items-center h-9 sm:h-10 sm:w-[200px] w-[140px] justify-start px-3 rounded-full transition-all duration-200 group-hover:bg-opacity-90'>
                <Image src={search} alt='search' className='w-4 sm:w-5 opacity-70 group-hover:opacity-100 transition-opacity' />
                <input 
                  placeholder='Search' 
                  onChange={(event) => {
                    event.preventDefault();
                    router.push(`${pathname}?search=${event.target.value}`);
                  }} 
                  className='bg-transparent ml-2 outline-none focus:outline-none w-full text-sm sm:text-base placeholder-gray-400'
                />
              </div>
            </div>
          )}

          <Rightmenu userid={userId} />
        </div>
      </div>
    </div>
  );
};

export default Dashbar;
