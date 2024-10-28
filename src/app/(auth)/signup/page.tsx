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
import Image from 'next/image'
import carterlogo from "../../../../public/logo.png"

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
    const { username , email, password } = FormData;
    const res = await signIn("credentials", {
      username,
      email,
      password,
      redirect: false
    });

    if (res?.error || !res?.ok) {
      setSubmitError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col
    '>
      <div className='w-[70%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 left-40 top-40'
      />
        <Link href='/' className='w-full flex justify-start items-center'>
        <span
            className='font-semibold text-gray-400 hover:text-gray-300 flex items-center justify-center text-xl  first-letter:ml-1 '>
             <Image src={carterlogo} alt='logo' className='w-[50px]' />
            Carter
          </span>
        </Link>
        <FormDescription className=''>
          Organize, Share, and Manage Your Links with Ease
        </FormDescription>

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
        <span className='self-center '>
           Already have an account?{' '}
          <Link href="/signin" className='text-primary mx-2 text-primary-purple/primary-purple-400 hover:text-primary-purple/primary-purple-300'>
            Sign in
          </Link>
        </span>


      </form>
    </Form>
  )
}

export default Signin
