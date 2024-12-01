"use client"
import { signIn, useSession } from "next-auth/react";
import heroimg from "../../../public/Section 1.png"
import Image from "next/image";
import TitleSection from "@/components/landing-page/title-section";
import ShinyButton from "@/components/ui/shiny-button";
import { useRouter } from "next/navigation";
import documlogo from "../../../public/Document.png"
import Usecases from "@/components/global/landingcom";
import screenlogo from "../../../public/Screen.png"
import cart from "../../../public/Cart.png"
import music from "../../../public/Music.png"
import link from "../../../public/Link 2.png"
import twitter from "../../../public/social/twitter.png"
import github from "../../../public/social/github.png"
import instagram from "../../../public/social/instagram.png"

import { FaHeart } from "react-icons/fa";


export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      <section
        className='overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center  md:items-center'
      >

        <TitleSection pill='✨ Introducing Carter'
          title={`Organize, Share, and Manage Your Links with Ease`}
        />
        <div className='md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40'
        />

        <div className="w-full sm:flex-row md:gap-16 flex-col-reverse  flex justify-center mt-10 ">
          <div className="flex mx-3 max-w-[620px] gap-y-5 mt-10 flex-col items-start justify-start">
            <h3 className="text-3xl font-bold ">Save links to visit later</h3>
            <p className="max-w-[512px] text-gray-400">Store your links securely in a well-organized format and access them anytime with ease. Seamlessly share links with others without clutter, and manage them like a pro by categorizing, tagging, and sorting for quick retrieval. Accidentally delete something? No problem—restore links from trash with a single click.</p>
            <div className="flex gap-4 sm:gap-6">
              <div onClick={() => {
                if (session.data) {
                  router.push('/dashboard')
                } else {
                  signIn()
                }
              }}>
                <ShinyButton className="bg-washed-purple/washed-purple-500 text-nowrap font-bold hover:bg-washed-purple/washed-purple-700">let's Carter</ShinyButton>
              </div>
              <div onClick={() => {
                router.push('/find')
              }}>
                <ShinyButton className="bg-washed-purple/washed-purple-500 text-nowrap font-bold hover:bg-washed-purple/washed-purple-700">Secret code ? </ShinyButton>
              </div>
            </div>
          </div>
          <div className="mx-10 flex items-center relative w-[250px]">
            <Image src={heroimg} alt='heroimg' className="w-full  " />
          </div>
        </div>
      </section>

      <section
        className='overflow-hidden px-4  flex flex-col items-center justify-center sm:px-6 my-[100px] sm:my-10'
      >
        <div className='md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-primary-purple/primary-purple-700 -z-10 '
        />

        {/* top */}
        <div className="flex gap-y-2 flex-col items-center ">
          <Image src={link} alt="linklogo" className="sm:w-[60px] w-[120px] h-auto"></Image>
          <h3 className="text-3xl font-medium ">Never Miss a link ever again</h3>
          <div className="text-washed-purple/washed-purple-700">
            <h4>Many interesting, useful, and important stuff is on the internet.</h4>
            <h4>Carter helps you save them so that you will never miss anything.</h4>
          </div>
        </div>
        <div className="flex  mt-5 gap-6 flex-col">
          <div className="flex lg:gap-24 lg:mx-32 items-start justify-start gap-6 sm:mx-8 mr-5 flex-col sm:flex-row">
            <Usecases logo={documlogo} label="Long useful articles" para="You found a long, useful, and important article but can't read it right now? Not a problem. Just save it to Carter to read later." />
            <Usecases logo={screenlogo} label="Interesting websites" para="You found a ridiculously cool and interesting website you want to check out later? Not a problem. Just save it to carter to visit later." />
          </div>
          <div className="flex lg:gap-24 lg:mx-32 items-start justify-start gap-6 sm:mx-8 mr-5 flex-col sm:flex-row">
            <Usecases logo={cart} label="Items on online shops" para="You found an item on an online shop you don't want now but might want to buy later? Not a problem. Just save it to Carter." />
            <Usecases logo={music} label="Videos and music" para="Your friend shared a video with you, but you want to watch it tonight. Not a problem. Just save it to Carter to watch it whenever you want." />
          </div>
        </div>

      </section>

      <section
        className='overflow-hidden gap-y-5 px-4 h-[300px] bg-primary-purple/primary-purple-900  flex flex-col items-center justify-center sm:px-6 my-[100px] sm:my-28'
      >
        <div className="flex flex-col items-center justify-center"><h3 className="font-myfav text-4xl">Your Links, Your Control—Simply Secure</h3>
          <h3 className="font-myfav text-4xl">Always Private</h3></div>
        <h1 className="text--washed-purple/washed-purple-700 text-center">Carter enable you to share Links Annonmyously over the Globe </h1>


      </section>

      <section
        className='overflow-hidden gap-y-5 px-4 h-[300px]   flex flex-col items-center justify-center sm:px-6 mb-[20px] sm:mb-12   '
      >
        <div className=' w-[80%] blur-[120px] rounded-full h-32 absolute bg-primary-purple/primary-purple-500 -z-10 '
        />
        <div className="flex flex-row  items-center justify-center gap-2">
          <Image src={link} alt="linklogo" className="sm:w-[60px] w-[120px] h-auto"></Image>
          <h3 className="text-4xl font-bold font-portland ">Start saving links</h3>
        </div>
        <h2
          onClick={() => {
            if (session.data) {
              router.push('/dashboard')
            } else {
              signIn()
            }
          }}
          className="text-brand/brand-dark cursor-pointer font-medium hover:bg-gray-300  bg-gray-400 px-2 py-2 rounded-full">Get started now {'>'}</h2>
      </section>

      <footer
        className='overflow-hidden font-mono gap-y-5 px-4  flex flex-col items-start justify-center sm:px-6 mt-[20px] sm:mt-12'
      >

        <div
          className="flex sm:flex-row flex-col w-full sm:items-center sm:justify-center gap-4"
        >
          <h3 onClick={()=> router.push('/about')}
           className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
            About
          </h3>
          <h3 onClick={()=> router.push('https://alkush.vercel.app/')}
           className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
            Developer
          </h3>
          <h3 onClick={() => {
            window.open('https://buymeacoffee.com/logicloom');
          }}
            className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
            Support
          </h3>
        </div>
        <div className="flex my-8 w-full items-center sm:justify-center gap-4">
          <Image
            onClick={() => {
              window.open('https://x.com/logic_l00m', '_blank');
            }}
            src={twitter} className="w-[34px] cursor-pointer" alt="twitter" />
          <Image
            onClick={() => {
              window.open('https://www.instagram.com/locallhost__/', '_blank');
            }}
            src={instagram} className="w-[34px] cursor-pointer" alt="instagram" />
          <Image onClick={() => {
            window.open('https://github.com/Alkush-Pipania/Carter', '_blank');
          }}
            src={github} className="w-[34px] cursor-pointer" alt="gihub" />
        </div>
        <div className="w-full mb-8 sm:flex-row flex-col flex sm:justify-between sm:items-center">
          <h3>&copy; {new Date().getFullYear()}</h3>
          <div className="flex items-center justify-start gap-1">
            <h3 className="flex items-center">Crafted with  </h3>
            <FaHeart />
            <h3>and  &#8453; for a better web </h3>
          </div>
        </div>



      </footer>
    </>
  );
}
