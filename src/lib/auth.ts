import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Google OAuth credentials are not defined in environment variables');
}

export const authOption = {
  providers: [
    // Credentials Provider for email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        email: { label: "email", type: "text", placeholder: "1234567891", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const existingUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!existingUser) return null;

        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
        if (passwordValidation) {
          return {
            id: existingUser.id.toString(),
            username: existingUser.username,
            email: existingUser.email,
          };
        }
        return null;
      },
    }),
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    // Handle Google sign-in and customize user creation/updating
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Check if user already exists by email
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!dbUser) {
            // New user: Create with Google data and defaults
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                username: user.name || `user_${uuidv4().slice(0, 8)}`,
                password: bcrypt.hashSync(uuidv4(), 10),
                secretkey: uuidv4(),
                varified: true,
              },
            });
          } else {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                username: dbUser.username || user.name,
                updatedAt: new Date(),
              },
            });
          }

          // Attach the database user ID to the user object
          user.id = dbUser.id.toString();
          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    // JWT callback to handle token creation
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    // Session callback to handle session creation and token storage
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
};