import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists in waitlist
    const existingWaitlist = await prisma.waitlist.findUnique({
      where: { email }
    });

    if (existingWaitlist) {
      return NextResponse.json(
        { message: "You are already on the waitlist!" },
        { status: 409 }
      );
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