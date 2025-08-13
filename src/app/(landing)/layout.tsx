
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
    <div className="min-h-screen w-full relative bg-black">
      {/* Violet Storm Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }}
      />
      
      {/* Your Content/Components */}
      <div className="relative z-10">
        <Navbar/>
        {children}
      </div>
    </div>
  )
}

export default HomePageLayout