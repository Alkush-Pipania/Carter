"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import search from '../../../public/Search.png';
import carterlogo from "../../../public/logo.png"
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useIsMobile } from '@/hooks/use-mobile';
import InteractivePacManLogo from './extras/dynamiclogo';
import { AddLinkDialog } from './AddLinkDialog';
import { Search } from 'lucide-react';
const Dashbar = (
) => {

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





  const isMobile = useIsMobile();

  return (
    <div className='w-full border-b border-gray-500/30 backdrop-blur-md z-10 h-16 sm:h-20 bg-brand-bg flex items-center justify-between px-3 sm:px-6 sticky top-0'>
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
              <div className='absolute inset-0 bg-zinc-800 blur-md rounded-full transition-all duration-200 group-hover:bg-zinc-700/30'></div>
              <div className='relative bg-zinc-800 flex items-center h-9 sm:h-10 sm:w-[200px] w-[140px] justify-start px-3 rounded-full transition-all duration-200 group-hover:bg-opacity-90'>
              <Search className='text-gray-400' />
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
        </div>
      </div>
    </div>
  );
};

export default Dashbar;
