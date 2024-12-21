'use client'

import { useState } from 'react'
import Link from 'next/link'
import EmailForm from './_components/email-form'
import OtpForm from './_components/otp-form'
import NewPasswordForm from './_components/new-password'
import carterlogo from "../../../../public/logo.png"
import Image from 'next/image'
import { emailexist, updatePassword, verifyforgotOTP } from '@/server/actions/links'
import { generateForgotPasswordToken } from '@/lib/token'
import { sendFogotpasswordmail } from '@/lib/mail'

type Step = 'email' | 'otp' | 'password' | 'success'

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (email: string, emailform: any) => {
    setIsLoading(true)
    try {
      const res = await emailexist(email);
      if (res.error == true) {
        emailform.setError('email', { message: 'Email doesn\'t exist ' })
        setIsLoading(false)
      } else {
        try {
          const token = await generateForgotPasswordToken(email);
          const success = await sendFogotpasswordmail(email, token.token);
          if (success.success == false) {
            emailform.setError('email', { message: success.message })
          } else {
            setEmail(email)
            setIsLoading(false)
            setCurrentStep('otp')
          }

        } catch (e) {
          emailform.setError('email', { message: 'some problem with the server' })
        }
      }

    } catch (e) {
      emailform.setError('email', { message: 'Something up with the server' })
    }


  }

  const handleOtpSubmit = async (otp: string, otpForm: any) => {
    setIsLoading(true)
    try {
      const res = await verifyforgotOTP(email, otp);
      if (res.error == true) {
        otpForm.setError('otp', { message: 'OTP is invalid' })
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setCurrentStep('password')
      }

    } catch (e) {
      otpForm.setError('otp', { message: 'Some problem with the server' })
    }

  }

  const handlePasswordSubmit = async (password: string, setpassform: any) => {
    setIsLoading(true)
    try {
      const updatepassword = await updatePassword(password,
        email
      );
      if (updatepassword.error == true) {
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setCurrentStep('success')
      }
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div className="flex min-h-screen w-[60%] px-10 flex-col items-center justify-center bg-[#030014] text-white">

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at center, #6889ff1a 0%, transparent 70%)',
        }}
      />

      <div className="z-10 w-full space-y-8">
        {/* Logo */}
        <section className=' '>
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
        </section>

        {currentStep === 'email' && (
          <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
        )}

        {currentStep === 'otp' && (
          <OtpForm
            email={email}
            onSubmit={handleOtpSubmit}
            onBack={() => setCurrentStep('email')}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'password' && (
          <NewPasswordForm onSubmit={handlePasswordSubmit} isLoading={isLoading} />
        )}

        {currentStep === 'success' && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-[#8d33ff]">Password Updated!</h2>
            <p className="text-gray-400">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Link
              href="/signin"
              className="block rounded-lg bg-[#8d33ff] px-4 py-3 font-medium text-white hover:bg-opacity-90"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

