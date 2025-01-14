import { useToast } from "@/hooks/use-toast";
import { EditProfileSchema } from "@/lib/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateuserdata } from "@/server/actions/links";
import { describe } from "node:test";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { useRouter } from "next/navigation";
import verifylogo from "../../../public/verifylogo.png"
import Image from "next/image";
import { useState } from "react";
import Loader from "../global/Loader";

type Editprofileprops = {
  username: string;
  email: string;
  secretkey: string;
}

export function Editprofile({ data, verified }: { data: Editprofileprops, verified: boolean }) {
  const router = useRouter()

  const { toast } = useToast();
  const [verificationmsg, setVerificationmsg] = useState<string>('')
  const [loading , setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: data ? { email: data.email, username: data.username } : {
      email: "",
      username: "",
    }

  })

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    const data = await updateuserdata(values);
    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default"
      })
    }
  }

  async function verify() {
    try {
      setLoading(true)
      const token = await generateVerificationToken(data.email);
      const success = await sendVerificationEmail(data.email, token.token);
      console.log(token , success)
      setLoading(false)
      if(success.success == true){
        setVerificationmsg(success.message)
      }
    }catch(e){
      setVerificationmsg('Failed to send verification email')
    }
  }




  return (
    <>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='flex gap-6 flex-col my-2'>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem >
                  <div className="grid grid-cols-2 gap-4  items-center justify-start ">
                    <FormLabel className="text-right">username</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem >
                  <div className="flex gap-x-4 items-center">
                    <FormLabel className="text-right">Email</FormLabel>
                    <FormControl>
                      <Input readOnly className="w-full cursor-not-allowed" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage>*Email cannot be changed</FormMessage>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button disabled={form.formState.isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <SheetHeader className="my-3">
        <SheetTitle className="text-white">Verification</SheetTitle>
        <div className="   ">
          {verified == false ? (
            <div className="flex flex-col items-end justify-center gap-y-2">
              <span className=" flex gap-2 cursor-not-allowed  items-center ">
                <h3 className="text-gray-500 ">Not Verified</h3>
                <Image src={verifylogo} className="w-7 h-7" alt="not verify" />
              </span>
              <div>
                {loading == true ? (<Loader/>) : (
                  <Button onClick={verify} className=" bg-primary-purple/primary-purple-700 hover:bg-primary-purple/primary-purple-600 active:bg-brand/brand-dark ">
                  verify?
                </Button>
                )}
              </div>
              <h3 className="text-xs">{verificationmsg}</h3>
            </div>) : (<div>You are verified</div>)}
        </div>
      </SheetHeader>

    </>
  )
}

