import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import carterlogo from '../../../public/logo.png'

const About = () => {
  return (
    <>
      <div className='w-full flex items-center justify-start'>
        <Link href="/" className='font-semibold flex items-center justify-center text-xl mt-2 text-gray-400 hover:text-gray-300 '>
          <Image src={carterlogo} alt='logo' className='w-[50px] sm:ml-36' />
          Carter</Link>

      </div>
      <div className=' w-[90%] md:w-[80%] blur-[120px] rounded-full h-40 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 sm:left-44 top-40'
      />
      <section className='w-full flex flex-col items-center  justify-center  mb-32 mt-10 gap-2'>
        <h3 className='text-6xl font-myfav text-primary-purple/primary-purple-300 hover:text-primary-purple/primary-purple-200 ease-in-out duration-200 '>About</h3>
        <p className='sm:w-[500px] sm:mr-40 text-washed-purple/washed-purple-300 sm:mx-0 mx-9 sm:text-center '>In an age where digital content is abundant and personal privacy is paramount, Carter was built with one mission: to give users secure, private, and efficient control over their shared links. With Carter, you get a seamless, user-focused way to save, organize, and securely share your links, whether for personal use, collaboration, or quick reference.</p>
        <h3 className='text-3xl my-3 sm:mr-32  font-myfav text-primary-purple/primary-purple-300 hover:text-primary-purple/primary-purple-200 ease-in-out duration-200'>
          How Easy ?
        </h3>
        <p className='sm:w-[520px] sm:ml-40 text-washed-purple/washed-purple-300 mx-10 text-end sm:text-center '>With Carter, you can store your links with complete confidence, knowing that your data remains private and accessible only to you—unless you decide otherwise. Sharing is made secure and simple through the use of unique secret keys, allowing only the intended recipients to access your content. Our streamlined dashboard keeps all your links neatly organized and easy to access, with options to categorize, search, and filter as needed. Plus, Carter’s responsive design ensures that you can access your links from any device, anywhere, so your information is always at your fingertips.</p>
      </section>
    </>
  )
}

export default About