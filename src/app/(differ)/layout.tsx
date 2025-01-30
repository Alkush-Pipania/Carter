"use client"

import { Toaster } from '@/components/ui/toaster'
import React from 'react'


const HomePageLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <main >
      {children}
      <Toaster />
      </main>
  )
}

export default HomePageLayout