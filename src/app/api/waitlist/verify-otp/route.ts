import { NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp-service"
import { addToWaitlist, getQueuePosition } from "@/lib/waitlist-service"

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 })
    }

    // Verify the OTP
    const isValid = await verifyOTP(email, otp)
    if (!isValid) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Add user to waitlist
    await addToWaitlist(email)

    // Get queue position
    const queuePosition = await getQueuePosition(email)

    return NextResponse.json(
      {
        message: "Successfully joined waitlist",
        queuePosition,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in verify-otp:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
