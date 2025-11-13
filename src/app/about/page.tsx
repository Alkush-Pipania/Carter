"use client"

import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Particles from "@/components/ui/Particles";
import {
  Brain,
  Chrome,
  Folder,
  Lock,
  Zap,
  Share2,
  Database,
  Shield,
  Sparkles,
  Link2,
  MessageSquare,
  FileText,
  CheckCircle2,
  Heart
} from 'lucide-react';

const ScrollComponent = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <ScrollComponent delay={delay}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="relative group h-full"
      >
        <div className="h-full bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-violet-500/40 transition-all duration-300 shadow-lg hover:shadow-violet-500/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-violet-600/20 rounded-lg group-hover:bg-violet-600/30 transition-colors">
              <Icon className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#f5f5f6] mb-2">{title}</h3>
              <p className="text-[#c0bfc4] leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollComponent>
  );
};

const StatCard = ({
  icon: Icon,
  value,
  label
}: {
  icon: any;
  value: string;
  label: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-6 backdrop-blur-sm text-center"
    >
      <Icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
      <div className="text-3xl font-bold text-[#f5f5f6] mb-1">{value}</div>
      <div className="text-sm text-[#c0bfc4]">{label}</div>
    </motion.div>
  );
};

export default function AboutPage() {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#030014] text-[#f5f5f6] relative overflow-hidden">
      {/* Global Particles Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          className="pointer-events-none"
          particleColors={[
            '#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9',
            '#c084fc', '#a78bfa', '#ddd6fe', '#e9d5ff'
          ]}
          particleCount={300}
          particleSpread={15}
          speed={0.03}
          particleBaseSize={300}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          cameraDistance={30}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 text-center relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-4">
              <span className="px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 backdrop-blur-sm">
                ✨ About Carter
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400"
            >
              Your Digital Memory,
              <br />
              Reimagined
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-[#c0bfc4] leading-relaxed"
            >
              Carter is more than a link manager. It's your personal AI-powered assistant
              that organizes, protects, and intelligently retrieves everything you save.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => router.push('/signin')}
                className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => window.open('https://chromewebstore.google.com/detail/link-saver-extension/cojbmogjbkpopmmkcbpeihnidojophfi', '_blank')}
                variant="outline"
                className="border-violet-500/30 text-[#f5f5f6] hover:bg-violet-600/10 text-lg px-8 py-6 rounded-xl"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Install Extension
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent" />
          <div className="max-w-5xl mx-auto relative">
            <ScrollComponent>
              <div className="bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-violet-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f6]">Our Mission</h2>
                </div>
                <p className="text-lg md:text-xl text-[#c0bfc4] leading-relaxed mb-6">
                  In a world drowning in information, we believe managing your digital resources
                  shouldn't be a chore. Carter was born from a simple idea: <span className="text-violet-400 font-semibold">what if
                  your links could organize themselves, understand your needs, and be there exactly
                  when you need them?</span>
                </p>
                <p className="text-lg md:text-xl text-[#c0bfc4] leading-relaxed">
                  We're building the future of personal knowledge management—where AI doesn't just
                  store your links, but <span className="text-violet-400 font-semibold">understands them, learns from them, and helps you
                  make sense of your digital world.</span>
                </p>
              </div>
            </ScrollComponent>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollComponent>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f6] mb-4">
                  Powerful Features, Simple Experience
                </h2>
                <p className="text-xl text-[#c0bfc4] max-w-3xl mx-auto">
                  Everything you need to manage your digital life, powered by cutting-edge technology
                </p>
              </div>
            </ScrollComponent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Brain}
                title="AI-Powered Chatbot"
                description="Ask questions about your saved links. Carter understands context and helps you find exactly what you're looking for, instantly."
                delay={0}
              />
              <FeatureCard
                icon={Folder}
                title="Smart Organization"
                description="Organize links into folders, add tags, and let Carter suggest where things should go based on your patterns."
                delay={0.1}
              />
              <FeatureCard
                icon={Chrome}
                title="Browser Extension"
                description="Save any page with one click. Carter's extension seamlessly integrates with your browsing workflow."
                delay={0.2}
              />
              <FeatureCard
                icon={Share2}
                title="Secret Key Sharing"
                description="Share collections of links securely through unique secret keys. Perfect for teams and collaborations."
                delay={0.3}
              />
              <FeatureCard
                icon={Lock}
                title="Privacy First"
                description="Your data is encrypted end-to-end. We never share or sell your information. Your links are yours alone."
                delay={0.4}
              />
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Built on serverless architecture for instant access worldwide. Your links load in milliseconds, not seconds."
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Why Carter Stands Out */}
        <section className="py-16 px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent" />
          <div className="max-w-6xl mx-auto relative">
            <ScrollComponent>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f6] mb-4">
                  Why Choose Carter?
                </h2>
                <p className="text-xl text-[#c0bfc4]">
                  We're not just another bookmarking tool
                </p>
              </div>
            </ScrollComponent>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollComponent delay={0.1}>
                <div className="bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/20 rounded-xl p-8 backdrop-blur-sm">
                  <Shield className="w-12 h-12 text-violet-400 mb-4" />
                  <h3 className="text-2xl font-bold text-[#f5f5f6] mb-4">Security & Privacy</h3>
                  <ul className="space-y-3 text-[#c0bfc4]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>End-to-end encryption for all your data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Zero data sharing with third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Minimal attack surface with serverless architecture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Complete control over your data</span>
                    </li>
                  </ul>
                </div>
              </ScrollComponent>

              <ScrollComponent delay={0.2}>
                <div className="bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/20 rounded-xl p-8 backdrop-blur-sm">
                  <MessageSquare className="w-12 h-12 text-violet-400 mb-4" />
                  <h3 className="text-2xl font-bold text-[#f5f5f6] mb-4">AI That Actually Helps</h3>
                  <ul className="space-y-3 text-[#c0bfc4]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Natural language queries to find your links</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Context-aware suggestions and insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Smart categorization and tagging</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                      <span>Learn your habits and preferences over time</span>
                    </li>
                  </ul>
                </div>
              </ScrollComponent>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollComponent>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f6] mb-4">
                  Built with Modern Technology
                </h2>
                <p className="text-xl text-[#c0bfc4]">
                  Cutting-edge stack for maximum performance and reliability
                </p>
              </div>
            </ScrollComponent>

            <ScrollComponent delay={0.1}>
              <div className="bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Next.js 14</span> - React framework</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">TypeScript</span> - Type safety</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Drizzle ORM</span> - Database layer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">PostgreSQL</span> - Reliable data store</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">NextAuth</span> - Authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Tailwind CSS</span> - Styling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Framer Motion</span> - Animations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Zustand</span> - State management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-[#c0bfc4]"><span className="text-[#f5f5f6] font-semibold">Cloudinary</span> - Media storage</span>
                  </div>
                </div>
              </div>
            </ScrollComponent>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-purple-600/10 to-violet-600/5" />
          <div className="max-w-6xl mx-auto relative">
            <ScrollComponent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <StatCard icon={Link2} value="∞" label="Links Managed" />
                <StatCard icon={Zap} value="<100ms" label="Response Time" />
                <StatCard icon={Shield} value="100%" label="Privacy Protected" />
                <StatCard icon={Brain} value="AI" label="Powered" />
              </div>
            </ScrollComponent>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollComponent>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#211f30] to-[#171427] border border-violet-500/30 rounded-3xl p-12 backdrop-blur-sm">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f6] mb-6">
                    Ready to Transform Your Digital Life?
                  </h2>
                  <p className="text-xl text-[#c0bfc4] mb-8 max-w-2xl mx-auto">
                    Join thousands of users who have already made Carter their personal digital assistant
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                      onClick={() => router.push('/signin')}
                      className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-10 py-6 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all"
                    >
                      Start Your Journey
                    </Button>
                    <Button
                      onClick={() => router.push('/find')}
                      variant="outline"
                      className="border-violet-500/30 text-[#f5f5f6] hover:bg-violet-600/10 text-lg px-10 py-6 rounded-xl"
                    >
                      Try Secret Retrieval
                    </Button>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-2 text-[#c0bfc4]">
                    <span>Made with</span>
                    <Heart className="w-5 h-5 text-red-400 fill-current" />
                    <span>by the Carter Team</span>
                  </div>
                </div>
              </div>
            </ScrollComponent>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-8 px-4 md:px-6 border-t border-violet-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#c0bfc4] text-sm">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <a href="https://www.2alabs.pro/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                  2A Labs
                </a>
                <span className="text-violet-500/30">•</span>
                <a href="https://www.alkush.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                  Developer
                </a>
                <span className="text-violet-500/30">•</span>
                <a href="https://buymeacoffee.com/logicloom" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                  Support Us
                </a>
              </div>
              <div className="text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} Carter. All rights reserved.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
