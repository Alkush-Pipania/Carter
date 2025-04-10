import prisma from "@/lib/prisma";

export const getVerificationTokenbyEmail = async (email: string) => {
  try {
    console.log("Getting verification token for email:", email);
    
    // Use raw SQL instead of Prisma model
    const tokens = await prisma.$queryRaw`
      SELECT * FROM "Verification"
      WHERE email = ${email}
      ORDER BY expires DESC
      LIMIT 1
    `;
    
    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      console.log("No token found for email:", email);
      return null;
    }
    
    console.log("Token found:", tokens[0]);
    return tokens[0];
  } catch (e) {
    console.error("Error getting verification token:", e);
    console.log("Something wrong with the server");
    return null;
  }
}
