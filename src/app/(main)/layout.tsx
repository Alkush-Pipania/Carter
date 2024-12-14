"use client"
import Dashbar from '@/components/dashboard/dashbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AppSidebar } from './dashboard/_component/Sidebar'


const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideDashbar = pathname?.includes("/edit");
  return (
    <main className=' '>
      {!hideDashbar && <Dashbar />}
      <SidebarProvider className="m-0 p-0">
      <div className="flex">
      <AppSidebar />
      <SidebarTrigger/>
      
      </div>
        {children}
      </SidebarProvider>
      
      <Toaster />
    </main>

  )
}

export default HomePageLayout