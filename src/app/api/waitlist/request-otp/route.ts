import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log("API route triggered");
    console.log("Available Prisma models:", Object.keys(prisma));
    
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    try {
      // Try a direct query to check if the model exists
      const existingWaitlist = await prisma.$queryRaw`SELECT * FROM "Waitlist" WHERE email = ${email} LIMIT 1`;
      console.log("Raw query result:", existingWaitlist);
      
      if (existingWaitlist && Array.isArray(existingWaitlist) && existingWaitlist.length > 0) {
        return NextResponse.json(
          { message: "You are already on the waitlist!" },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error("Database query error:", dbError);
    }

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      verificationToken.token
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        { message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in request-otp:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 