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
    console.log("Checking for existing tokens");
    try {
      await prisma.$executeRaw`
        DELETE FROM "Verification" 
        WHERE email = ${email}
      `;
      console.log("Deleted existing tokens for email");
    } catch (deleteError) {
      console.error("Error deleting existing tokens:", deleteError);
      // Continue even if delete fails - we'll use ON CONFLICT below
    }

    // Check if the Verification table exists
    console.log("Checking if Verification table exists");
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'Verification'
        ) as exists
      `;
      console.log("Verification table exists check:", tableExists);
      
      if (!tableExists || !Array.isArray(tableExists) || 
          !tableExists[0] || !tableExists[0].exists) {
        console.log("Creating Verification table");
        await prisma.$executeRaw`
          CREATE TABLE IF NOT EXISTS "Verification" (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            token TEXT NOT NULL,
            expires TIMESTAMP WITH TIME ZONE NOT NULL,
            UNIQUE(email, token)
          )
        `;
        console.log("Verification table created");
      }
    } catch (tableCheckError) {
      console.error("Error checking Verification table:", tableCheckError);
      // Try to create the table anyway
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "Verification" (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          token TEXT NOT NULL,
          expires TIMESTAMP WITH TIME ZONE NOT NULL,
          UNIQUE(email, token)
        )
      `;
    }

    // Create a new verification token
    console.log("Creating new verification token");
    const id = uuidv4();
    const expiresISO = expires.toISOString();
    
    const result = await prisma.$executeRaw`
      INSERT INTO "Verification" (id, email, token, expires)
      VALUES (${id}, ${email}, ${token}, ${expiresISO})
      ON CONFLICT (email, token) DO UPDATE
      SET expires = ${expiresISO}
      RETURNING *
    `;
    
    console.log("Token created:", result);
    
    return {
      id,
      email,
      token,
      expires
    };
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw error;
  }
}

