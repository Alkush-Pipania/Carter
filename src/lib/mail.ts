"use server";
import { Resend } from "resend";
import MainVerificationEmail from "../../emails/verificationEmail";
import prisma from "./prisma";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "Carter <noreply@carter.fun>",
      to: email,
      subject: 'Carter - verification code',
      react: MainVerificationEmail({ email, token })
    })
    return { success: true, message: "Email sent successfully" }
  } catch (emailError) {
    console.error("Error sending email", emailError);
    return { success: false, message: "Failed to send email" }
  }
}


export async function verifyOTPdb(value: any, email: string) {
  console.log("verifyOTPdb called with:", value, email);
  if (!value) {
    console.log("No OTP given");
    return { error: true, message: "no otp given" }
  }
  try {
    console.log("Looking for verification token in database");
    
    // Use Prisma findFirst to look for the token
    const verification = await prisma.verification.findFirst({
      where: {
        email: email,
        token: value
      }
    });
    
    console.log("Verification query result:", verification);
    
    // Check if we found a matching verification record
    if (!verification) {
      console.log("No verification record found");
      return { error: true, message: "invalid code" };
    }
    
    console.log("Verification record found:", verification);
    
    // Check if the token has expired
    const now = new Date();
    const expires = new Date(verification.expires);
    if (expires < now) {
      console.log("Token has expired", expires, now);
      return { error: true, message: "code expired" };
    }
    
    console.log("Token verified successfully");
    return { error: false, message: "success" };
  } catch (e) {
    console.error("Error in verifyOTPdb:", e);
    return { error: true, message: "database error", details: e instanceof Error ? e.message : String(e) }
  }
}












