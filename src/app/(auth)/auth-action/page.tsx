'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EmailForm from './_components/email-form'
import OtpForm from './_components/otp-form'
import { API_ENDPOINTS } from '@/services/apiEndpoints'
import { postCarter } from '@/services/API_Services'
import { toast } from 'sonner'

type Step = 'email' | 'verification' | 'success'
const COOLDOWN_PERIOD_MS = 2 * 60 * 1000 // 2 minutes, matching backend

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleEmailSubmit = async (email: string, emailForm: any) => {
    setIsLoading(true)
    try {
      const response = await postCarter(API_ENDPOINTS.OtpSent, { email });
      if (response.success) {
        // Set cooldown when OTP is sent
        const expiryTime = Date.now() + COOLDOWN_PERIOD_MS
        localStorage.setItem('otpCooldownExpiry', expiryTime.toString())
        localStorage.setItem('otpCooldownEmail', email)
        
        setEmail(email)
        setIsLoading(false)
        setCurrentStep('verification')
        toast.success('Verification code sent to your email')
      } else {
        // Handle specific error messages from the backend
        const errorMessage = response.message || 'Failed to send verification code'
        emailForm.setError('email', { message: errorMessage })
        setIsLoading(false)
      }
    } catch (error: any) {
      // Extract error message from the API response if available
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong'
      
      // Check if it's a "User not found" error
      if (errorMessage.includes('User not found')) {
        emailForm.setError('email', { message: 'No account exists with this email address' })
      } else {
        emailForm.setError('email', { message: errorMessage })
      }
      
      setIsLoading(false)
    }
  }

  const handleOtpAndPasswordSubmit = async (otp: string, password: string, form: any) => {
    setIsLoading(true)
    try {
      // Send OTP verification and password update in one request
      const response = await postCarter(API_ENDPOINTS.Verification, {
        email,
        otp,
        password
      });
      
      setIsLoading(false)
      setCurrentStep('success')
      toast.success('Password updated successfully')
      
      // Clear the cooldown when password is reset successfully
      localStorage.removeItem('otpCooldownExpiry')
      localStorage.removeItem('otpCooldownEmail')
    } catch (error: any) {
      form.setError('otp', { message: 'Invalid OTP or server error' })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full px-4 sm:px-6 items-center flex-col justify-center text-white">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      />
      <div className="z-10 w-full max-w-md mx-auto space-y-8">

        {currentStep === 'email' && (
          <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
        )}
        
        {currentStep === 'verification' && (
          <OtpForm
            email={email}
            onSubmit={handleOtpAndPasswordSubmit}
            onBack={() => setCurrentStep('email')}
            isLoading={isLoading}
            showCooldownFromStart={true}
          />
        )}

        {currentStep === 'success' && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-text-primary">Password Updated!</h2>
            <p className="text-gray-400">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Link
              href="/signin"
              className="block rounded-lg px-4 py-3 font-medium text-black bg-text-primary hover:bg-white/80"
            >
              Back to Sign In
            </Link>
          </div>
        )}

        {/* Sign Up Link */}
        <div className="pt-6 text-center">
          <span className="text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-primary mx-2 text-zinc-200 underline hover:text-white"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

