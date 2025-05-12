
import { auth } from '@/auth';
import Navbar from '@/components/landing/Navbar'
import { redirect } from 'next/navigation';
import React from 'react'

const HomePageLayout = async({children} : {children : React.ReactNode}) => {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }
  return (
    <main>
      <Navbar/>
      {children}
      </main>
  )
}

export default HomePageLayout