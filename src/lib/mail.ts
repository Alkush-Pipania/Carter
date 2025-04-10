"use server";
import { Resend } from "resend";
import MainVerificationEmail from "../../emails/verificationEmail";

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












