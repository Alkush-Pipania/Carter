"use client"
import { SignupSchema } from '@/lib/zod'
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
import Image from 'next/image'
import { Loader2, X, Eye, EyeOff } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { login } from '@/lib/actions/auth'
import AuthButton from '@/components/auth/Github-auth-button'

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof SignupSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignupSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async (FormData) => {
    setLoading(true);
    const { username, email, password } = FormData;

    try {
      const imageBase64 = image ? await convertImageToBase64(image) : null;

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image: imageBase64
        }),
      });

      if (response.ok) {
        // Automatically log the user in
        const signInResult = await login("credentials", {
          email,
          password,
        });

        if (signInResult?.error) {
          setSubmitError("something up with the server");
        } else {
          router.push("/dashboard");
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
    <div className="w-full flex flex-col items-center gap-6">
      {/* Logo with purple background */}
      <Link href="/" className="mb-2">
        <div className="bg-black p-2 rounded-2xl flex items-center justify-center shadow-lg shadow-black/60">
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
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Start your journey with Carter today
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            disabled={isLoading}
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Username'
                    className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Email address'
                    className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 pr-12 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 h-auto hover:bg-transparent text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="image" className='text-sm text-gray-600 ml-1'>Profile Image (optional)</Label>
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  imageLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  ) : (
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  )
                ) : (
                  <span className="text-xs text-gray-400 text-center px-1">Upload Photo</span>
                )}
              </div>

              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading || imageLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs px-4"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || imageLoading}
                >
                  Choose File
                </Button>
                {image && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {image.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setImagePreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {submitError && <FormMessage className="text-center">{submitError}</FormMessage>}

          <Button
            className='w-full h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium mt-2'
            type='submit'
            disabled={isLoading || imageLoading || loading}
          >
            {isLoading || loading ? <Loader /> : 'Sign up'}
          </Button>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className='flex gap-3 w-full'>
            <AuthButton
              onClick={() => {
                setAuthLoading(true)
                login("google")
                setAuthLoading(false)
              }}
              isLoading={authLoading}
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

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/signin" className="text-purple-600 hover:text-purple-700 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
