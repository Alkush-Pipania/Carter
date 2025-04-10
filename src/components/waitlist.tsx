"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import * as Motion from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ReloadIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"

enum WaitlistStep {
  EMAIL = 0,
  OTP = 1,
  SUCCESS = 2,
}

export function Waitlist() {
  const [step, setStep] = useState<WaitlistStep>(WaitlistStep.EMAIL)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [queuePosition, setQueuePosition] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [timerActive, setTimerActive] = useState(false)

  // Handle timer countdown
  useEffect(() => {
    if (!timerActive) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log('Submitting email:', email);
      const response = await fetch("/api/waitlist/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      console.log('Response status:', response.status);
      // Convert headers to a simple object for logging
      const headerObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headerObj[key] = value;
      });
      console.log('Response headers:', headerObj);

      const data = await response.json()
      console.log('Response data:', data);

      // Check if this is a fallback response (server error but we're showing success anyway)
      if (data.fallback) {
        console.log('Using fallback mode due to server response');
        
        // If we received a fallback code in dev mode, display it to help testing
        if (data.code && process.env.NODE_ENV !== 'production') {
          // Display the code for testing purposes in non-production environments
          setError(`Server issue, but continuing. Test code: ${data.code}`);
        }
      }

      if (!response.ok && response.status !== 200) {
        // Check if user is already on waitlist (409 Conflict)
        if (response.status === 409) {
          setError(data.message || "You are already on the waitlist!")
          setLoading(false)
          return
        }
        throw new Error(data.message || "Failed to send OTP")
      }

      // Start the timer
      setTimeRemaining(60)
      setTimerActive(true)

      setStep(WaitlistStep.OTP)
    } catch (err) {
      console.error('Error in email submit:', err);
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim()) {
      setError("Please enter the OTP")
      return
    }

    // Validate OTP format (6 digits)
    const otpRegex = /^\d{6}$/
    if (!otpRegex.test(otp)) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log('Submitting OTP:', otp, 'for email:', email);
      const response = await fetch("/api/waitlist/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })
      console.log('Response status:', response.status);

      const data = await response.json()
      console.log('Response data:', data);

      // Check if this is a fallback response (server error but we're showing success anyway)
      if (data.fallback) {
        console.log('Using fallback mode due to server response');
        setQueuePosition(data.queuePosition || 99);
        setTimerActive(false)
        setStep(WaitlistStep.SUCCESS)
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP")
      }

      setQueuePosition(data.queuePosition)
      setTimerActive(false)
      setStep(WaitlistStep.SUCCESS)
    } catch (err) {
      console.error('Error in OTP submit:', err);
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (timerActive) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/waitlist/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check if user is already on waitlist (409 Conflict)
        if (response.status === 409) {
          setError(data.message || "You are already on the waitlist!")
          setLoading(false)
          return
        }
        throw new Error(data.message || "Failed to resend OTP")
      }

      // Reset and start the timer
      setTimeRemaining(60)
      setTimerActive(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Motion.motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-purple-800 bg-[#1a0f3a]">
        <CardHeader>
          <CardTitle className="text-white">
            {step === WaitlistStep.EMAIL && "Join Waitlist"}
            {step === WaitlistStep.OTP && "Verify Your Email"}
            {step === WaitlistStep.SUCCESS && "Welcome to the Queue!"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === WaitlistStep.EMAIL && "Enter your email to get started"}
            {step === WaitlistStep.OTP && "Enter the verification code sent to your email"}
            {step === WaitlistStep.SUCCESS && "You're now on the Carter waitlist"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Motion.AnimatePresence mode="wait">
            {step === WaitlistStep.EMAIL && (
              <Motion.motion.div
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleEmailSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-purple-700 bg-[#120a29] text-white placeholder:text-gray-500"
                      />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </form>
              </Motion.motion.div>
            )}

            {step === WaitlistStep.OTP && (
              <Motion.motion.div
                key="otp-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleOtpSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 rounded-md bg-[#120a29] p-2">
                      <EnvelopeClosedIcon className="h-4 w-4 text-purple-400" />
                      <p className="text-sm text-gray-400">
                        OTP sent to <span className="text-purple-400">{email}</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border-purple-700 bg-[#120a29] text-white placeholder:text-gray-500"
                        maxLength={6}
                      />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Join"
                      )}
                    </Button>

                    <div className="space-y-2 text-center">
                      <p className="text-xs text-gray-400">
                        {timerActive ? `Resend OTP in ${timeRemaining}s` : "Didn't receive the code?"}
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-xs text-purple-400"
                        onClick={handleResendOtp}
                        disabled={timerActive || loading}
                      >
                        Resend OTP
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-purple-400"
                      onClick={() => setStep(WaitlistStep.EMAIL)}
                      disabled={loading}
                    >
                      Back to email
                    </Button>

                    {/* Timer progress bar */}
                    {timerActive && (
                      <div className="space-y-1">
                        <Progress
                          value={(timeRemaining / 60) * 100}
                          className="h-1 bg-[#120a29]"
                        />
                        <div className="flex justify-between">
                          <p className="text-xs text-gray-500">Verifying</p>
                          <p className="text-xs text-gray-500">
                            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </Motion.motion.div>
            )}

            {step === WaitlistStep.SUCCESS && (
              <Motion.motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-center"
              >
                <Motion.motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-900"
                >
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                </Motion.motion.div>
                <div className="space-y-2">
                  <Motion.motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-xl font-medium text-white"
                  >
                    You're in!
                  </Motion.motion.h3>
                  <Motion.motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-gray-400"
                  >
                    Thanks for joining the Carter waitlist
                  </Motion.motion.p>
                  {queuePosition !== null && (
                    <Motion.motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-4 rounded-lg bg-[#120a29] p-4"
                    >
                      <p className="text-gray-400">Your position in the queue</p>
                      <Motion.motion.p 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        className="text-3xl font-bold text-purple-400"
                      >
                        #{queuePosition}
                      </Motion.motion.p>
                    </Motion.motion.div>
                  )}
                </div>
              </Motion.motion.div>
            )}
          </Motion.AnimatePresence>
        </CardContent>
        {step === WaitlistStep.SUCCESS && (
          <CardFooter>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setStep(WaitlistStep.EMAIL)} >
              Thanks for joining
            </Button>
          </CardFooter>
        )}
      </Card>
    </Motion.motion.div>
  )
}
