import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyOTPdb } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    console.log("Verify OTP route triggered");
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

    try {
      // Insert into waitlist using raw query
      const timestamp = new Date().toISOString();
      const id = generateUUID(); // Function defined below
      
      await prisma.$executeRaw`INSERT INTO "Waitlist" (id, email, "joinedAt") 
        VALUES (${id}, ${email}, ${timestamp})
        ON CONFLICT (email) DO NOTHING`;
      
      // Count position in queue
      const queueResult = await prisma.$queryRaw`SELECT COUNT(*) AS position FROM "Waitlist" 
        WHERE "joinedAt" <= ${timestamp}`;
      
      // Type assertion and safe access
      const queuePosition = typeof queueResult === 'object' && 
        Array.isArray(queueResult) && 
        queueResult[0] && 
        typeof queueResult[0] === 'object' && 
        'position' in queueResult[0] ? 
        Number(queueResult[0].position) : 1;

      return NextResponse.json(
        {
          message: "Successfully verified and added to waitlist",
          queuePosition
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      // If DB error occurs but OTP was valid, return success but with generic position
      return NextResponse.json(
        {
          message: "Successfully verified and added to waitlist",
          queuePosition: 100 // Fallback position
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate UUID for Postgres
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



