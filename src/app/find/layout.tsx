import { Metadata } from 'next';

// Enable ISR with moderate caching for the find page shell
// The page shell (UI) can be cached, while data fetching remains dynamic on client
export const revalidate = 3600; // Revalidate every 1 hour

export const metadata: Metadata = {
  title: 'Find Links - Carter',
  description: 'Retrieve your saved links using your secret code. Access your organized digital resources instantly.',
};

export default function FindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
