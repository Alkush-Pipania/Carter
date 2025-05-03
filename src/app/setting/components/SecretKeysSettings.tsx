"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Eye, EyeOff, Copy, RefreshCw, Loader2 } from "lucide-react"
import { secretKeys } from "../data/mockData"

export function SecretKeysSettings() {
  const { toast } = useToast()
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentKeyId, setCurrentKeyId] = useState<string | null>(null)
  const [otp, setOtp] = useState("")
  const [verificationStep, setVerificationStep] = useState<"send" | "verify">("send")

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleRegenerateKey = (keyId: string) => {
    setCurrentKeyId(keyId)
    setVerificationStep("send")
    setOtp("")
    setIsDialogOpen(true)
  }

  const handleSendOtp = () => {
    setIsVerifying(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsVerifying(false)
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

    setIsVerifying(true)

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsVerifying(false)
      setIsDialogOpen(false)

      // Simulate key regeneration
      setIsRegenerating(true)
      setTimeout(() => {
        setIsRegenerating(false)
        toast({
          title: "API key regenerated",
          description: "Your API key has been regenerated successfully.",
        })
      }, 1500)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-white">Secret Keys</h3>
        <p className="text-sm text-gray-400">Manage your API keys and other secret credentials.</p>
      </div>
      <Separator className="bg-zinc-800" />

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full border-separate border-spacing-0">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="text-left py-3 text-gray-400 font-medium text-sm w-1/5 px-4">Name</th>
                  <th className="text-left py-3 text-gray-400 font-medium text-sm w-2/5 px-4">Key</th>
                  <th className="text-left py-3 text-gray-400 font-medium text-sm w-1/5 px-4">Created</th>
                  <th className="text-left py-3 text-gray-400 font-medium text-sm w-1/5 px-4">Last Used</th>
                  <th className="text-left py-3 text-gray-400 font-medium text-sm w-1/5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {secretKeys.map((secretKey) => (
                  <tr key={secretKey.id} className="group">
                    {/* Mobile View */}
                    <td className="md:hidden px-4 py-3 space-y-2" colSpan={5}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{secretKey.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 border-zinc-700"
                          onClick={() => handleRegenerateKey(secretKey.id)}
                          disabled={isRegenerating}
                        >
                          {isRegenerating && currentKeyId === secretKey.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <RefreshCw className="h-3 w-3" />
                          )}
                          Regenerate
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="key-container relative rounded bg-zinc-800 px-1.5 py-1 font-mono text-sm overflow-hidden w-[180px]">
                          <div className="overflow-x-auto custom-scrollbar">
                            <code className="whitespace-nowrap inline-block">
                              {showKeys[secretKey.id]
                                ? secretKey.key
                                : secretKey.key.substring(0, 10) + "•••••••••••••••••"}
                            </code>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(secretKey.id)}>
                          {showKeys[secretKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(secretKey.key)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Created: {secretKey.createdAt}</div>
                        <div>Last Used: {secretKey.lastUsed}</div>
                      </div>
                    </td>

                    {/* Desktop View */}
                    <td className="hidden md:table-cell px-4 py-3 font-medium text-white border-b border-zinc-800">
                      {secretKey.name}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="key-container relative rounded bg-zinc-800 px-1.5 py-1 font-mono text-sm overflow-hidden w-[300px]">
                          <div className="overflow-x-auto custom-scrollbar">
                            <code className="whitespace-nowrap inline-block">
                              {showKeys[secretKey.id]
                                ? secretKey.key
                                : secretKey.key.substring(0, 10) + "•••••••••••••••••"}
                            </code>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(secretKey.id)}>
                          {showKeys[secretKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(secretKey.key)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-300 border-b border-zinc-800">
                      {secretKey.createdAt}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-300 border-b border-zinc-800">
                      {secretKey.lastUsed}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 border-b border-zinc-800">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 border-zinc-700"
                        onClick={() => handleRegenerateKey(secretKey.id)}
                        disabled={isRegenerating}
                      >
                        {isRegenerating && currentKeyId === secretKey.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                        Regenerate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar code {
          padding-bottom: 3px;
        }
      `}</style>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[95%] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Verify Your Identity</DialogTitle>
            <DialogDescription className="text-gray-400">
              {verificationStep === "send"
                ? "To regenerate your API key, we need to verify your identity. We'll send a verification code to your email."
                : "Enter the verification code sent to your email."}
            </DialogDescription>
          </DialogHeader>

          {verificationStep === "send" ? (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-zinc-700">
                Cancel
              </Button>
              <Button onClick={handleSendOtp} disabled={isVerifying}>
                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Verification Code
              </Button>
            </DialogFooter>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="otp" className="text-gray-300">Verification Code</Label>
                  <Input
                    id="otp"
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
                <Button onClick={handleVerifyOtp} disabled={isVerifying || otp.length !== 6}>
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & Regenerate
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 