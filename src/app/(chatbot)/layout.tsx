"use client"
import Loading from "@/components/common/loading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Check if userId exists in localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Redirect to dashboard if userId exists
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Loading />
  }
  return <div className="h-screen bg-gradient-to-b from-brand-bg via-[#1C1C1C] to-[#1C1C1C]  text-white">
    {children}</div>
} 