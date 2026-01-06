
import { auth } from '@/auth';
import { Navbar } from '@/components/landing/navbar/main';
import { redirect } from 'next/navigation';
import React from 'react'

const HomePageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export const metadata = {
  title: '2aLabs - The Best AI Bookmark Manager',
  description: 'Stop drowning in tabs. 2aLabs automatically organizes your saved links with AI, making them searchable and actionable. Join for free.',
};

export default HomePageLayout