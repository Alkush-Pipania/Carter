import { NextResponse } from "next/server"
import { generateOTP, storeOTP } from "@/lib/otp-service"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Check if email already exists in waitlist
    const existingUser = await checkExistingUser(email)
    if (existingUser) {
      return NextResponse.json({ message: "Email already in waitlist" }, { status: 409 })
    }

    // Generate a 6-digit OTP
    const otp = generateOTP()

    // Store OTP with email (in memory or database)
    await storeOTP(email, otp)

    // In a real application, you would send this OTP via email
    // For demo purposes, we'll just log it
    console.log(`OTP for ${email}: ${otp}`)

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in request-otp:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

async function checkExistingUser(email: string): Promise<boolean> {
  // In a real application, you would check your database
  // For demo purposes, we'll assume no existing users
  return false
}
