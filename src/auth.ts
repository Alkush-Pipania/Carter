import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from './db';
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import config from 'next/config'

config()

export const {auth , handlers , signIn , signOut} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt"
  },
  providers:[
    Github,
    Google, 
    Credentials({
      credentials: {
        
        email: {},
        password: {},
      },
      authorize : async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        
        try {
          // First, find user by email only
          const user = await db.query.users.findFirst({
            where: (users) => eq(users.email, credentials.email as string)
          });
          
          // Log to debug (remove in production)
          console.log("Found user:", user ? "Yes" : "No");
          
          // If no user found or no password stored, authentication fails
          if (!user || !user.password) {
            console.log("User not found or no password");
            return null;
          }
          
          // Compare the provided password with the stored hash
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          
          console.log("Password valid:", isPasswordValid);
          
          // Only return the user if password is valid
          if (!isPasswordValid) {
            return null;
          }
          
          // Return the user data needed by NextAuth
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/signin",
    error: "/signin", 
  }
});