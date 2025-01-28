import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";




export const authOption = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username ", type: "text", placeholder: "username" },
        email: {
          label: "email", type: "text", placeholder: "1234567891",
          required: true
        },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials: any) {
        // Check if the user exists
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        // If the user doesn't exist, reject the login attempt
        if (!existingUser) {
          return null;
        }

        // Validate the password
        const passwordValidation = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        // If the password is valid, return the user object
        if (passwordValidation) {
          return {
            id: existingUser.id.toString(),
            username: existingUser.username,
            email: existingUser.email,
          };
        }

        // If the password is invalid, reject the login attempt
        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    //fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    }
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  }

}