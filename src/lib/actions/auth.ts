"use server";

import { signIn, signOut } from "@/auth";

export const login = async (action: string, FormData?: { email: string, password: string }) => {
  if (action == "github") {
     await signIn("github", { redirectTo: '/redirect' });
  }
  else if (action == "google") {
    await signIn("google", { redirectTo: '/redirect' });
  }
  else if (action == "credentials") {
    try {
      // Credentials need to be passed explicitly as separate parameters
      await signIn("credentials", {
        email: FormData?.email,
        password: FormData?.password,
        redirect: false, // Important: let the client handle redirects
      });
      
      return { error: false };
    } catch (e) {
      console.error("Login error:", e);
      return { error: true };
    }
  }
};

export const logout = async () => {
  await signOut({ redirectTo: '/signin' });
};


