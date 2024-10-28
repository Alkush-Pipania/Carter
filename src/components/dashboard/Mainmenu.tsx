"use client"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Loader from '../global/Loader';
import axios from 'axios';

const Mainmenu = ({username , email} : {username : string , email : string}) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [secretkey, setSecretkey] = useState('');
  const session = useSession();

  return (
    <section className='flex flex-col gap-y-2 rounded-md border p-7 border-gray-400'>
      <div className='flex gap-2'>
        <h3 className='text-gray-200'>Username :</h3>
        <h3 className='text-gray-400'>{username}</h3>
      </div>
      <div className='flex gap-2 '>
        <h3 className='text-gray-200'>Email :</h3>
        <h3 className='text-gray-400'>{email}</h3>
      </div>
      <div className='flex my-3'>
        <h3
          onClick={async () => {
            setisLoading(true);
            try {
              const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/mainmenu`, {
                params: { email: session.data?.user?.email },
              });
              setSecretkey(res.data.secretkey);
            } catch (error) {
              console.log("Error fetching data:", error);
            } finally {
              setisLoading(false);
            }
          }}
          className=''
        >
          {secretkey === '' ? (
            <div className='cursor-pointer flex items-center gap-2 px-3 py-2 bg-green-500 rounded-md'>
              SECRET KEY?
              {!isLoading ? '' : <Loader />}
            </div>
          ) : (
            <>
            <div
              className="text-sm flex flex-col cursor-copy bg-primary-blue/primary-blue-400 px-2 py-1 rounded-md "
              onClick={() => {
                navigator.clipboard.writeText(secretkey);
                alert("Secret key copied to clipboard!");
              }}
            >
              {secretkey}
              
            </div>
            <span className='text-xs text-gray-400'>secret key</span>
            </>
            
          )}
        </h3>
      </div>

      <div onClick={async () => {
        router.push(`${process.env.NEXT_PUBLIC_API_URL}`);
        signOut();

      }}
        className='flex justify-center '>
        <h3 className='bg-primary-purple/primary-purple-400 cursor-pointer px-3 py-2 rounded-full'>Signout</h3>
      </div>

    </section>
  )
}

export default Mainmenu