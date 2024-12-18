import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DeleteAccountSchema } from "@/lib/types/zod";
import { deleteAccount } from "@/server/actions/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { CircleAlert } from 'lucide-react';
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
    }catch(e){
      console.log("error with your account")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="bg-[#252525] border-none
      flex flex-col justify-center items-center
      ">
        <DialogHeader className="flex flex-col items-center justify-center">
          <CircleAlert className="text-red-500 w-10 h-10" />
          <DialogTitle className="font-medium text-xl">Delete your entire account permanently?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mx-7">
          <p className="text-center text-gray-300">This action cannot be undone. This will permanently delete your account and all your data. This includes all your links and settings.</p>
        </DialogDescription>
        <Form {...form}>
          <form className="flex w-full flex-col items-center  justify-center space-y-4" 
          onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-gray-400">
                    Please type in your email to confirm</FormLabel>
                  <FormControl>
                    <Input
                      className="hover:border-gray-400
                        focus:border-gray-300 text-center px-2
                        "
                      placeholder={data.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit"
              className=" w-full
              bg-primary-blue/primary-blue-500 active:bg-primary-blue/primary-blue-700 hover:bg-primary-blue/primary-blue-600">
              Save changes
            </Button>
          </form>
        </Form>
        <DialogClose asChild>
          <Button 
         className="bg-transparent w-full 
        hover:bg-zinc-800 active:bg-zinc-700
        ">
          Cancel ? 
        </Button>
        </DialogClose>
        
      </DialogContent>
    </Dialog>
  )
}