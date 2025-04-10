import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Verify OTP
    const verificationResult = await verifyOTPdb(otp, email);

    if (verificationResult.error) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Add user to waitlist
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email,
        joinedAt: new Date(),
      },
    });

    // Get queue position
    const queuePosition = await prisma.waitlist.count({
      where: {
        joinedAt: {
          lte: waitlistEntry.joinedAt,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Successfully verified and added to waitlist",
        queuePosition
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function verifyOTPdb(value: any, email: string) {
  if (!value) {
    return { error: true, message: "no otp given" }
  }
  try {
    await prisma.verification.findFirst({
      where: {
        email: email,
        token: value,
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}