
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Footer from "@/components/landing/Fotter";
import FAQ from "@/components/landing/FAQ";
import HeroSection from "@/components/landing/HeroSection";
import { CTASection } from "@/components/landing/CTA_SECTION";

// Enable ISR with 1 hour revalidation for optimal caching
export const revalidate = 3600; // Revalidate every 1 hour

// Force static rendering for better performance
export const dynamic = 'force-static';

// Enable edge caching
export const runtime = 'nodejs';

export default async function Home() {
  return (
    <>
      <HeroSection />

      {/* FAQ and CTA Section with dark theme support */}
      <section className="relative overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-center justify-center sm:px-6 mt-[20px] sm:mt-12">
        {/* Semi-transparent overlay for better readability */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
        
        <div className="relative z-20 w-full">
          <FAQ />
          <CTASection />
        </div>
      </section>

      {/* Footer with dark theme */}
      <footer className="relative overflow-hidden font-mono gap-y-5 px-4 flex flex-col items-start justify-center sm:px-6 mt-[20px] sm:mt-12">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl" />
        
        <div className="relative z-20 w-full">
          <Footer />
          <div className="flex sm:flex-row flex-col w-full sm:items-center sm:justify-center gap-4">
            <Link href="/about" className="text-gray-300 cursor-pointer hover:text-violet-400 font-mono transition-colors">
              About
            </Link>
            <span className="text-gray-300 font-mono">
              Developer
            </span>
            <span className="text-gray-300 font-mono">
              Support
            </span>
          </div>
          <div className="flex my-8 w-full items-center sm:justify-center gap-4">
            <Link href="https://x.com/alkushx" className="text-gray-300 hover:text-violet-400 transition-colors">
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
          <div className="w-full mb-8 sm:flex-row flex-col flex sm:justify-between sm:items-center text-gray-300">
            <h3>&copy; {new Date().getFullYear()}</h3>
            <div className="flex items-center justify-start gap-1">
              <h3 className="flex items-center">Crafted with</h3>
              <FaHeart className="text-red-400" />
              <h3>and &#8453; for a better web</h3>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}