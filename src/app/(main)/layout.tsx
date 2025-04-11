
import Dashbar from '@/components/dashboard/dashbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import logo from '@/../public/logo.png'
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
            <Sidebar/>
            <SidebarTrigger className='md:hidden fixed left-0'/>
          </div>
          {children}
        </SidebarProvider>

        {/* Floating Chat Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/ask">
                <Button
                  className="fixed bottom-8 right-8 w-14 h-14 rounded-full p-0 shadow-lg shadow-primary-purple/primary-purple-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  variant="default"
                >
                  <Image
                    src={logo}
                    alt="Carter AI"
                    width={25}
                    height={30}
                    className="rounded-full"
                  />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[250px] p-3">
              <p className="text-sm">
                Need to find something? Just ask me in natural language and I'll help you search through your content.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </main>
    </>
  )
}

export default HomePageLayout