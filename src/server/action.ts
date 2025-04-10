import prisma from "@/lib/prisma";

export const getVerificationTokenbyEmail = async (email: string) => {
  try {
    console.log("Getting verification token for email:", email);
    
    // Use Prisma findFirst instead of raw SQL
    const token = await prisma.verification.findFirst({
      where: {
        email: email
      },
      orderBy: {
        expires: 'desc'
      }
    });
    
    if (!token) {
      console.log("No token found for email:", email);
      return null;
    }
    
    console.log("Token found:", token);
    return token;
  } catch (e) {
    console.error("Error getting verification token:", e);
    console.log("Something wrong with the server");
    return null;
  }
}
