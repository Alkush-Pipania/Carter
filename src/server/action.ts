import prisma from "@/lib/prisma";


export const getVerificationTokenbyEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verification.findFirst({
      where: {
        email: email
      }
    })

    return verificationToken;
  } catch (e) {
    console.log("something up with the server")
  }
}
