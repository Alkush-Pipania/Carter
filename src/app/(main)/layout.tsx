"use client"
import Dashbar from '@/components/dashboard/dashbar'
import React from 'react'
import { RecoilRoot } from 'recoil'

const HomePageLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='h-screen '>
      <Dashbar/>
      <RecoilRoot>
      {children}
    </RecoilRoot>
      </main>
  )
}

export default HomePageLayout