"use client"
import { FormSchema } from '@/lib/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import Image from 'next/image'
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
    try {
      const res = await login("credentials", { email, password });
      if (!res?.error) {
        window.location.href = "/redirect";
      } else {
        setSubmitError("Invalid email or password");
        setLoading(false);
      }
    } catch (e) {
      console.error("Login error:", e);
      setSubmitError("Internal server error");
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center gap-6">
      {/* Logo with purple background */}
      <Link href="/" className="mb-2">
        <div className="bg-black rounded-2xl p-2 flex items-center justify-center shadow-lg shadow-black/30">
          <Image
            src="/2alabs.png"
            alt="2aLabs"
            width={64}
            height={64}
            priority
            unoptimized
            className="w-16"
          />
        </div>
      </Link>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Log in to Carter
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your AI-powered bookmarks
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Email address'
                    className="h-12 rounded-full border-gray-200 bg-gray-50 px-4"
                    {...field}
                  />
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
                      className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 pr-12"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 h-auto hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {submitError && <FormMessage>{submitError}</FormMessage>}

          <Button
            className='w-full h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium'
            type='submit'
            disabled={isLoading || loading}
          >
            {!isLoading && !loading ? 'Continue with email' : <Loader />}
          </Button>
        </form>
      </Form>

      {/* Forgot Password */}
      <Link
        href="/auth-action"
        className='text-sm text-gray-500 hover:text-purple-600 transition-colors'
      >
        Forgot Password?
      </Link>

      {/* Divider */}
      <div className="relative flex items-center gap-4 w-full">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Social Auth */}
      <div className='flex gap-3 w-full'>
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
          onClick={() => {
            setAuthLoading(true)
            login("github")
            setAuthLoading(false)
          }}
          provider='Github'
        />
      </div>

      {/* Register Link */}
      <p className='text-sm text-gray-500'>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className='text-purple-600 hover:text-purple-700 font-medium'>
          Register
        </Link>
      </p>
    </main>
  )
}

export default Signin
