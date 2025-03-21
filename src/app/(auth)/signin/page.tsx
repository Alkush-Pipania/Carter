"use client"
import { FormSchema } from '@/lib/types/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/Loader'
import { signIn, useSession } from 'next-auth/react'
import carterlogo from "../../../../public/logo.png"
import Image from 'next/image'
import GoogleAuthButton from '../_components/google-auth-button'
import { Eye, EyeOff } from "lucide-react"


const Signin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [authloading, setAuthLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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
      redirect: false,
    });

    if (res?.error || !res?.ok) {
      setSubmitError("Invalid email or password");
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/dashboard");
    }
  };

  return (
    <main className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col'>

      <section className='border-b'>
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
        <div className='flex my-5 flex-col items-center justify-center gap-3 w-full'>
          <GoogleAuthButton
            onClick={() => {
              setAuthLoading(true)
              signIn("google")
              setAuthLoading(false)
            }}
            isLoading={authloading}
          />
        </div>
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-400" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Link href="/auth-action" className='text-primary mx-2 text-primary-purple/primary-purple-400 hover:text-primary-purple/primary-purple-300'>
            Forgot Password
          </Link>

          <Button className='w-full p-6' type='submit' size='lg' disabled={isLoading}>
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
