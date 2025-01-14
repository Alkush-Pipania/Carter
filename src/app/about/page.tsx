"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Lock, Globe, Sparkles, Server, Shield, MessageSquare, Chrome, Folder, Search, Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#030014] text-[#f5f5f6]">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#f5f5f6]">Redefining Link Management with Carter</h1>
        <p className="text-xl mb-8 text-[#c0bfc4] max-w-2xl mx-auto">Experience effortless organization, intelligent link insights, and a personal AI-powered assistant – all while keeping your data secure.</p>
        <Button onClick={()=> router.replace('/signin')} className="bg-[#7000ff] hover:bg-[#6600e8] text-white text-lg px-8 py-3">
          Sign up for the carter
        </Button>
      </section>

      {/* Mission and Vision Statement */}
      <section className="py-16 px-4 md:px-6 bg-[#171427]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#f5f5f6]">Our Mission and Vision</h2>
          <p className="text-lg text-[#c0bfc4] mb-8">
            Our mission is to empower individuals and businesses to manage their web resources effortlessly. In today's fast-paced world, where access to information is crucial, Carter delivers a smarter, faster, and more intuitive link management experience. We envision a future where AI-driven personalization transforms how you interact with your saved content.
          </p>
          <div className="space-y-4 text-[#b5b2ee] italic">
            <p>"Organizing links shouldn't feel like a chore. Carter makes it seamless, intelligent, and secure."</p>
            <p>"Your digital resources are just a click away – and they're exactly where you need them, when you need them."</p>
          </div>
        </div>
      </section>

      {/* Why Carter Stands Out */}
      <section className="py-16 px-4 md:px-6 bg-[#211f30]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#f5f5f6]">Why Choose Carter?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Server className="w-8 h-8 text-[#b5b2ee]" />}
              title="Serverless Architecture"
              description="Scalable, reliable, and cost-efficient infrastructure that adapts to your needs."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-[#b5b2ee]" />}
              title="Privacy-First Approach"
              description="Your data is encrypted and never shared or sold. Privacy is our priority."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-[#b5b2ee]" />}
              title="AI-Powered Chat Assistant"
              description="Coming soon: Personalized suggestions and context-aware query resolution."
            />
            <FeatureCard
              icon={<Chrome className="w-8 h-8 text-[#b5b2ee]" />}
              title="Carter Browser Extension"
              description="Save links with one click and organize instantly while browsing."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-[#b5b2ee]" />}
              title="Real-time Updates"
              description="Smooth, responsive link management with React Query and Optimistic UI."
            />
          </div>
        </div>
      </section>

      {/* Carter Extension Section */}
      <section className="py-16 px-4 md:px-6 bg-[#292637]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#f5f5f6]">The Carter Extension: Manage Links Instantly, Anywhere</h2>
          <p className="text-lg text-[#c0bfc4] mb-8 text-center">
            The Carter Browser Extension brings the power of smart link management right into your browsing experience. No more switching tabs or losing track of important pages. Save, organize, and retrieve your links without leaving your current workflow.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-[#b5b2ee]" />}
              title="One-Click Link Saving"
              description="Instantly save any webpage to your Carter account with a single click. Choose folders for better organization or save globally."
            />
            <FeatureCard
              icon={<Folder className="w-8 h-8 text-[#b5b2ee]" />}
              title="Seamless Folder Navigation"
              description="Add new links to any existing folder or create a new one on the fly. Use Carter's real-time folder search to find exactly where your link belongs."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-[#b5b2ee]" />}
              title="AI-Assisted Suggestions (Coming Soon)"
              description="Automatically generate titles and descriptions for links to save time. Get personalized link suggestions based on your browsing patterns."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-[#b5b2ee]" />}
              title="Security and Privacy"
              description="All actions performed with the extension are secured using the same privacy-first principles as the core platform. Your data stays yours."
            />
          </div>
          <div className="mt-8 text-center space-y-4 text-[#b5b2ee] italic">
            <p>"See something interesting? Save it to Carter – right from your browser."</p>
            <p>"With Carter Extension, your organized digital world is always a click away."</p>
          </div>
        </div>
      </section>

      {/* Technology Stack and Security */}
      <section className="py-16 px-4 md:px-6 bg-[#211f30]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#f5f5f6]">Built with Cutting-Edge Technology</h2>
          <ul className="text-[#c0bfc4] space-y-2 mb-8">
            <li>• Next.js for seamless, server-side rendered user interfaces</li>
            <li>• React Query for state management, ensuring instant UI updates</li>
            <li>• Prisma for database interactions with type safety</li>
            <li>• PostgreSQL as a reliable, scalable data store</li>
            <li>• Hiro Stacks.js and Gaia Storage for Web3 decentralized storage options</li>
          </ul>
          <div className="space-y-4 text-[#b5b2ee] italic text-center">
            <p>"We don't just store links. We store possibilities."</p>
            <p>"Why waste time searching? Let Carter do the thinking for you."</p>
            <p>"Security isn't an afterthought; it's our foundation."</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-6 bg-[#292637]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#f5f5f6]">What Our Users Say</h2>
          <div className="bg-[#211f30] p-6 rounded-lg shadow-lg">
            <p className="text-lg text-[#c0bfc4] italic mb-4">
              "Since using Carter, managing my resources has never been this easy. I love how fast it is!"
            </p>
            <p className="text-[#b5b2ee]">– A satisfied beta user</p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      {/* <section className="py-20 px-4 md:px-6 bg-[#171427] text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#f5f5f6]">Join the Carter Revolution</h2>
        <p className="text-xl mb-8 text-[#c0bfc4] max-w-2xl mx-auto">
          Join thousands of early adopters who are reshaping productivity with Carter. Sign up for early access today and experience the smarter way to manage your digital world.
        </p>
        <Button className="bg-[#7000ff] hover:bg-[#6600e8] text-white text-lg px-8 py-3">
          Sign Up for Early Access
        </Button>
      </section> */}
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-[#292637]">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-xl font-semibold ml-4 text-[#f5f5f6]">{title}</h3>
        </div>
        <p className="text-[#c0bfc4]">{description}</p>
      </CardContent>
    </Card>
  )
}

