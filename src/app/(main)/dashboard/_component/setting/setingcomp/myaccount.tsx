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
import Loader from "@/components/global/Loader"
import { useNameStore } from "@/lib/store/links"

type UserSettings = {
  username: string;
  varified: boolean;
  email: string;
}

export default function MyAccount({ userdata , onhandleclick }: { userdata: UserSettings | null , onhandleclick : any}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [verificationsend, setverificationsend] = useState<boolean>(false);
  const {setName} = useNameStore();
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading , setLoading] = useState<boolean>(false);
  const [ switchstate , setSwitchSTate] = useState<boolean>(userdata?.varified)

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
      if(res.error == true){
        verificationcode.setError("otp",{
          message : "Invalid OTP"
        })
        return
      }
      if(res.message){
        toast({
          title : res.error ? "Error" : "Success",
          description : res.message,
          variant : res.error ? "destructive" : "default"
        })
        setSwitchSTate(true);
        setIsDialogOpen(false);
      }
    }catch(e){
      console.log(e)
    }
    

  } 

  async function onSubmit(value: z.infer<typeof updateusername>) {
    const data = await updateusernameaction(value);
    if (data?.message) {
      onhandleclick(value.username);
      setName(value.username)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-Neutrals/neutrals-11 flex items-center justify-center text-2xl text-Neutrals/neutrals-1 font-medium border border-Neutrals/neutrals-10">
                {userdata?.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-2 flex-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-Neutrals/neutrals-5">Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-Neutrals/neutrals-11 border-Neutrals/neutrals-10 text-Neutrals/neutrals-1 placeholder:text-Neutrals/neutrals-7 focus:border-Neutrals/neutrals-9" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={form.formState.isSubmitting} type="submit"
                className="bg-primary-blue/primary-blue-500 active:bg-primary-blue/primary-blue-700 hover:bg-primary-blue/primary-blue-600 text-Neutrals/neutrals-1">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-Neutrals/neutrals-1">Account security</h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg bg-Neutrals/neutrals-11 border border-Neutrals/neutrals-10">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-Neutrals/neutrals-5">Email</Label>
              <p className="text-sm text-Neutrals/neutrals-7">
                {userdata?.email}
              </p>
            </div>
            <Button type="button"
              className="text-Neutrals/neutrals-7 bg-transparent hover:bg-Neutrals/neutrals-10 border-Neutrals/neutrals-10 cursor-not-allowed">
              Change not Available
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-Neutrals/neutrals-11 border border-Neutrals/neutrals-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="twoFactor" className="text-Neutrals/neutrals-5">Email Verification</Label>
                <p className="text-sm text-Neutrals/neutrals-7">Verify your email address to enable all features</p>
              </div>
              <Switch
                id="emailverification"
                checked={switchstate}
                onClick={handleSwitchClick}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-400 hover:data-[state=unchecked]:bg-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      <Deletedialog email={userdata?.email}/>
    </>
  )
}