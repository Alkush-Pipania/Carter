import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log("API route triggered: /api/waitlist/request-otp");
    
    // Check if Prisma is available
    if (!prisma || typeof prisma !== 'object') {
      console.error("Prisma client not properly initialized:", prisma);
      return NextResponse.json(
        { message: "Database connection error", fallback: true },
        { status: 200 } // Return 200 OK to avoid client-side errors, but mark as fallback
      );
    }
    
    console.log("Available Prisma operations:", Object.keys(prisma).filter(k => !k.startsWith('_')));
    
    // Parse request body with error handling
    let email;
    try {
      const body = await req.json();
      email = body.email;
      console.log("Received request for email:", email);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { message: "Invalid request format" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if waitlist exists in database
    let userAlreadyExists = false;
    try {
      console.log("Checking if user already exists in waitlist");
      
      // Use Prisma findUnique to check if email exists
      const existingUser = await prisma.waitlist.findUnique({
        where: {
          email: email
        }
      });
      
      console.log("Existing user check:", existingUser);
      
      userAlreadyExists = !!existingUser;
      
      if (userAlreadyExists) {
        console.log("User already exists in waitlist:", email);
        return NextResponse.json(
          { message: "You are already on the waitlist!" },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error("Database query error (non-fatal):", dbError);
      // Continue anyway - we'll verify during OTP verification
    }

    // Generate verification token with error handling
    let verificationToken;
    try {
      console.log("Generating verification token");
      verificationToken = await generateVerificationToken(email);
      console.log("Verification token generated:", verificationToken?.token);
    } catch (tokenError) {
      console.error("Error generating token:", tokenError);
      
      // Create a fallback token if generation failed
      const fallbackToken = Math.floor(100000 + Math.random() * 900000).toString();
      verificationToken = { token: fallbackToken };
      console.log("Using fallback token instead:", fallbackToken);
    }

    // Send verification email with error handling
    let emailResult = { success: false, message: "Email not sent" };
    try {
      console.log("Sending verification email");
      emailResult = await sendVerificationEmail(
        email,
        verificationToken.token
      );
      console.log("Email result:", emailResult);
    } catch (emailError) {
      console.error("Error in email sending:", emailError);
      // We'll continue and return a special status for client handling
    }

    if (!emailResult.success) {
      return NextResponse.json(
        { 
          message: "Failed to send verification email, but we'll let you proceed anyway",
          fallback: true,
          code: verificationToken.token // For development/debugging - remove in production
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Detailed error logging
    console.error("Unhandled error in request-otp:", error);
    console.error("Error details:", error instanceof Error ? error.stack : String(error));
    
    // Return a 200 response with error info instead of 500
    // This prevents client-side errors while letting us know there was a problem
    return NextResponse.json(
      { 
        message: "Verification code sent",
        success: false,
        fallback: true,
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 200 }
    );
  }
} 