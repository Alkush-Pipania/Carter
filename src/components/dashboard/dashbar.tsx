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
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Loader from '../global/Loader';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import carterlogo from "../../../public/logo.png"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Mainmenu from './Mainmenu';



interface UserDetail {
  username: string;
  email: string;
}




const Dashbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const toggleBox = () => setIsOpen(!isOpen);
  const router = useRouter();
  const [mainmenu, Setmainmenu] = useState(false);
  const [userdetail, Setuserdetail] = useState<UserDetail | null>(null);




  const session = useSession();

  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/userdetail`, {
          params: { email: session.data?.user?.email || '' },
        });
        Setuserdetail(res.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session?.data?.user?.email) {
      fetchUserData();
    } else {
      console.warn("Email is not available in the session data.");
    }
  }, [session]);











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
                  <div className="flex items-center justify-start gap-4">
                    <h3 className="text-center text-xl">Url: </h3>
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://"
                              className="w-full bg-Neutrals/neutrals-10 outline-none px-1 py-1 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              className=" bg-Neutrals/neutrals-10 outline-none px-1 py-1 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                  {/* Save Button */}
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 self-start rounded"
                    disabled={isLoading}
                  >
                    {!isLoading ? 'Submit' : <Loader />}
                  </button>
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
          <div onClick={async () => {
            router.push('http://localhost:3000/');
            signOut();

          }} className='bg-primary-purple/primary-purple-400 px-3  py-1 rounded-full hidden sm:block
           hover:border-x-primary-purple/primary-purple-500
           hover:bg-primary-purple/primary-purple-500 duration-75 ease-in-out text-gray-200 hover:text-gray-100 cursor-pointer'>
            <h3 >Sign Out</h3>
          </div>

          <button onClick={
            () => {
              Setmainmenu(true)
            }
          } >
            <svg
              className='h-[14px]'
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32.055 32.055"
              stroke="#ffffff"
              transform="rotate(90)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path>
                </g>
              </g>
            </svg>

          </button>
          {mainmenu && (
            <motion.div
              className="overlay backdrop-blur  "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ImCross onClick={() => {
                Setmainmenu(false)
              }}
                className='absolute top-0 m-2 right-0 font-bold text-3xl text-purple-600 hover:text-purple-500 cursor-pointer' />
              <Mainmenu
                username={userdetail?.username || ''}
                email={userdetail?.email || ''}
              />
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashbar;
