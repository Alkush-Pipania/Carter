"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Turnstile } from 'next-turnstile'
import Loader from '@/components/common/Loader'

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
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
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Turnstile verification */}
      {turnstileStatus !== "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-40">
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
      )}

      {/* Centered Auth Container */}
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </main>
  )
}

export default RootLayout