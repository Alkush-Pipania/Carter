
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Footer from "@/components/landing/Fotter";
import FAQ from "@/components/landing/FAQ";
import HeroSection from "@/components/landing/HeroSection";
import { CTASection } from "@/components/landing/CTA_SECTION";




export default async function Home() {


  return (
    <>
      <HeroSection />



      {/* <Extension/> */}


      {/* Other sections are similar */}
      <section className="overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-center justify-center sm:px-6 mt-[20px] sm:mt-12">
        <FAQ />
        <CTASection />

      </section>

      <footer className="overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-start justify-center sm:px-6 mt-[20px] sm:mt-12">

        <Footer />
        <div className="flex sm:flex-row flex-col w-full sm:items-center sm:justify-center gap-4">
          <Link href="https://www.2alabs.pro/" target="_blank" rel="noopener noreferrer" className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
            About
          </Link>
          <Link href="https://www.alkush.xyz/" target="_blank" rel="noopener noreferrer" className="text-gray-300 cursor-pointer hover:text-gray-200 font-mono">
            Developer
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
            {/* <Image
            src={twitter}
            className="w-[34px] cursor-pointer"
            alt="twitter"
          /> */}
          </Link>
          {/* <Link href="https://www.instagram.com/al_ways_kush/"> */}
          {/* <Image
            src={instagram}
            className="w-[34px] cursor-pointer"
            alt="instagram"
          />
          </Link>
          <Link href="https://github.com/Alkush-Pipania">
          <Image src={github} className="w-[34px] cursor-pointer" alt="github" />
          </Link> */}


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