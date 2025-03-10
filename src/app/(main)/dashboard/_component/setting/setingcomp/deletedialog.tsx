import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DeleteAccountSchema } from "@/lib/types/zod";
import { deleteAccount } from "@/server/actions/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { CircleAlert } from 'lucide-react';
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function Deletedialog(data: { email: string }) {
  

  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      email: ""
    },
  })

  async function onSubmit(value: z.infer<typeof DeleteAccountSchema>) {
    try{
      const res = await deleteAccount(value);
      if(res.error == true){
        form.setError('email',{
          message : res.message
        })
      }
      else{
        signOut({callbackUrl : '/signin'});
      }
    }catch(e){
      form.setError('email',{
        message : "something went wrong"
      })
      console.log("error with your account")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold text-Neutrals/neutrals-1">Danger zone</h2>
          <div className="p-4 rounded-lg bg-Neutrals/neutrals-11 border border-Neutrals/neutrals-10">
            <div className="space-y-2">
              <p className="text-Neutrals/neutrals-5">Once you delete your account, there is no going back. Please be certain.</p>
              <Button
                type="button"
                variant="destructive"
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
              >
                Delete my account
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-Neutrals/neutrals-12 border-Neutrals/neutrals-11">
        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
          <CircleAlert className="text-red-500 w-12 h-12" />
          <DialogTitle className="text-xl font-semibold text-Neutrals/neutrals-1 text-center">Delete your entire account permanently?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-Neutrals/neutrals-7">
          <p>This action cannot be undone. This will permanently delete your account and all your data. This includes all your links and settings.</p>
        </DialogDescription>
        <Form {...form}>
          <form className="flex w-full flex-col items-center justify-center space-y-4" 
          onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-Neutrals/neutrals-5">
                    Please type in your email to confirm
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-Neutrals/neutrals-11 border-Neutrals/neutrals-10 text-Neutrals/neutrals-1 placeholder:text-Neutrals/neutrals-7 focus:border-Neutrals/neutrals-9"
                      placeholder={data.email} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button 
              disabled={form.formState.isSubmitting} 
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-Neutrals/neutrals-1"
            >
              Delete my Account
            </Button>
          </form>
        </Form>
        <DialogClose asChild>
          <Button 
            className="w-full bg-Neutrals/neutrals-11 hover:bg-Neutrals/neutrals-10 text-Neutrals/neutrals-5 border border-Neutrals/neutrals-10"
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
