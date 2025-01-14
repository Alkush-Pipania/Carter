
import { z } from 'zod';

export const FormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid email' }),
  password: z.string().describe("Password").min(8, { message: 'Password must be at least 8 characters long' })

})


export const SignupSchema = z.object({
  username: z.string().describe('Username').min(4, { message: 'Username must be at least 4 characters long' }),
  email: z.string().describe('Email').email({ message: 'Invalid email' }),
  password: z.string().describe("Password").min(8, { message: 'Password must be at least 8 characters long' })

})

export const AddLinkSchema = z.object({
  url: z.string().describe('Url').url({ message: 'Invalid url' }),
  title: z.string().describe('Title').max(280, { message: 'limit reached' }).min(2,{message: "invalid title"}),
  description: z.string().describe("Description").max(1200, { message: 'limit reached' }).min(4,{message: "invalid description"})
})

export const SecretinputSchema = z.object({
  secret: z
    .string()
    .uuid({ message: "Invalid secret code" })
    .describe("A valid Secret code"),
});

export const EditProfileSchema = z.object({
  username: z.string().describe('Username').min(4, { message: 'Username must be at least 4 characters long' }),
  email: z.string().describe('Email').email({ message: 'Invalid email' }),
})


export const CreateLinkCartSchema = z.object({
  name: z
  .string({
    required_error: "Name is required", 
  })
  .min(1, { message: "Name must be at least 1 character long" })
  .max(20, { message: "Too long to be a name" }),
})

export const updateusername = z.object({
  username: z.string().describe('Username').min(4, { message: 'Username must be at least 4 characters long' }),
})

// export const OTPSchema = z.object({
//   otp: z.string()
//     .length(6, { message: "OTP must be exactly 6 digits" })
//     .regex(/^\d+$/, { message: "OTP must contain only numbers" })
// });

export const OTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits")
});

export const DeleteAccountSchema = z.object({
  email: z.string().email({ message: 'Invalid email' })
})