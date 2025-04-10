"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";

const ctaSection = {
  title: "Ready to experience AI-powered link management?",
  buttonText: "Try Carter AI",
  buttonHref: "/dashboard",
};

export function CTASection() {
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        damping: 20,
      },
    },
  };

  const gradientVariants = {
    hidden: {
      rotate: 100,
      opacity: 0,
      scale: 0.8,
      x: 0,
      filter: "blur(30px)",
    },
    visible: {
      rotate: 95,
      filter: "blur(50px)",
      opacity: 1,
      scale: 1,
      x: -30,
      transition: {
        type: "spring",
        stiffness: 10,
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full mx-auto py-4 my-14 mb-24 px-4 rounded-lg overflow-hidden max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="bg-gradient-to-b relative overflow-hidden rounded-lg from-brand/brand-dark via-transparent to-primary-purple/primary-purple-400 p-8 text-center">
        <motion.div
          className="bottom-[-10rem] md:bottom-[-19rem] left-[30%] opacity-100 z-[-1] absolute blur-[4em] rounded-xl transition-all translate-x-[-50%] w-[10rem] md:w-[10rem] h-[10rem] md:h-[30rem]"
          variants={gradientVariants}
        />

        <motion.h2 className="text-xm sm:text-3xl font-bold mb-6" variants={titleVariants}>
          {ctaSection.title}
        </motion.h2>
        

      </div>
    </motion.div>
  );
}