"use client";
import Link from 'next/link';
import React from 'react';
import { signOut, signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import carterlogo from "../../../public/logo.png"

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className='p-4 flex justify-between items-center'>
      <Link href="/" className='font-semibold flex items-center justify-center text-xl text-gray-400 hover:text-gray-300 '>
      <Image src={carterlogo} alt='logo' className='w-[50px]' />
      Carter</Link>

      <div className='bg-primary-purple/primary-purple-400 px-3 border-x-white border-x-2 py-1 rounded-full 
      hover:border-x-primary-purple/primary-purple-500
      hover:bg-primary-purple/primary-purple-500 duration-75 ease-in-out text-gray-200 hover:text-gray-100 cursor-pointer'>
        {session ? (
          <h3 onClick={() => signOut()}>Sign Out</h3>
        ) : (
          <h3 onClick={() => signIn()}>Sign In</h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
