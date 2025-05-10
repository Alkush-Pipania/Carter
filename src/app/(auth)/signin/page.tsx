"use client"
import { FormSchema } from '@/lib/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/Loader'
import { Eye, EyeOff } from "lucide-react"
import { login } from '@/lib/actions/auth'
import AuthButton from '@/components/auth/Github-auth-button'



const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [authloading, setAuthLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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
    console.log(FormData)
    try{
      const res = await login("credentials", {email , password});
      console.log("Auth response:", res);
      
      if(!res?.error){
        window.location.href = "/redirect";
      } else {
        setSubmitError("Invalid email or password");
        setLoading(false);
      }
    } catch(e) {
      console.error("Login error:", e);
      setSubmitError("Internal server error");
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col gap-6">
      <span className='text-slate-800 dark:text-gray-400 text-center text-2xl font-medium transition-colors'>
      Log in to your Account
      </span>
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

          <Button className='w-full p-6' type='submit' size='lg' disabled={isLoading}>
            {!isLoading || !loading ? 'Sign in' : <Loader />}
          </Button>
          
        </form>
      </Form>
      <Link href="/auth-action" className='text-center mx-2 text-sm text-primary dark:text-text-primary hover:text-primary/80 dark:hover:text-white transition-colors'>
            Forgot Password?
          </Link>
      <div className='flex flex-col gap-3 w-full'>
        <AuthButton
          onClick={() => {
            setAuthLoading(true)
            login("google")
            setAuthLoading(false)
          }}
          isLoading={authloading}
          provider='Google'
        />
        <AuthButton
        onClick={()=>{
          setAuthLoading(true)
          login("github")
          setAuthLoading(false)

        }}
        provider='Github'
        />
      </div>
      <section className='w-full md:justify-center sm:justify-center sm:w-[400px] space-y-5 flex flex-col'>
          <span className='self-center text-slate-700 dark:text-gray-400 transition-colors'>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className='mx-2 text-primary dark:text-text-primary hover:text-primary/80 dark:hover:text-white underline transition-colors'>
              Sign up
            </Link>
          </span>
        </section>
    </main>
  )
}

export default Signin

