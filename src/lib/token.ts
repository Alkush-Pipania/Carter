"use server"
import { getforgotpasswordTokenbyEmail, getVerificationTokenbyEmail } from '@/server/action';
import { v4 as uuidv4 } from 'uuid';
import prisma from './prisma';



export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
    .replace(/\D/g, '')
    .slice(0, 6);
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hour



  const existingToken = await getVerificationTokenbyEmail(email);

  if (existingToken) {
    await prisma.verification.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await prisma.verification.create({
    data: {
      email,
      token,
      expires: new Date(expires)
    }
  })

  return verificationToken;
}

