
import localFont from "next/font/local";
import "./globals.css";


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

// export const metadata: Metadata = {
//   title: "Carter - Save Links",  
//   description: "A Simple Platform to Save Links and Share anonymously.",
//   icons: {
//     icon: "/logo.png",
//   },
// };

export const metadata = {
  title: 'Carter - Save Links',
  description: 'Carter is an AI-powered tool for managing links efficiently.',
  openGraph: {
    title: 'Carter - AI Link Management',
    description: 'Save links online, manage, and organize your with chrome extension.',
    url: 'https://carter.fun',
    siteName: 'Carter , online link saver , save links onlie , link manager , link organizer , link saver , carter links , carter link saver',
    images: [
      {
        url: '@/../public/logo.png',
        width: 800,
        height: 600,
        alt: 'Carter Logo',
      },
    ],
    locale: ['en_US', 'en_IN'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carter - AI Link Management',
    description: 'Carter helps you manage your links efficiently with AI.',
    images: ['/path-to-your-image.jpg'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand/brand-dark text-white`}
      >
        {children}

      </body>

    </html>
  );
}
