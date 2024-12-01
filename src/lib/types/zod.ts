
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
  title: z.string().describe('Title').max(40, { message: 'limit reached' }).min(4,{message: "invalid title"}),
  description: z.string().describe("Description").max(60, { message: 'limit reached' }).min(4,{message: "invalid description"})
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
