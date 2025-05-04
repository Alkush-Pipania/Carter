'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, RefreshCw } from 'lucide-react'
import { CooldownTimer } from './CooldownTimer'
import { API_ENDPOINTS } from '@/services/apiEndpoints'
import { postCarter } from '@/services/API_Services'
import { toast } from 'sonner'

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
  onSubmit: (otp: string, password: string, form: any) => void
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
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
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
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-2xl font-bold">Reset Your Password</h2>
        <p className="text-sm sm:text-base text-gray-400">
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
                    className="rounded-lg border border-gray-600 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 active:border-white/80 focus:outline-none w-full text-sm sm:text-base text-start tracking-wider"
                  />
                  </FormControl>
                  <FormMessage className="text-sm text-center" />
                </FormItem>
              )}
            />
            
            {!isCooldown && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtp}
                disabled={isResending || isLoading}
                className="w-full text-sm text-zinc-300 hover:text-white border-zinc-700 py-2 flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
                {isResending ? 'Sending...' : "Didn't receive code? Resend OTP"}
              </Button>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <h3 className="text-base font-medium mb-3">Create New Password</h3>
            
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
                        className="rounded-lg border border-zinc-600 hover:border-white/50 active:border-white/80 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none w-full text-sm sm:text-base pr-12"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white bg-none hover:bg-transparent"
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
                      className="rounded-lg border border-zinc-600 hover:border-white/50 active:border-white/80 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none w-full text-sm sm:text-base"
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
              className="w-full rounded-lg px-4 py-2 sm:py-3 font-medium text-black bg-white/80 hover:bg-pureWhite hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030014] disabled:opacity-50 text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="link"
              className="w-full text-sm sm:text-base text-zinc-200 hover:text-opacity-80"
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

