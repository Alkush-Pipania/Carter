import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/token"
import { OTPSchema, updateusername } from "@/lib/types/zod"
import { updateusernameaction, verifyOTP } from "@/server/actions/links"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Deletedialog } from "./deletedialog"

type UserSettings = {
  username: string;
  varified: boolean;
  email: string;
}

export default function MyAccount({ userdata }: { userdata: UserSettings | null }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [verificationsend, setverificationsend] = useState<boolean>(false);
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading , setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateusername>>({
    resolver: zodResolver(updateusername),
    defaultValues: {
      username: userdata?.username,
    },
  })

  const verificationcode = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  })

  async function codeSubmit(value: z.infer<typeof OTPSchema>) {
    const otpString = otp.join('');
    if(!userdata?.email){
      return
    }
    try{
      const res = await verifyOTP(otpString , userdata?.email);
      if(res.message){
        toast({
          title : res.error ? "Error" : "Success",
          description : res.message,
          variant : res.error ? "destructive" : "default"
        })
      }
    }catch(e){
      console.log(e)
    }
    

  } 

  async function onSubmit(value: z.infer<typeof updateusername>) {
    const data = await updateusernameaction(value);
    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default"
      })
    }

  }
  const handleSwitchClick = () => {
    if (userdata?.varified) {
      return
    }
    setIsDialogOpen(true);
  }


  async function Sendverification() {
      try {
        setLoading(true)
        const token = await generateVerificationToken(userdata?.email);
        const success = await sendVerificationEmail(userdata?.email, token.token);
        console.log(token , success)
        setLoading(false)
        setverificationsend(true)
        if(success.success == true){
          toast({
            title: "Success",
            description: success.message,
            variant: "default"
          })
        }
      }catch(e){
        toast({
          title: "Error",
          description: 'Failed to send verification email',
          variant: "destructive"
        })
      }
    }



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-black font-medium">
                {userdata?.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={form.formState.isSubmitting} type="submit"
                className="bg-primary-blue/primary-blue-500 active:bg-primary-blue/primary-blue-700 hover:bg-primary-blue/primary-blue-600">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Account security</h2>

        <div className="space-y-1 flex justify-between items-center gap-4">

          <div className="flex flex-col items-start justify-center">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <p className="text-sm text-muted-foreground">
              {userdata?.email}
            </p>
          </div>
          <Button type="button"
            className="text-gray-200 bg-transparent active:bg-zinc-800 border-gray-400 hover:bg-zinc-700 border border-spacing-1">Change email</Button>

        </div>

        <div className="space-y-1">
          <Label htmlFor="twoFactor" className="text-white">Email Verification</Label>
          <div className="flex items-center justify-between">

            <Switch
              id="emailverification"
              checked={userdata?.varified}
              onClick={handleSwitchClick}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-400 hover:data-[state=unchecked]:bg-orange-500"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="bg-zinc-700 border-0">
                <div className="flex flex-col mx-2 items-start gap-y-3 leading-5 my-2 ">
                  <p>Your current email is{" "}
                    <span className=" gap-x-1 font-bold">{userdata.email}</span>. We'll send a temporary verification code to this email.</p>
                  {verificationsend == false ? (
                    <>
                    {loading === true ? (
                      <>loading...</>
                    ): (
                      <Button onClick={Sendverification}
                      className="bg-primary-blue/primary-blue-500
                    hover:bg-primary-blue/primary-blue-600
                    active:bg-primary-blue/primary-blue-700 transition-all
                     duration-75 ease-in-out
                    ">
                      Send verification code
                    </Button>
                    )}
                    </>
                  ) : (
                    <Form {...verificationcode}>
                      <form className="flex flex-col items-start gap-y-3" onSubmit={verificationcode.handleSubmit(codeSubmit)}>
                        <FormField
                          control={verificationcode.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  maxLength={6}
                                  value={otp.join('')}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Ensure only digits
                                    if (/^\d*$/.test(inputValue)) {
                                      // Split the input into individual digits
                                      const newOtp = inputValue.split('').slice(0, 6);
                                      setOtp(newOtp.concat(Array(6 - newOtp.length).fill('')));
                                      field.onChange(e);
                                    }
                                  }}
                                  className="w-full"
                                  placeholder="Enter 6-digit OTP"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          disabled={verificationcode.formState.isSubmitting} type="submit"
                          className="bg-primary-blue/primary-blue-500
                           hover:bg-primary-blue/primary-blue-600
                             active:bg-primary-blue/primary-blue-700 transition-all
                             duration-75 ease-in-out
                            ">
                          Submit
                        </Button>

                      </form>
                    </Form>
                  )}
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </div>


      <Deletedialog email = {userdata?.email}/>



    </>
  )
}