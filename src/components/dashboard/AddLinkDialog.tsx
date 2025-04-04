import { useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { AddLinkSchema } from '@/lib/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Loader from '../global/Loader';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addGlobalLink } from '@/store/thunks/userLinksGlobalThunk';
import { addFolderLink } from '@/store/thunks/folderLinksThunk';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus } from 'lucide-react';

interface AddLinkDialogProps {
  activeRoute?: string;
  trigger?: React.ReactNode;
}

export function AddLinkDialog({ activeRoute, trigger }: AddLinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem('userId');

  const form = useForm<z.infer<typeof AddLinkSchema>>({
    mode: 'onChange',
    resolver: zodResolver(AddLinkSchema),
    defaultValues: { url: '' },
  });

  const isLoading = form.formState.isSubmitting;
  const { reset } = form;

  const onSubmit: SubmitHandler<z.infer<typeof AddLinkSchema>> = async (FormData) => {
    const { url } = FormData;

    const toastId = toast.loading("Adding Link to Carter", {
      description: "Processing your link...",
    });

    try {
      setIsOpen(false);
      
      if (activeRoute === "global") {
        await dispatch(addGlobalLink({ url, userId: userId?.toString() || null })).unwrap();
      } else if (activeRoute) {
        await dispatch(addFolderLink({ 
          url, 
          userId: userId?.toString() || null,
          folderId: parseInt(activeRoute)
        })).unwrap();
      }

      toast.success("Success!", {
        id: toastId,
        description: "Link has been added to Carter",
      });

      form.reset();
      setIsOpen(false);

    } catch (error: any) {
      toast.error("Error", {
        id: toastId,
        description: error.message || "Failed to add link. Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button 
            disabled={isLoading}
            className='flex text-slate-200 hover:text-white font-medium text-sm sm:text-base 
                     relative group px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500 
                     hover:bg-purple-600 active:bg-purple-700 rounded-full 
                     transition-all duration-200'
          >
            <div className='absolute inset-0 bg-purple-500/30 blur-lg rounded-full 
                          transition-all duration-200 group-hover:bg-purple-500/40'></div>
            <div className='relative flex items-center gap-1.5'>
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </div>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-brand/brand-dark border-brand/brand-primaryblue">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Add New Link</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the URL of the website you want to save
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col justify-center gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <div className='flex items-center justify-start gap-3 sm:gap-4'>
                      <FormLabel className='text-base sm:text-xl whitespace-nowrap'>URL:</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://"
                          className="w-full bg-Neutrals/neutrals-10 outline-none px-2 py-1.5 rounded-xl text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-between items-center mt-4'>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                {!isLoading ? 'Submit' : <Loader />}
              </button>
              <h3 onClick={() => reset()}
                className='text-gray-400 underline underline-offset-4 hover:text-gray-300 active:text-gray-500 cursor-pointer'>
                clear
              </h3>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
} 