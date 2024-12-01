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

type Editprofileprops ={
  username : string;
  email : string;
  secretkey : string;
}

export function Editprofile({data} : {data : Editprofileprops }){

  const { toast } = useToast();
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: data ? { email : data.email , username : data.username } : {
      email : "",
      username : "",
    }

  })
  
  async function onSubmit(values: z.infer<typeof EditProfileSchema >) {
    const data = await updateuserdata(values);
    if(data?.message){
      toast({
        title : data.error ? "Error" : "Success",
        description : data.message,
        variant : data.error ? "destructive" : "default"
      })
    }
  }

  return(
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
                  <Input className="w-full" {...field} />
                </FormControl>
                </div>
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
  )
}