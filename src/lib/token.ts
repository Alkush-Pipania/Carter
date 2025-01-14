"use server"
import { getforgotpasswordTokenbyEmail, getVerificationTokenbyEmail } from '@/server/db/verification-token';
import { v4 as uuidv4 } from 'uuid';

import prisma from "@/lib/prisma"


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

export const generateForgotPasswordToken = async (email: string) => {
  const token = uuidv4()
    .replace(/\D/g, '')
    .slice(0, 6);
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hour



  const existingToken = await getforgotpasswordTokenbyEmail(email);

  if (existingToken) {
    await prisma.forgotPassword.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const ForgotpasswordToken = await prisma.forgotPassword.create({
    data: {
      email,
      token,
      expires: new Date(expires)
    }
  })

  return ForgotpasswordToken;
}