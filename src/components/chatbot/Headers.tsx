"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'



const Header = () => {
  return (
    <section className='flex  z-20 from-GoogBG to-transparent via-GoogBG bg-gradient-to-b  justify-between w-full px-5  fixed top-0 items-center  py-4'>
      <Link href={'/'}>
        <h3 className='font-myfav text-2xl'>
         RETRIVAL        </h3>
      </Link>
      <div className='flex items-center justify-between gap-2'>



      </div>
    </section>
  )
}

export default Header