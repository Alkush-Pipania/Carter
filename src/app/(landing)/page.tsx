
import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/hero";

// Dynamically import below-the-fold components for better performance
const Section2 = dynamic(() => import("@/components/landing/section2").then(mod => ({ default: mod.Section2 })));
const FeaturesSection = dynamic(() => import("@/components/landing/features-section").then(mod => ({ default: mod.FeaturesSection })));
const Section3 = dynamic(() => import("@/components/landing/section3").then(mod => ({ default: mod.Section3 })));
const TextSection = dynamic(() => import("@/components/landing/text-section").then(mod => ({ default: mod.TextSection })));
const PerksSection = dynamic(() => import("@/components/landing/perks-section").then(mod => ({ default: mod.PerksSection })));
const FAQSection = dynamic(() => import("@/components/landing/faq-section").then(mod => ({ default: mod.FAQSection })));
const CTABanner = dynamic(() => import("@/components/landing/cta-banner").then(mod => ({ default: mod.CTABanner })));
const Footer = dynamic(() => import("@/components/landing/footer").then(mod => ({ default: mod.Footer })));

// Enable ISR with 1 hour revalidation for optimal caching
export const revalidate = 3600; // Revalidate every 1 hour

// Force static rendering for better performance
export const dynamic_config = 'force-static';

// Enable edge caching
export const runtime = 'nodejs';

export default async function Home() {
  return (
    <>
      <Hero />
      <Section2 />
      <FeaturesSection />
      <Section3 />
      <TextSection />
      <PerksSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </>
  );
}