"use client"
import Dashbar from '@/components/dashboard/dashbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import logo from '/public/carter/logo.png'
import React from 'react'
import { Sidebar } from "@/components/dashboard/sidebar-component/Sidebar"
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'
import Link from 'next/link'


const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Dashbar />
      <main className='mt-10 relative'>
        <SidebarProvider className="m-0 p-0">
          <div className="flex">
            <Sidebar />
            <SidebarTrigger className='md:hidden z-50 fixed left-0' />
          </div>
          {children}
        </SidebarProvider>

        {/* Floating Chat Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/ask">
                <Button
                  className="group fixed bottom-8 right-8 w-16 h-16 rounded-full p-0 bg-white/90 dark:bg-zinc-800/90 shadow-lg hover:shadow-xl hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300 border border-gray-200 dark:border-zinc-700 hover:scale-105"
                  variant="ghost"
                >
                  <svg viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-900 dark:text-white transition-all duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                    <path d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z" />
                  </svg>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[250px] p-3">
              <p className="text-sm">
                Need to find something? Just ask me in natural language and I&apos;ll help you search through your content.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </main>
    </>
  )
}

export default HomePageLayout