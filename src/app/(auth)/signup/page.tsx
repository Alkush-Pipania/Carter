"use client"
import { SignupSchema } from '@/lib/types/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/Loader'
import { signIn, useSession } from 'next-auth/react'

const Signin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
 
  useEffect(()=>{
    if (status === 'loading') return;
    if (session) {
      router.push('/');
    } else {
      setLoading(false); 
    }
  },[session, status, router]);


  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof SignupSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignupSchema),
    defaultValues: { username:'', email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async (FormData) => {
    setLoading(true);
    const { username, email, password } = FormData;
  
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        // Automatically log the user in
        const signInResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
  
        if (signInResult?.error) {
          setSubmitError(signInResult.error);
        } else {
          router.push("/dashboard"); // Redirect to home/dashboard
        }
      } else {
        // Attempt to parse the error response
        const data = await response.json().catch(() => null); 
        setSubmitError(data?.message || "Sign-up failed");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("An error occurred during sign-up");
    } finally {
      setLoading(false);
    }
  };
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 max-w-md mx-auto">
        <span className='text-gray-400 text-center text-2xl font-medium '>
          Create a Carter Account
        </span>

        <FormField disabled={isLoading} control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='name' placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField disabled={isLoading} control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField disabled={isLoading} control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <Button className='w-full p-6' type='submit' size='lg'
          disabled={isLoading}>
          {!isLoading || !loading ? 'Sign up' : <Loader />}
        </Button>
        <span className='self-center text-sm'>
          Already have an account?{' '}
          <Link href="/signin" className='text-primary mx-2 text-text-primary hover:text-white underline '>
            Sign in
          </Link>
        </span>
      </form>
    </Form>
  )
}

export default Signin
