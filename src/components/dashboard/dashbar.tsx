"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import search from '../../../public/Search.png';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { AddLinkSchema } from '@/lib/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import carterlogo from "../../../public/logo.png"
import { usePathname, useRouter } from 'next/navigation';
import Rightmenu from './rightmenu';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addGlobalLink } from '@/store/thunks/userLinksGlobalThunk';
import { addFolderLink } from '@/store/thunks/folderLinksThunk';
import { toast } from "sonner"
import dotenv from 'dotenv';
import { AddLinkDialog } from './AddLinkDialog';
import InteractivePacManLogo from './extras/dynamiclogo';
import { useIsMobile } from '@/hooks/use-mobile';
dotenv.config();

const Dashbar = (
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>();
  const pathname = usePathname();
  const pathsToHide = ['/trash','links'];
  const hideFeature = pathsToHide.some(path => pathname?.includes(path));
  const dispatch = useDispatch<AppDispatch>();

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
    defaultValues: { url: '' },
  });

  const isLoading = form.formState.isSubmitting;
  const userId = localStorage.getItem('userId');

  const { watch,  reset } = form;

  const onSubmit: SubmitHandler<z.infer<typeof AddLinkSchema>> = async (FormData) => {
    const { url } = FormData;
    setErrorMessage("");

    const toastId = toast.loading("Adding Link to Carter", {
      description: "Processing your link...",
    });

    try {
      setIsOpen(false);
      
      if (activeRoute === "global") {
        await dispatch(addGlobalLink({ url, userId: userId?.toString() || null })).unwrap();
      } else if (activeRoute) {
        await dispatch(addFolderLink({ 
          url, 
          userId: userId?.toString() || null,
          folderId: parseInt(activeRoute)
        })).unwrap();
      }

      toast.success("Success!", {
        id: toastId,
        description: "Link has been added to Carter",
      });

      form.reset();
      setIsOpen(false);

    } catch (error: any) {
      toast.error("Error", {
        id: toastId,
        description: error.message || "Failed to add link. Please try again.",
      });
      console.log(error);
    }
  };
  const isMobile = useIsMobile();

  return (
    <div className='w-full border-b border-gray-500/30 backdrop-blur-md z-10 h-16 sm:h-20 bg-brand/brand-dark/60 flex items-center justify-between px-3 sm:px-6 sticky top-0'>
      {isMobile ? (
<Link href="/dashboard" className="flex items-center">
        <Image src={carterlogo} alt='logo' className='w-10 sm:w-[50px] transition-all duration-200' />
        
      </Link>
      ):(
<Link href="/dashboard" className="flex items-center">
        <div className="w-10 sm:w-[50px] h-10 sm:h-[50px] flex items-center justify-center transition-all duration-200">
          <InteractivePacManLogo />
        </div>
      </Link>
      )}
      
      <div className='flex items-center gap-3 sm:gap-6'>
        {!hideFeature && (
          <AddLinkDialog activeRoute={activeRoute} />
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
