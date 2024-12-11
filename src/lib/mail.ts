"use server";

import nodemailer from "nodemailer";

const domain = 'http://localhost:3000';

export const sendVerificationEmail = async (email : string, token : string) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  // Configure the transport service (e.g., Gmail, custom SMTP)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your email provider's SMTP server
    port: 587,
    secure: false, 
    auth: {
      user: "workofalkushpipania@gmail.com", 
      pass: "sosgkuystpvuqqmh",
    },
  });

  
  const mailOptions = {
    from: `workofalkushpipania@gmail.com`, 
    to: email, //
    subject: "Verify your email", 
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, message: "Verification email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};















// "use server"
// import { Resend } from 'resend';

// const resend = new Resend("86cca72e573d527acd89a4560f339bf0ebc48e6f")


// const domain = 'http://localhost:3000'

// export const sendVerificationEmail = async (email : string , token : string) =>{
  
//     const confirmationLink = `${domain}/verify-email?token=${token}`

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to : email,
//     subject : "Verify your email",
//     html : `<p>Click <a href="${confirmationLink}">here</a> to verify your email</p>`
//   })
  
// }