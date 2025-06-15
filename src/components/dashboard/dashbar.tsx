"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import carterlogo from "/public/carter/logo.png"
import { usePathname, useRouter } from 'next/navigation';
import { AddLinkDialog } from './AddLinkDialog';
import { Search, User, LogOut, Settings, Github, Moon, Sun, Key } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

// Custom styles for dropdown items
const dropdownItemStyles = {
  item: "cursor-pointer dark:!text-gray-200 !text-slate-700 hover:!text-slate-900 dark:hover:!text-white hover:bg-slate-100 dark:hover:bg-zinc-700 focus:bg-slate-100 dark:focus:bg-zinc-700 transition-colors",
  link: "flex w-full items-center gap-2 text-inherit",
  icon: "h-4 w-4 text-current"
};

const Dashbar = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>();
  const pathname = usePathname();
  const pathsToHide = ['/trash', 'links'];
  const {setTheme , theme} =  useTheme();
  // console.log(theme)
  
  const hideFeature = pathsToHide.some(path => pathname?.includes(path));
  const userData = useAppSelector((state) => state.userdetail.data);
  const userLoading = useAppSelector((state) => state.userdetail.loading);

  useEffect(() => {
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


  return (
    <div className='w-full border-b border-slate-200 dark:border-gray-500/30 backdrop-blur-md z-10 h-16 sm:h-20 bg-white/95 dark:bg-zinc-900/95 flex items-center justify-between px-3 sm:px-6 sticky top-0 transition-colors'>

      <Link href="/dashboard" className="flex items-center">
        <Image src={carterlogo} alt='logo' className='w-10 sm:w-[50px] transition-all duration-200' />
      </Link>

      <div className='flex items-center gap-3 sm:gap-6'>
        {!hideFeature && (
          <AddLinkDialog activeRoute={activeRoute} />
        )}

        <div className='flex items-center gap-3 sm:gap-6'>
          {!hideFeature && (
            <div className='relative group'>
              <div className='absolute inset-0 bg-slate-100 dark:bg-zinc-800 blur-md rounded-full transition-all duration-200 group-hover:bg-slate-200/50 dark:group-hover:bg-zinc-700/30'></div>
              <div className='relative bg-slate-100 dark:bg-zinc-800 flex items-center h-9 sm:h-10 sm:w-[200px] w-[140px] justify-start px-3 rounded-full transition-all duration-200 group-hover:bg-opacity-90'>
                <Search className='text-slate-500 dark:text-gray-400 transition-colors' />
                <input
                  placeholder='Search'
                  onChange={(event) => {
                    event.preventDefault();
                    router.push(`${pathname}?search=${event.target.value}`);
                  }}
                  className='bg-transparent ml-2 outline-none focus:outline-none w-full text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 transition-colors'
                />
              </div>
            </div>
          )}

          {/* User Profile Dropdown (Shadcn) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-200 hover:ring-2 hover:ring-slate-300 dark:hover:ring-gray-400/30 focus:outline-none">
                {userLoading ? (
                  <div className='animate-pulse bg-slate-200 dark:bg-zinc-700 w-full h-full rounded-full transition-colors'></div>
                ) : userData?.image ? (
                  <Image
                    src={userData.image}
                    alt='Profile'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='bg-slate-200 dark:bg-zinc-800 w-full h-full rounded-full flex items-center justify-center transition-colors'>
                    <User className='text-slate-500 dark:text-gray-400 w-5 h-5 sm:w-6 sm:h-6 transition-colors' />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 transition-colors">
              <style jsx global>{`
                .dark .dropdown-item:hover,
                .dark .dropdown-item:hover * {
                  color: white !important;
                }
                .dropdown-item:hover,
                .dropdown-item:hover * {
                  color: black !important;
                }
              `}</style>

              <DropdownMenuItem asChild className={`dropdown-item ${dropdownItemStyles.item}`}>
                <Link href="/setting" className={dropdownItemStyles.link}>
                  <User className={dropdownItemStyles.icon} />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className={`dropdown-item ${dropdownItemStyles.item}`}>
                <Link href="/setting" className={dropdownItemStyles.link}>
                  <Settings className={dropdownItemStyles.icon} />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`dropdown-item ${dropdownItemStyles.item}`}>
                <Link href="/find" className={dropdownItemStyles.link}>
                  <Key className={dropdownItemStyles.icon} />
                  Secret Key ?
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`dropdown-item ${dropdownItemStyles.item}`}>
                <a href="https://github.com/Alkush-Pipania/Carter" target="_blank" rel="noopener noreferrer" className={dropdownItemStyles.link}>
                  <Github className={dropdownItemStyles.icon} />
                  GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={`dropdown-item ${dropdownItemStyles.item}`}>
                <button onClick={() => setTheme(`${theme === 'dark' ? 'light' : 'dark'}`)} className={dropdownItemStyles.link}>
                  {theme === 'dark' ? (
                    <><Sun /> light</>
                  ) : (
                    <><Moon /> dark</>
                  )}
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-zinc-700 transition-colors" />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.clear()
                  signOut({ callbackUrl: '/signin' });

                }}
                className={`dropdown-item ${dropdownItemStyles.item}`}
              >
                <LogOut className={dropdownItemStyles.icon} style={{ marginRight: '0.5rem' }} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Dashbar;
