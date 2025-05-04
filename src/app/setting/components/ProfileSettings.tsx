"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Loader2, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ImageCropDialog } from "./ImageCropDialog" // Import the new component

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { fetchProfile, updateProfile } from '@/store/thunks/profile-settingThunk';
import { setPendingImageFile, clearProfileError } from '@/store/slices/profile-settingSlice';

// Import dropzone
import { useDropzone } from 'react-dropzone';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileSettings() {
  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, updating, error, pendingImageFile } = useSelector((state: RootState) => state.profileSettings);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // For email change dialog (keeping existing logic)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  })

  // --- Fetch profile on component mount ---
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // --- Update form values when user data loads ---
  useEffect(() => {
    if (loading === 'succeeded' && user && !form.formState.isDirty) {
      form.reset({ username: user.username || "" });
      if (!avatarPreview) {
         setAvatarPreview(user.image);
      }
    }
  }, [user, loading, form.reset, form.formState.isDirty, avatarPreview]);

  // --- Show toast on error ---
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      dispatch(clearProfileError());
    }
  }, [error, toast, dispatch]);

  // --- Dropzone configuration ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    // Check file size (1MB)
    if (file.size > 1 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please select an image smaller than 1MB.",
        variant: "destructive",
      })
      return
    }
    
    setSelectedFile(file)
    
    // Create a preview URL and open crop dialog
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result as string)
      setShowCropDialog(true)
    }
    reader.onerror = () => {
      toast({ 
        title: "Error", 
        description: "Could not read image file.", 
        variant: "destructive" 
      })
    }
    reader.readAsDataURL(file)
  }, [toast])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    disabled: updating === 'pending'
  })

  // --- Handle crop completion ---
  const handleCropComplete = useCallback((croppedFile: File, previewUrl: string) => {
    setAvatarPreview(previewUrl);
    dispatch(setPendingImageFile(croppedFile));
    setShowCropDialog(false);
  }, [dispatch]);

  // --- Handle crop dialog close ---
  const handleCropCancel = useCallback(() => {
    setShowCropDialog(false);
    setSelectedFile(null);
    setImgSrc('');
  }, []);

  // --- Handle form submission ---
  function onSubmit(data: ProfileFormValues) {
    dispatch(updateProfile({ username: data.username }));
  }

  // --- Determine display states ---
  const displayAvatarSrc = avatarPreview || user?.image || "/placeholder.svg?height=100&width=100";
  const isProfileLoading = loading === 'pending';
  const isProfileUpdating = updating === 'pending';

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-white">Profile</h3>
        <p className="text-sm text-gray-400">Manage your profile information and settings.</p>
      </div>
      <Separator className="bg-zinc-800" />

      {isProfileLoading && (
          <div className="flex items-center justify-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
      )}

      {!isProfileLoading && user && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={displayAvatarSrc} alt="Profile" />
                  <AvatarFallback>{
                    user?.username ? user.username.substring(0, 2).toUpperCase() : "U"
                  }</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                  <div
                    {...getRootProps()}
                    className={`relative flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      isProfileUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent hover:text-accent-foreground'
                    } border-zinc-700 bg-zinc-800 text-zinc-200`}
                  >
                    <input {...getInputProps()} />
                    {isProfileUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        {pendingImageFile ? "Change picture" : "Upload picture"}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {isDragActive
                      ? "Drop image here..."
                      : "Drag and drop or click to select. JPG  with 1MB max."}
                  </p>
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
                          <Input {...field} className="bg-zinc-800 text-white border-zinc-700" />
                        </FormControl>
                        <FormDescription className="text-gray-400 text-xs">This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field (Read-only with change option) */}
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input value={user?.email || ""} disabled className="bg-zinc-800 text-white border-zinc-700 opacity-70" />
                    </FormControl>
                    <FormDescription className="text-gray-400  text-xs">
                      To change your email, you will need to verify your identity.
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 ml-1 text-blue-400 text-xs font-normal"
                        onClick={() => {
                          setIsVerifying(true)
                          setTimeout(() => {
                            setIsVerifying(false)
                            setIsOtpDialogOpen(true)
                            toast({
                              title: "Verification code sent",
                              description: "Please check your inbox for the verification code.",
                            })
                          }, 1500)
                        }}
                        disabled={isVerifying}
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
                  </FormItem>

                  <Button type="submit" disabled={isProfileUpdating} className="mt-2">
                    {isProfileUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProfileUpdating ? "Updating..." : "Update profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Image Crop Dialog - Now using separate component */}
      <ImageCropDialog
        open={showCropDialog}
        onClose={handleCropCancel}
        onComplete={handleCropComplete}
        imageSrc={imgSrc}
        selectedFile={selectedFile}
      />

      {/* Email Change Dialogs - kept the same */}
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
              type="button"
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
              type="button"
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
                setTimeout(() => {
                  setIsVerifying(false)
                  setIsEmailDialogOpen(false)
                  setNewEmail("")
                  toast({
                    title: "Email updated (Simulated)",
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