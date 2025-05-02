import React from 'react'
import Image from 'next/image'
import img from '/public/auth/hero.png'
import carterlogo from '/public/logo.png'
import Link from 'next/link'

interface TemplateProps{
  children: React.ReactNode;
}

const Template : React.FC<TemplateProps> = ({children}) => {
  return (
    <main className="flex h-screen w-full relative">
      {/* Carter Logo Top Left */}
      <Link href="/" className="absolute top-6 left-6 z-30 flex items-center gap-2 select-none">
        <Image src={carterlogo} alt="logo" className="w-10 h-10" />
        <span className="font-semibold text-gray-400 hover:text-gray-300 text-xl">Carter</span>
      </Link>
      {/* Left: Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-b from-brand-bg via-brand-bg to-[#1C1C1C]">
        <div className="w-full max-w-md p-6">{children}</div>
      </div>
      {/* Right: Image with overlay, hidden on small screens */}
      <div
        className="hidden md:flex w-1/2 h-full relative items-center justify-center overflow-hidden"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        <Image
          src={img}
          alt="Auth Hero"
          fill
          priority
          draggable={false}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <span className="text-white text-3xl md:text-5xl font-bold tracking-widest select-none">GO BEYOND</span>
        </div>
      </div>
    </main>
  )
}

export default Template