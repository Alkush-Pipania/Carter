"use server";
import { Resend } from "resend";
import VerificationEmail from "../../emails/FogotPasswordmail";
import MainVerificationEmail from "../../emails/verificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email : string, token : string) => {
  try{
    const res = await resend.emails.send({
      from : "Carter <noreply@carter.fun>" ,
      to : email,
      subject : 'Carter - verification code',
      react : MainVerificationEmail({email ,token})
    })
    return {success : true , message : "Email sent successfully"}
  }catch(emailError){
    console.error("Error sending email" , emailError);
    return {success : false , message : "Failed to send email"}
  }
}


export const sendFogotpasswordmail = async (email : string, token : string , username : string ) => {
    try{
      const res = await resend.emails.send({
        from : "Carter <noreply@carter.fun>" ,
        to : email,
        subject : 'Carter - Forgot Password OTP',
        react : VerificationEmail({email ,token})
      })
      return {success : true , message : "Email sent successfully"}
    }catch(emailError){
      console.error("Error sending email" , emailError);
      return {success : false , message : "Failed to send email"}
    }
}













