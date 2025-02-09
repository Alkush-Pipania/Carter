# 🚀 Carter

**Carter** is a modern, AI-powered bookmarking tool designed to help users save, organize, and share links with ease. Whether you're a developer, researcher, or just someone who loves collecting resources online, Carter offers a seamless experience for managing your digital content. With features like AI-powered metadata extraction, folder-based organization, and secret key sharing, Carter ensures that your bookmarks are not only well-organized but also easily accessible across devices.

## 🖼️ Demo & Screenshots

Here's a quick look at how **Carter** works:

![Carter Dashboard](https://firebasestorage.googleapis.com/v0/b/resume-builder-2024-3d12f.appspot.com/o/carter%2FScreenshot%202025-01-29%20031458.png?alt=media&token=283d9136-7ac1-4d54-9a96-273e829043a0)
*The sleek and minimalistic dashboard of Carter.*

![AI Metadata Extraction](https://firebasestorage.googleapis.com/v0/b/resume-builder-2024-3d12f.appspot.com/o/carter%2FScreenshot%202025-01-30%20173649.png?alt=media&token=cc04b223-fed6-4e76-b8ab-f8708a223fb8)
*Carter automatically extracts metadata from the links you save.*

![Folder Organization](https://firebasestorage.googleapis.com/v0/b/resume-builder-2024-3d12f.appspot.com/o/carter%2FScreenshot%202025-01-30%20173837.png?alt=media&token=806de660-0caf-463f-b409-64eeafe6c015)
*move your folder to trash and resotre or delte them*

![Secret Key Sharing](https://firebasestorage.googleapis.com/v0/b/resume-builder-2024-3d12f.appspot.com/o/carter%2FScreenshot%202025-01-30%20174023.png?alt=media&token=89f40088-5964-42eb-ba24-92e3741cfb17)
*Share folders securely using a secret key.*

![Chrome Extension](https://firebasestorage.googleapis.com/v0/b/resume-builder-2024-3d12f.appspot.com/o/carter%2FScreenshot%202025-01-30%20174237.png?alt=media&token=8ab006ab-ba2f-4829-8148-9e549bbfdeaf)
*Save links directly from your browser using the Carter Chrome Extension.*

## ⚡ Features

### Core Features:
- **Save and Organize Links**: Save URLs in a structured format and categorize them for easy access.
- **AI-Powered Metadata Extraction**: Automatically fetches metadata such as title, description, and representative image when saving a link.
- **Folder-Based Organization**: Create, rename, and manage folders to keep your links organized.
- **Secret Key Sharing**: Share folders securely with others via a unique secret key.
- **Real-Time Updates**: Built on a serverless architecture, ensuring instant updates across all devices.
- **Carter Chrome Extension**: A lightweight browser extension to quickly save links without leaving your current tab.
- **Minimal UI & Blazing-Fast Performance**: Designed with simplicity and speed in mind, offering an optimized user experience.

## 🔧 Tech Stack

**Carter** is built using cutting-edge technologies to ensure scalability, security, and performance:

- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
  
- **Backend**: 
  - [Node.js](https://nodejs.org/) (JavaScript runtime)
  - [NestJS](https://nestjs.com/) (Progressive Node.js framework)
  - [Prisma](https://www.prisma.io/) (Type-safe database ORM)

- **Database**: 
  - [PostgreSQL](https://www.postgresql.org/) / [Supabase](https://supabase.com/) (Relational database with real-time capabilities)

- **Authentication**: 
  - [NextAuth.js](https://next-auth.js.org/) (Authentication for Next.js)

- **Storage**: 
  - [Gaia Storage](https://hub.blockstack.org/) (Decentralized storage for Web3 integration)

- **Deployment**: 
  - [Vercel](https://vercel.com/) (Frontend deployment)
  - [Cloudflare Workers](https://workers.cloudflare.com/) (Serverless backend)

## 💻 Installation & Setup

Follow these steps to get **Carter** up and running on your local machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Alkush-Pipania/Carter.git
   cd Carter
2. **Install Dependencies**
   ```bash
   npm install

3. **Set Up Environment Variables**
   ```bash  
   Create a `.env` file in the root directory and configure the following environment variables:
   DATABASE_URL
   JWT_SECRET
   RESEND_API_KEY
   
# Note: You can obtain these keys by setting up with prism , NextAuth, and getting database url .

4. Run the Development Server
   ```bash
   npm run dev

# The app should now be running on http://localhost:3000.