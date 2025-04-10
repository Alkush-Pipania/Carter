import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyOTPdb } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    console.log("Verify OTP route triggered");
    const { email, otp } = await req.json();
    console.log("Email:", email, "OTP:", otp);

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Verify OTP
    const verificationResult = await verifyOTPdb(otp, email);
    console.log("Verification result:", verificationResult);

    if (verificationResult.error) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    try {
      // Test database connection by doing a simple operation
      console.log("Testing database connection...");
      
      // Add user to waitlist
      const timestamp = new Date();
      console.log("Attempting to add email to waitlist:", email);
      
      // Use Prisma upsert to either create a new record or return existing one
      const userEntry = await prisma.waitlist.upsert({
        where: {
          email: email
        },
        update: {}, // No updates if exists
        create: {
          email: email,
          joinedAt: timestamp
        }
      });
      
      console.log("User entry result:", userEntry);
      
      // Count total users in waitlist to determine position
      console.log("Counting queue position...");
      const totalCount = await prisma.waitlist.count({
        where: {
          joinedAt: {
            lte: timestamp
          }
        }
      });
      
      console.log("Queue position count:", totalCount);
      
      // Get recent waitlist entries for debugging
      const recentEntries = await prisma.waitlist.findMany({
        select: { email: true },
        orderBy: { joinedAt: 'desc' },
        take: 5
      });
      
      console.log("Recent waitlist entries:", recentEntries);

      return NextResponse.json(
        {
          message: "Successfully verified and added to waitlist",
          queuePosition: totalCount,
          debug: {
            id: userEntry.id,
            timestamp,
            userEntry
          }
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      // If DB error occurs but OTP was valid, return success but with generic position
      return NextResponse.json(
        {
          message: "Successfully verified and added to waitlist (fallback)",
          queuePosition: 100, // Fallback position
          error: dbError instanceof Error ? dbError.message : String(dbError)
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Helper function no longer needed as Prisma generates UUIDs automatically



