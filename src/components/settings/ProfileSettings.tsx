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
import { toast } from "sonner"
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
import { ImageCropDialog } from "@/components/settings/ImageCropDialog" // Fixed import path

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
  }, [user, loading, form, form.reset, form.formState.isDirty, avatarPreview]);

  // --- Show toast on error ---
  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
      dispatch(clearProfileError());
    }
  }, [error, dispatch]);

  // --- Dropzone configuration ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    // Check file size (4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image too large", {
        description: "Please select an image smaller than 4MB.",
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
      toast.error("Error", { 
        description: "Could not read image file.", 
      })
    }
    reader.readAsDataURL(file)
  }, [])
  
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
    // Send both username and pending image file (if any)
    dispatch(updateProfile({ 
      username: data.username,
      // The pendingImageFile is already in the Redux store from the handleCropComplete function
      // which dispatches setPendingImageFile action
    }));
  }

  // --- Determine display states ---
  const displayAvatarSrc = avatarPreview || user?.image || "/placeholder.svg?height=100&width=100";
  const isProfileLoading = loading === 'pending';
  const isProfileUpdating = updating === 'pending';

  // Determine if any changes were made (either form is dirty or image was changed)
  const hasChanges = form.formState.isDirty || !!pendingImageFile;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-slate-800 dark:text-white transition-colors">Profile</h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors">Manage your profile information and settings.</p>
      </div>
      <Separator className="bg-slate-200 dark:bg-zinc-800 transition-colors" />

      {isProfileLoading && (
          <div className="flex items-center justify-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400 dark:text-gray-400 transition-colors" />
          </div>
      )}

      {!isProfileLoading && user && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 dark:text-white text-lg transition-colors">Profile Picture</CardTitle>
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
                    } border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-colors`}
                  >
                    <input {...getInputProps()} />
                    {isProfileUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4 text-zinc-400 dark:text-gray-400 transition-colors" />
                        {pendingImageFile ? "Change picture" : "Upload picture"}
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors">
                    {isDragActive
                      ? "Drop image here..."
                      : "Drag and drop or click to select. JPG , png  with 4MB max."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 dark:text-white text-lg transition-colors">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-slate-600 dark:text-gray-300 transition-colors">Username</Label>
                        <FormControl>
                          <Input {...field} className="bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border-slate-200 dark:border-zinc-700 transition-colors" />
                        </FormControl>
                        <FormDescription className="text-slate-500 dark:text-gray-400 text-xs transition-colors">This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field (Read-only with change option) */}
                  <FormItem>
                    <Label className="text-slate-600 dark:text-gray-300 transition-colors">Email Address</Label>
                    <FormControl>
                      <Input value={user?.email || ""} disabled className="bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border-slate-200 dark:border-zinc-700 opacity-70 transition-colors" />
                    </FormControl>
                    <FormDescription className="text-slate-500 dark:text-gray-400 text-xs transition-colors">
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
                            toast.success("Verification code sent", {
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

                  <Button 
                    type="submit" 
                    disabled={isProfileUpdating || (!hasChanges)} 
                    className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {isProfileUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProfileUpdating ? "Saving..." : "Save changes"}
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
                  toast.error("Invalid code", {
                    description: "Please enter a valid 6-digit verification code.",
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
                  toast.error("Invalid email", {
                    description: "Please enter a valid email address.",
                  })
                  return
                }

                setIsVerifying(true)
                setTimeout(() => {
                  setIsVerifying(false)
                  setIsEmailDialogOpen(false)
                  setNewEmail("")
                  toast.success("Email updated (Simulated)", {
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