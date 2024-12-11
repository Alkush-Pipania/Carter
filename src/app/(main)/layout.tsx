"use client"
import Dashbar from '@/components/dashboard/dashbar'
import { Toaster } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'
import React from 'react'


const HomePageLayout = ({children} : {children : React.ReactNode}) => {
  const pathname = usePathname();
  const hideDashbar = pathname?.includes("/edit") ;
  return (
    <main className=' '>
      {!hideDashbar && <Dashbar />}
      
      {children}
      <Toaster/>
      </main>
     
  )
}

export default HomePageLayout