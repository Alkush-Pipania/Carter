"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import img from '/public/carter/hero.png'
import carterlogo from '/public/carter/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Turnstile } from 'next-turnstile'
import Loader from '@/components/common/Loader'
import Head from 'next/head'

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const {status}= useSession();
  const [isLoading, setIsLoading] = React.useState(true);
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const turnstileRef = useRef<string>();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId || status === "authenticated") {
      router.push('/dashboard');
    } 
    else {
      setIsLoading(false);
    }
  }, [router, status]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
    <Head>
    <title>Sign Up</title>
        <meta name="description" content="Create an account to save your ideas and links" />
        <link rel="canonical" href="https://www.carter.fun/signin" />
    </Head>
    <main className="flex h-screen w-full relative">
      {/* Carter Logo Top Left */}
      <Link href="/" className="absolute top-6 left-6 z-30 flex items-center gap-2 select-none">
        <Image src={carterlogo} alt="logo" className="w-10 h-10" />
        <span className="font-semibold text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300 text-xl transition-colors">Carter</span>
      </Link>
      
      {/* Turnstile verification */}
      {turnstileStatus !== "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-40">
          <div className=" p-6 rounded-lg shadow-xl">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              retry="auto"
              refreshExpired="auto"
              sandbox={process.env.NODE_ENV === "development"}
              onError={() => {
                setTurnstileStatus("error");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
              }}
              onLoad={() => {
                setTurnstileStatus("required");
              }}
              onVerify={(token) => {
                setTurnstileStatus("success");
                if (turnstileRef.current) {
                  turnstileRef.current = token;
                }
              }}
            />
          </div>
        </div>
      )}
      
      {/* Left: Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-brand-bg dark:via-brand-bg dark:to-[#1C1C1C] transition-colors duration-300">
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
          <span className="text-white text-3xl md:text-5xl font-bold tracking-widest select-none">Your Second Brain</span>
        </div>
      </div>
    </main>
    </>
  )
}

export default RootLayout