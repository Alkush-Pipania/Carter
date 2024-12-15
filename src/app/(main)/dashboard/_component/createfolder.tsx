"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateLinkCartSchema } from "@/lib/types/zod";
import { createlinkcarter } from "@/server/actions/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { DialogClose } from "@/components/ui/dialog";

export  function CreateLinkCart({ onfoldercreate }) {
  const router = useRouter();
  const {toast} = useToast();
  const form = useForm<z.infer<typeof CreateLinkCartSchema>>({
    resolver : zodResolver(CreateLinkCartSchema),
    defaultValues: {
      name : ""
    },
  })

  async function onSubmit(values : z.infer<typeof CreateLinkCartSchema>){
    const data = await createlinkcarter(values);
    onfoldercreate(data.data)
    if(data?.message){
      toast({
        title : data.error ? "Error" : "Success",
        description : `${data.message} ${values.name}`,
        variant : data.error? "destructive" : "great",
      })
      router.push(`/dashboard/cart/${data.data.id}`)
    }
  }

  return (
    
    <>
    <Form {...form}>
    <form className="flex flex-col gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
     <FormField
     control={form.control}
     name="name"
     render={({field}) =>(
      <FormItem>
      <FormLabel>Name :</FormLabel>
      <FormControl>
        <Input placeholder="folder name" {...field}/>
      </FormControl>
      <FormMessage/>
      </FormItem>
     )}
     />
     <div>
      <DialogClose>
        <Button className="flex justify-between gap-x-2" disabled={form.formState.isSubmitting} type="submit">
        <Plus/>
        Create
      </Button>
      </DialogClose>
      
     </div>
    </form>

    </Form>
    </>
    
  )
}