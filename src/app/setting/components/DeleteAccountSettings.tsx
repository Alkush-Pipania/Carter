"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Loader2 } from "lucide-react"

export function DeleteAccountSettings() {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"send" | "verify">("send")

  const handleSendOtp = () => {
    setIsDeleting(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsDeleting(false)
      setOtpSent(true)
      setVerificationStep("verify")
      toast({
        title: "OTP sent",
        description: "A verification code has been sent to your email.",
      })
    }, 1500)
  }

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      })
      return
    }

    setIsDeleting(true)

    // Simulate API call to verify OTP and delete account
    setTimeout(() => {
      setIsDeleting(false)
      setIsDialogOpen(false)
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Delete Account</h3>
        <p className="text-sm text-gray-400">Permanently delete your account and all associated data.</p>
      </div>
      <Separator className="bg-zinc-800" />

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle className="text-white">Delete Account</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            This action is irreversible. Once you delete your account, all of your data will be permanently removed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Warning: This action cannot be undone</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>All your personal information will be deleted</li>
                    <li>Your API keys will be revoked</li>
                    <li>All your data will be permanently removed</li>
                    <li>You will lose access to all services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={() => {
              setVerificationStep("send")
              setOtpSent(false)
              setOtp("")
              setIsDialogOpen(true)
            }}
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Delete Account Confirmation
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {verificationStep === "send"
                ? "To delete your account, we need to verify your identity. We'll send a verification code to your email."
                : "Enter the verification code sent to your email to confirm account deletion."}
            </DialogDescription>
          </DialogHeader>

          {verificationStep === "send" ? (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-zinc-700">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSendOtp} disabled={isDeleting}>
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Verification Code
              </Button>
            </DialogFooter>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="delete-otp" className="text-gray-300">Verification Code</Label>
                  <Input
                    id="delete-otp"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-zinc-700">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleVerifyOtp} disabled={isDeleting || otp.length !== 6}>
                  {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Account Deletion
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 