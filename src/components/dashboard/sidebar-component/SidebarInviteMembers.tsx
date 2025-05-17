"use client"
import React, { useState } from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InviteSchema } from '@/lib/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SidebarInviteMembers = () => {
 const [isCreateFolderOpen , setIsCreateFolderOpen] = useState<boolean>(false);

 const form = useForm<z.infer<typeof InviteSchema>>({
  resolver : zodResolver(InviteSchema),
  defaultValues : {
    email : ""
  }
 })
 async function onSubmit (values : z.infer<typeof InviteSchema>){
  try{
    console.log(values);
    setIsCreateFolderOpen(false);
    form.reset();
  }catch(e){

  }

 }
 return (
  <SidebarMenu>
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen} >
      <DialogTrigger onChange={() => setIsCreateFolderOpen(true)}>
        <SidebarMenuItem key="#3">
          <SidebarMenuButton  className="text-slate-700 dark:text-zinc-400 hover:bg-slate-200 active:bg-slate-300 dark:active:bg-zinc-900 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors asChild">
          <UserPlus className="h-4 w-4" />
          <span>Invite members</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="dark:bg-zinc-900/95 bg-white border dark:border-gray-800 border-gray-200 fixed top-[30%] left-[50%] sm:top-[50%]">
        <DialogHeader>
          <DialogTitle>
           Invite members
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Type or paste in emails below</DialogDescription>
        <Form {...form}>
          <form className='flex flex-col gap-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xyz@example.com" 
                    {...field} 
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="self-end"
            >
              {form.formState.isSubmitting ? "Inviting..." : "Invite"}
            </Button>            
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </SidebarMenu>
)};

export default SidebarInviteMembers;
