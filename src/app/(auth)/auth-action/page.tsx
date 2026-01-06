'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import EmailForm from '@/components/auth/auth-action/email-form'
import OtpForm from '@/components/auth/auth-action/otp-form'
import { API_ENDPOINTS } from '@/services/apiEndpoints'
import { postCarter } from '@/services/API_Services'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type Step = 'email' | 'verification' | 'success'
const COOLDOWN_PERIOD_MS = 2 * 60 * 1000

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (email: string, form: ReturnType<typeof useForm<{ email?: string }>>) => {
    setIsLoading(true)
    try {
      await postCarter(API_ENDPOINTS.OtpSent, { email });
      const expiryTime = Date.now() + COOLDOWN_PERIOD_MS
      localStorage.setItem('otpCooldownExpiry', expiryTime.toString())
      localStorage.setItem('otpCooldownEmail', email)
      setEmail(email)
      setIsLoading(false)
      setCurrentStep('verification')
      toast.success('Verification code sent to your email')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong'
      if (typeof error === 'object' && error !== null) {
        if ('response' in error && typeof error.response === 'object' && error.response !== null && 'data' in error.response && typeof error.response.data === 'object' && error.response.data !== null && 'message' in error.response.data) {
          errorMessage = (error.response.data as { message?: string }).message || errorMessage
        } else if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message
        }
      }
      if (errorMessage.includes('User not found')) {
        form.setError('email', { message: 'No account exists with this email address' })
      } else {
        form.setError('email', { message: errorMessage })
      }
      setIsLoading(false)
    }
  }

  const handleOtpAndPasswordSubmit = async (otp: string, password: string, form: ReturnType<typeof useForm<{ otp?: string; password?: string; confirmPassword?: string }>>) => {
    setIsLoading(true)
    try {
      // Send OTP verification and password update in one request
      await postCarter(API_ENDPOINTS.Verification, {
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
    } catch (error: unknown) {
      form.setError('otp', { message: 'Invalid OTP or server error' })
      setIsLoading(false)
    }
  }

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

      <div className="w-full">
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
            <h2 className="text-2xl font-bold text-gray-900">Password Updated!</h2>
            <p className="text-gray-500">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Link href="/signin">
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium h-12">
                Back to Sign In
              </Button>
            </Link>
          </div>
        )}

        {/* Sign Up Link */}
        {currentStep !== 'success' && (
          <div className="pt-6 text-center">
            <span className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-purple-600 font-medium hover:text-purple-700 mx-2"
              >
                Sign up
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
