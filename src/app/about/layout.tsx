import { Metadata } from 'next';

// Enable aggressive caching for the about page
export const revalidate = 86400; // Revalidate every 24 hours (about page changes rarely)

// Force static rendering
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Carter - Redefining Link Management',
  description: 'Learn about Carter, the intelligent link management platform with AI-powered features, privacy-first approach, and seamless organization.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
