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

      
    </div>
  );
};

export default Navbar;
