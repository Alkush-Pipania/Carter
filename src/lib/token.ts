"use server"
import { v4 as uuidv4 } from 'uuid';
import prisma from './prisma';

export const generateVerificationToken = async (email: string) => {
  console.log("Generating verification token for email:", email);
  const token = uuidv4()
    .replace(/\D/g, '')
    .slice(0, 6);
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 1); // 1 hour
  
  console.log("Generated token:", token, "expires:", expires);

  try {
    // First try to delete any existing token for this email
    console.log("Deleting existing tokens");
    try {
      await prisma.verification.deleteMany({
        where: { email }
      });
      console.log("Deleted existing tokens for email");
    } catch (deleteError) {
      console.error("Error deleting existing tokens:", deleteError);
    }

    // Create a new verification token using create
    console.log("Creating new verification token");
    
    // Check if we can connect to the database
    try {
      // Create verification token
      const verification = await prisma.verification.create({
        data: {
          id: uuidv4(),
          email,
          token,
          expires
        }
      });
      
      console.log("Token created successfully:", verification);
      
      return {
        id: verification.id,
        email,
        token,
        expires
      };
    } catch (createError) {
      console.error("Failed to create verification in database:", createError);
      // Return token data even if DB save fails, so we can still send email
      return {
        id: uuidv4(),
        email,
        token,
        expires
      };
    }
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw error;
  }
}

