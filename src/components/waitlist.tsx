"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

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
      const response = await fetch("/api/waitlist/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP")
      }

      // Start the timer
      setTimeRemaining(60)
      setTimerActive(true)

      setStep(WaitlistStep.OTP)
    } catch (err) {
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

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/waitlist/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })
      console.log(response)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP")
      }

      setQueuePosition(data.queuePosition)
      setTimerActive(false)
      setStep(WaitlistStep.SUCCESS)
    } catch (err) {
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
        {step === WaitlistStep.EMAIL && (
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
        )}

        {step === WaitlistStep.OTP && (
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
                  // indicatorClassName="bg-purple-600"
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
        )}

        {step === WaitlistStep.SUCCESS && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-900">
              <CheckCircle className="h-6 w-6 text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white">You're in!</h3>
              <p className="text-gray-400">Thanks for joining the Carter waitlist</p>
              {queuePosition !== null && (
                <div className="mt-4 rounded-lg bg-[#120a29] p-4">
                  <p className="text-gray-400">Your position in the queue</p>
                  <p className="text-3xl font-bold text-purple-400">#{queuePosition}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      {step === WaitlistStep.SUCCESS && (
        <CardFooter>
          <Button className="w-full bg-purple-600  hover:bg-purple-700" onClick={() => setStep(0)} >
            Thanks for joining
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
