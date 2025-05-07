"use client"
import { SignupSchema } from '@/lib/types/zod'
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
import Image from 'next/image'
import { Loader2, X } from 'lucide-react'
import { Label } from '@/components/ui/label'

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
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
    defaultValues: { username:'', email: '', password: '' },
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

        <div className="grid gap-2">
          <Label htmlFor="image" className='text-gray-400'>Profile Image (optional)</Label>
          <div className="flex items-end gap-4">
            {imagePreview && (
              <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                {imageLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                )}
              </div>
            )}
            <div className="flex items-center gap-2 w-full">
              <div className="relative w-full">
                <input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isLoading || imageLoading}
                />
                <div className="w-full flex items-center px-3 py-2 border border-gray-400 rounded-md text-sm">
                  <span className="truncate text-gray-500">
                    {image ? image.name : "No file chosen"}
                  </span>
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || imageLoading}
                >
                  Browse
                </Button>
              </div>
              {imagePreview && (
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <Button className='w-full p-6' type='submit' size='lg'
          disabled={isLoading || imageLoading}>
          {isLoading || loading ? <Loader /> : 'Sign up'}
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
