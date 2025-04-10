const otpStore: Record<string, { otp: string; expiresAt: number }> = {}

// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Store OTP with expiration (5 minutes)
export async function storeOTP(email: string, otp: string): Promise<void> {
  const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes from now
  otpStore[email] = { otp, expiresAt }
}

// Verify OTP
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const storedData = otpStore[email]

  if (!storedData) {
    return false
  }

  const { otp: storedOtp, expiresAt } = storedData

  // Check if OTP is expired
  if (Date.now() > expiresAt) {
    delete otpStore[email] // Clean up expired OTP
    return false
  }

  // Check if OTP matches
  const isValid = storedOtp === otp

  if (isValid) {
    delete otpStore[email] // Clean up used OTP
  }

  return isValid
}
