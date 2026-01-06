import type { Metadata } from "next";
import localFont from "next/font/local";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";
import { UserIdSetter } from "@/components/common/UserIDSetter";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.2alabs.com'), // updated assuming domain might change, or keeping placeholder if unknown. Sticking to user request for name change.
  title: {
    default: '2aLabs - Your Personal AI-Powered Bookmarks',
    template: '%s | 2aLabs',
  },
  description: 'Never lose a link again. 2aLabs uses AI to organize, tag, and make your bookmarks instantly searchable. The smart way to manage your digital knowledge.',
  keywords: ['AI bookmarks', 'link manager', 'smart bookmarks', 'bookmark organizer', 'AI search', 'knowledge management', 'productivity tool', 'second brain'],
  authors: [{ name: 'Alkush Pipania', url: 'https://x.com/alkushx' }],
  creator: 'Alkush Pipania',
  publisher: '2aLabs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.2alabs.com',
    title: '2aLabs - Your Personal AI-Powered Bookmarks',
    description: 'Never lose a link again. 2aLabs uses AI to organize, tag, and make your bookmarks instantly searchable.',
    siteName: '2aLabs',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '2aLabs - AI Powered Bookmarks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2aLabs - Your Personal AI-Powered Bookmarks',
    description: 'Never lose a link again. 2aLabs uses AI to organize, tag, and make your bookmarks instantly searchable.',
    images: ['/og.png'],
    creator: '@alkushx',
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <StoreProvider>
              <JsonLd />
              <UserIdSetter />
              {children}
              <Toaster />
            </StoreProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
