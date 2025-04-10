import Image from "next/image";
import Link from "next/link";
import documlogo from "../../../public/Document.png";
import Usecases from "@/components/global/landingcom";
import screenlogo from "../../../public/Screen.png";
import cart from "../../../public/Cart.png";
import music from "../../../public/Music.png";
import link from "../../../public/Link 2.png";
import twitter from "../../../public/social/twitter.png";
import github from "../../../public/social/github.png";
import instagram from "../../../public/social/instagram.png";
import { FaHeart } from "react-icons/fa";
import Footer from "./_components/Fotter";
import FAQ from "./_components/FAQ";
import { CTASection } from "./_components/CTA_Section";
import HeroSection, { ScrollComponent } from "./_components/HeroSection";
import Extension from "./_components/extension";
import WaitlistPage from "./_components/joinwatinglist";




export default async function Home() {


  return (
    <>
      <HeroSection/>

      <section className="overflow-hidden px-4 flex flex-col items-center justify-center sm:px-6 my-[100px] sm:my-10">
        {/* <div className="md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-primary-purple/primary-purple-700 -z-10" /> */}
        <ScrollComponent>
          <div className="flex gap-y-2 flex-col items-center">
          <Image src={link} alt="linklogo" className="sm:w-[60px] w-[120px] h-auto" />
          <h3 className="text-3xl font-medium">Never Miss a link ever again</h3>
          <div className="text-washed-purple/washed-purple-700">
            <h4>Many interesting, useful, and important stuff is on the internet.</h4>
            <h4>Carter helps you save them so that you will never miss anything.</h4>
          </div>
        </div>
        </ScrollComponent>
        
        <div className="flex mt-5 gap-6 flex-col">
          <div className="flex lg:gap-24 lg:mx-32 items-start justify-start gap-6 sm:mx-8 mr-5 flex-col sm:flex-row">
            <ScrollComponent>
              <Usecases
              logo={documlogo}
              label="Long useful articles"
              para="You found a long, useful, and important article but can't read it right now? Not a problem. Just save it to Carter to read later."
            />
            </ScrollComponent>
            <ScrollComponent>
              <Usecases
              logo={screenlogo}
              label="Interesting websites"
              para="You found a ridiculously cool and interesting website you want to check out later? Not a problem. Just save it to carter to visit later."
            />
            </ScrollComponent>
            
          </div>
          <div className="flex lg:gap-24 lg:mx-32 items-start justify-start gap-6 sm:mx-8 mr-5 flex-col sm:flex-row">
            <ScrollComponent>
              <Usecases
              logo={cart}
              label="Items on online shops"
              para="You found an item on an online shop you don't want now but might want to buy later? Not a problem. Just save it to Carter."
            />
            </ScrollComponent>
            <ScrollComponent>
              <Usecases
              logo={music}
              label="Videos and music"
              para="Your friend shared a video with you, but you want to watch it tonight. Not a problem. Just save it to Carter to watch it whenever you want."
            />
            </ScrollComponent>
            
          </div>
        </div>
      </section>

      {/* <Extension/> */}
      <WaitlistPage/>

      <section
        className='overflow-hidden gap-y-5 px-4 h-[300px] bg-primary-purple/primary-purple-900  flex flex-col items-center justify-center sm:px-6 my-[100px] sm:my-28'
      >

        <div className="flex flex-col items-center justify-center"><h3 className="font-myfav text-4xl">Your Links, Your Control—Simply Secure</h3>
          <h3 className="font-myfav text-4xl">Always Private</h3></div>
        <h1 className="text--washed-purple/washed-purple-700 text-center">Carter enable you to share Links Annonmyously over the Globe </h1>


      </section>

      {/* Other sections are similar */}
      <section className="overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-center justify-center sm:px-6 mt-[20px] sm:mt-12">
      <FAQ />
      <CTASection/>

      </section>

      <footer className="overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-start justify-center sm:px-6 mt-[20px] sm:mt-12">
       
        <Footer />
        <div className="flex sm:flex-row flex-col w-full sm:items-center sm:justify-center gap-4">
          <Link href="/about">
            <h3 className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
              About
            </h3>
          </Link>
          <Link href="https://alkush.vercel.app/">
            <h3 className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
              Developer
            </h3>
          </Link>
          <a
            href="https://buymeacoffee.com/logicloom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono"
          >
            Support
          </a>
        </div>
        <div className="flex my-8 w-full items-center sm:justify-center gap-4">
          <Link href="https://x.com/alkushx">
          <Image
            src={twitter}
            className="w-[34px] cursor-pointer"
            alt="twitter"
          />
          </Link>
          <Link href="https://www.instagram.com/al_ways_kush/">
          <Image
            src={instagram}
            className="w-[34px] cursor-pointer"
            alt="instagram"
          />
          </Link>
          <Link href="https://github.com/Alkush-Pipania">
          <Image src={github} className="w-[34px] cursor-pointer" alt="github" />
          </Link>
          
          
        </div>
        <div className="w-full mb-8 sm:flex-row flex-col flex sm:justify-between sm:items-center">
          <h3>&copy; {new Date().getFullYear()}</h3>
          <div className="flex items-center justify-start gap-1">
            <h3 className="flex items-center">Crafted with</h3>
            <FaHeart />
            <h3>and &#8453; for a better web</h3>
          </div>
        </div>
      </footer>
    </>
  );
}
