"use client"
"use client"
import { motion } from "framer-motion"
import { Chrome, ShieldCheck, Download, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

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


export default function Extension() {
  return (
    <div className="min-h-screen  bg-brand-dark">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-4 pt-16 pb-24 text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-purple-600/20 to-transparent pointer-events-none" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <Badge variant="outline" className="mb-8 border-primary-purple-300 text-primary-purple/primary-purple-100">
            Now Available for Chrome & Brave
          </Badge>
        </motion.div>


        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand/brand-washedPurple via-brand/brand-washedblue to-brand-asliblue text-transparent bg-clip-text"
        >
          Never Miss a Link Again
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-xl md:text-2xl text-primary-purple/primary-purple-100 mb-12 max-w-2xl mx-auto">
          Save and manage your important links across the web with our powerful browser extension.
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                size="lg"
                className="bg-brand/brand-asliblue hover:bg-brand/brand-asliblue/90 text-white"
                onClick={() => window.open("https://chromewebstore.google.com/detail/carter-link-saver-extensi/cojbmogjbkpopmmkcbpeihnidojophfi?hl=en&authuser=0")}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Add to Chrome
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div>
                  <h4 className="text-sm font-semibold">Chrome Extension</h4>
                  <p className="text-sm text-black ">
                    Install Carter on Chrome to start saving your important links.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Button
            size="lg"
            variant="outline"
            className=" text-black bg-white/60 hover:bg-white "
            onClick={() => window.open("https://chromewebstore.google.com/detail/carter-link-saver-extensi/cojbmogjbkpopmmkcbpeihnidojophfi?hl=en&authuser=0")}
          >
            <Download className="mr-2 h-5 w-5" />
            Add to Brave
          </Button>
        </div>
      </motion.div>



      {/* Installation Steps */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-purple/primary-purple-100">
          Quick Installation Guide
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "1",
              title: "Choose Browser",
              description: "Select Chrome or Brave as your preferred browser",
            },
            {
              step: "2",
              title: "Add Extension",
              description: "Click 'Add to Browser' on the store page",
            },
            {
              step: "3",
              title: "Start Using",
              description: "Click the Carter icon to start saving links",
            },
          ].map((item) => (
            <motion.div
            key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <Card className="bg-primary-purple/primary-purple-900/20 border border-primary-purple/primary-purple-700/50">
                <CardHeader>
                  <div className="w-8 h-8 rounded-full bg-brand/brand-asliblue flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <CardTitle className="text-primary-purple/primary-purple-100">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-purple/primary-purple-200">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>

          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-primary-purple/primary-purple-900/20 border border-primary-purple-700/50 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-primary-purple/primary-purple-100 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-brand/brand-asliblue" />
              Secure by Design
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-purple/primary-purple-200">
              Your links are encrypted and stored securely. Share anonymously when you want to.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => window.open("https://chromewebstore.google.com/detail/carter-link-saver-extensi/cojbmogjbkpopmmkcbpeihnidojophfi?hl=en&authuser=0")}
              variant="link" className="text-brand/brand-asliblue">
              Learn more about security on extension page
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>


    </div>
  )
}

