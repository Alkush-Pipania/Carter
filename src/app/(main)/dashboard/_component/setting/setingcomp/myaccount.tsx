import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { OTPSchema, updateusername } from "@/lib/types/zod"
import { updateusernameaction } from "@/server/actions/links"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

  const form = useForm<z.infer<typeof updateusername>>({
    resolver: zodResolver(updateusername),
    defaultValues: {
      username: userdata?.username,
    },
  })

  const verificationcode = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(updateusername),
    defaultValues: {
      otp: "",
    },
  })

  async function codeSubmit(value: z.infer<typeof OTPSchema>) {
    console.log(value)
  }

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(parseInt(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus()
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
                    <Button
                      className="bg-primary-blue/primary-blue-500
                    hover:bg-primary-blue/primary-blue-600
                    active:bg-primary-blue/primary-blue-700 transition-all
                     duration-75 ease-in-out
                    ">
                      Send verification code
                    </Button>
                  ) : (
                    <Form {...verificationcode}>
                      <form className="flex flex-col items-start gap-y-3" onSubmit={verificationcode.handleSubmit(codeSubmit)}>
                        <FormField
                          control={verificationcode.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex gap-2">
                                  {otp.map((data, index) => {
                                    return (
                                      <Input
                                        className="w-10 h-10 text-center"
                                        type="text"
                                        name="otp"
                                        maxLength={1}
                                        key={index}
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onFocus={(e) => e.target.select()}
                                      />
                                    )
                                  })}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                        disabled={form.formState.isSubmitting} type="submit"
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


      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Danger zone</h2>
        <Button
          type="button"
          variant="destructive"
        // onClick={handleDeleteAccount}
        >
          Delete my account
        </Button>
      </div>



    </>
  )
}