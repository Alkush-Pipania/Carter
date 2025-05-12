"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signOut, signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import carterlogo from "/public/carter/logo.png"

function Navbar() {
  const { data: session } = useSession();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [navWidth, setNavWidth] = useState("80%");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Scroll animation effect - only on non-mobile devices
  useEffect(() => {
    // Skip animation for mobile devices
    if (isMobile) {
      setIsScrolling(false);
      setNavWidth("100%");
      return;
    }
    
    const maxScroll = 1000;
    let rafId: number | null = null;

    const updateNav = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);

        // Calculate width based on scroll position with easing
        const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
        const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

        const minWidth = Math.min(768, window.innerWidth * 0.6); // Minimum width
        const maxWidth = window.innerWidth * 0.8; // Maximum width (80% of viewport)
        const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

        setNavWidth(`${currentWidth}px`);
      } else {
        setIsScrolling(false);
        setNavWidth("80%"); // Reset to default width
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateNav);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile]);

  return (
    <nav className="w-full sticky top-0 z-50 px-2 flex justify-center">
      <div
        ref={navRef}
        className={`backdrop-blur-lg supports-[backdrop-filter]:bg-brand/brand-dark/15 mt-4 rounded-full px-4 sm:px-6 lg:px-8 ${!isMobile ? "transition-all duration-500 ease-in-out" : ""} ${
          isScrolling && !isMobile ? "shadow-lg border border-gray-800/20" : ""
        }`}
        style={{
          width: isMobile ? "100%" : navWidth,
          maxWidth: "1152px", // max-w-6xl equivalent
          transform: isScrolling && !isMobile ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Image
              src={carterlogo}
              width={44}
              height={44}
              className={`w-11 h-11 ${!isMobile ? `transition-transform duration-500 ${isScrolling ? "scale-90" : "scale-100"}` : ""}`}
              alt="Carter Logo"
            />
            <Link
              href="/"
              className={`font-bold ${!isMobile ? `transition-all duration-500 ${isScrolling ? "text-xl" : "text-2xl"}` : "text-2xl"}`}
            >
              Carter
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <a
              href="https://github.com/Alkush-Pipania/Carter"
              target="_blank" rel="noopener noreferrer"
              className={`dark:text-white ${!isMobile ? "transition-transform duration-300 hover:scale-110" : ""}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div
              onClick={() => session ? signOut() : signIn()}
              className={`bg-primary-purple/primary-purple-400 px-3 py-1 rounded-full 
              hover:bg-primary-purple/primary-purple-500 
              hover:shadow-lg hover:shadow-purple-500/20 
              hover:-translate-y-[2px] hover:rotate-[1deg] hover:scale-105 
              ${!isMobile ? "transition-all duration-300 ease-in-out" : ""} 
              text-gray-100 hover:text-white 
              dark:text-white dark:hover:text-black dark:hover:bg-white/60 
              transition-[transform,box-shadow,background,color] duration-300 ease-out 
              cursor-pointer
              ${isScrolling && !isMobile ? "scale-95" : "scale-100"}`}
            >
              {session ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;