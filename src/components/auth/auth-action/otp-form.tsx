'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, RefreshCw } from 'lucide-react'
import { CooldownTimer } from '@/components/auth/auth-action/CooldownTimer'
import { API_ENDPOINTS } from '@/services/apiEndpoints'
import { postCarter } from '@/services/API_Services'
import { toast } from 'sonner'
import Loader from '@/components/common/Loader'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

interface OtpFormProps {
  email: string
  onSubmit: (otp: string, password: string, form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>) => void | Promise<void>
  onBack: () => void
  isLoading: boolean
  showCooldownFromStart?: boolean
}

const COOLDOWN_PERIOD_MS = 2 * 60 * 1000 // 2 minutes, matching backend

export default function OtpForm({ email, onSubmit, onBack, isLoading, showCooldownFromStart = true }: OtpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isCooldown, setIsCooldown] = useState(showCooldownFromStart)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Check localStorage on initial load to see if there's an active cooldown
  useEffect(() => {
    const storedCooldown = localStorage.getItem('otpCooldownExpiry')
    const storedEmail = localStorage.getItem('otpCooldownEmail')

    if (storedCooldown && storedEmail && storedEmail === email) {
      const expiryTime = parseInt(storedCooldown, 10)
      const now = Date.now()

      if (expiryTime > now) {
        setIsCooldown(true)
      } else {
        // Clear expired cooldown
        localStorage.removeItem('otpCooldownExpiry')
        localStorage.removeItem('otpCooldownEmail')
      }
    }
  }, [email])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.otp, values.password, form);
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      const response = await postCarter(API_ENDPOINTS.OtpSent, { email });
      if (response.success) {
        // Set cooldown
        setIsCooldown(true)
        const expiryTime = Date.now() + COOLDOWN_PERIOD_MS
        localStorage.setItem('otpCooldownExpiry', expiryTime.toString())
        localStorage.setItem('otpCooldownEmail', email)

        toast.success('Verification code resent to your email')
      } else {
        toast.error(response.message || 'Failed to resend verification code')
      }
    } catch (error: unknown) {
      let message = 'Something went wrong';
      if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: string }).message === 'string') {
        message = (error as { message?: string }).message || message;
      }
      toast.error(message)
    } finally {
      setIsResending(false)
    }
  }

  const handleCooldownComplete = () => {
    setIsCooldown(false)
    localStorage.removeItem('otpCooldownExpiry')
    localStorage.removeItem('otpCooldownEmail')
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Reset Your Password</h2>
        <p className="text-sm text-gray-500">
          Enter the verification code sent to {email}
        </p>
      </div>

      {/* Always show the cooldown timer at the top when active */}
      {isCooldown && (
        <CooldownTimer
          durationMs={COOLDOWN_PERIOD_MS}
          onComplete={handleCooldownComplete}
          isActive={isCooldown}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      disabled={isLoading}
                      className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 text-center tracking-[0.5em] text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-center" />
                </FormItem>
              )}
            />

            {!isCooldown && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOtp}
                disabled={isResending || isLoading}
                className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
                {isResending ? 'Sending...' : "Resend OTP code"}
              </Button>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Create New Password</h3>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 pr-12 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 h-auto hover:bg-transparent text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm New Password"
                      className="h-12 rounded-full border-gray-200 bg-gray-50 px-4 text-gray-900 placeholder:text-gray-400 focus-visible:ring-purple-500"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3 mt-4">
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-purple-500 text-white hover:bg-purple-600 font-medium"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : 'Reset Password'}
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              className="w-full text-sm text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              Back to Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
