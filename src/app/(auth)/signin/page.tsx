"use client"
import { FormSchema } from '@/lib/types/zod'
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
import carterlogo from "../../../../public/logo.png"
import Image from 'next/image'
import { FaGithub } from "react-icons/fa";


const Signin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (status === 'loading') return;
    if (session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);








  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (FormData) => {
    setLoading(true);
    const { email, password } = FormData;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (res?.error || !res?.ok) {
      setSubmitError("Invalid email or password");
    } else {
      setLoading(false);
      router.push("/dashboard");
    }
  };
  return (
    <main className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col'>

      <section className=''>
        <div className=' w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 left-20 sm:top-52 top-40' />
        <Link href='/' className='w-full flex justify-start items-center'>
          <span
            className='font-semibold text-gray-400 hover:text-gray-300 flex items-center justify-center text-xl  first-letter:ml-1 '>
            <Image src={carterlogo} alt='logo' className='w-[50px]' />
            Carter
          </span>
        </Link>
        <span className='text-gray-400 text-xs'>
          Organize, Share, and Manage Your Links with Ease
        </span>
        {/* <div className='flex my-5 flex-col items-center justify-center gap-3 w-full'>
          <Button className='w-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center gap-2' onClick={() => {
            signIn("github")
          }}>
            <FaGithub className='text-2xl' />
            Github</Button>
        </div> */}
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col' >

          <FormField control={form.control}
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

          <FormField control={form.control}
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
          <Link href="/auth-action" className='text-primary mx-2 text-primary-purple/primary-purple-400 hover:text-primary-purple/primary-purple-300'>
            Forgot Password
          </Link>

          <Button className='w-full p-6' type='submit' size='lg'
            disabled={isLoading}>
            {!isLoading || !loading ? 'Sign in' : <Loader />}
          </Button>
        </form>
        <section className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col'>
          <span className='self-center '>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className='text-primary mx-2 text-primary-purple/primary-purple-400 hover:text-primary-purple/primary-purple-300'>
              Sign up
            </Link>
          </span>
        </section>
      </Form>
    </main>
  )
}

export default Signin
