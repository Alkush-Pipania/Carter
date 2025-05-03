"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { userData } from "../data/mockData"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email"),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileSettings() {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState(userData.avatar || "/placeholder.svg?height=100&width=100")

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  // Use mock data for default values
  const defaultValues: Partial<ProfileFormValues> = {
    username: userData.username,
    email: userData.email,
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)

    console.log(data)
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)

    // Simulate image upload
    const reader = new FileReader()
    reader.onload = (event) => {
      setTimeout(() => {
        setAvatarSrc(event.target?.result as string)
        setIsUploadingImage(false)
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        })
      }, 1500)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-white">Profile</h3>
        <p className="text-sm text-gray-400">Manage your profile information and settings.</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center sm:text-left">
                <Button variant="outline" size="sm" className="relative" disabled={isUploadingImage}>
                  {isUploadingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isUploadingImage ? "Uploading..." : "Change picture"}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                  />
                </Button>
                <p className="text-xs text-gray-400">JPG, PNG or GIF. 1MB max.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Username</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-zinc-800 border-zinc-700" />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-zinc-800 border-zinc-700 opacity-70" />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        To change your email, you will need to verify your identity.
                        <Button
                          variant="link"
                          className="h-auto p-0 ml-1 text-blue-400 text-xs font-normal"
                          onClick={() => {
                            setIsVerifying(true)
                            // Simulate API call to send OTP
                            setTimeout(() => {
                              setIsVerifying(false)
                              setIsOtpDialogOpen(true)
                              toast({
                                title: "Verification code sent",
                                description: "Please check your inbox for the verification code.",
                              })
                            }, 1500)
                          }}
                        >
                          {isVerifying ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send verification email"
                          )}
                        </Button>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating} className="mt-2">
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isUpdating ? "Updating..." : "Update profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[95%] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Verify Your Identity</DialogTitle>
            <DialogDescription className="text-gray-400">Enter the verification code sent to your email.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email-otp" className="text-gray-300">Verification Code</Label>
              <Input
                id="email-otp"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOtpDialogOpen(false)} className="border-zinc-700">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (otp.length !== 6) {
                  toast({
                    title: "Invalid code",
                    description: "Please enter a valid 6-digit verification code.",
                    variant: "destructive",
                  })
                  return
                }

                setIsVerifying(true)
                // Simulate API call to verify OTP
                setTimeout(() => {
                  setIsVerifying(false)
                  setIsOtpDialogOpen(false)
                  setIsEmailDialogOpen(true)
                  setOtp("")
                }, 1500)
              }}
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[95%] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Update Email Address</DialogTitle>
            <DialogDescription className="text-gray-400">Enter your new email address.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-email" className="text-gray-300">New Email</Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Enter your new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)} className="border-zinc-700">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
                  toast({
                    title: "Invalid email",
                    description: "Please enter a valid email address.",
                    variant: "destructive",
                  })
                  return
                }

                setIsVerifying(true)
                // Simulate API call to update email
                setTimeout(() => {
                  setIsVerifying(false)
                  setIsEmailDialogOpen(false)
                  form.setValue("email", newEmail)
                  setNewEmail("")
                  toast({
                    title: "Email updated",
                    description: "Your email has been updated successfully.",
                  })
                }, 1500)
              }}
              disabled={isVerifying || !newEmail || !/\S+@\S+\.\S+/.test(newEmail)}
            >
              {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 