"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateLinkCartSchema } from "@/lib/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createFolder } from "@/store/thunks/folderdataThunks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CreateLinkCart({ onfoldercreate }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { creating, createError } = useAppSelector((state) => state.folderdata);
  const folderList = useAppSelector((state) => state.folderdata.data);
  const [nameExists, setNameExists] = useState(false);
  
  const form = useForm<z.infer<typeof CreateLinkCartSchema>>({
    resolver: zodResolver(CreateLinkCartSchema),
    defaultValues: {
      name: ""
    },
  });
  
  // Check for duplicate folder names as user types
  const folderName = form.watch("name");
  
  useEffect(() => {
    // Check if a folder with this name already exists (case insensitive)
    if (folderName.trim()) {
      const folderExists = folderList.some(
        folder => folder.name.toLowerCase() === folderName.trim().toLowerCase()
      );
      setNameExists(folderExists);
      
      if (folderExists) {
        form.setError("name", {
          type: "manual",
          message: "A folder with this name already exists"
        });
      } else {
        form.clearErrors("name");
      }
    }
  }, [folderName, folderList, form]);
  
  // Reset form when createError changes
  useEffect(() => {
    if (createError) {
      toast.error("Error", {
        description: createError
      });
    }
  }, [createError]);

  async function onSubmit(values: z.infer<typeof CreateLinkCartSchema>) {
    if (!session?.user?.id) {
      toast.error("Error", {
        description: "You must be logged in to create a folder"
      });
      return;
    }
    
    // Double check for duplicate name
    const folderExists = folderList.some(
      folder => folder.name.toLowerCase() === values.name.trim().toLowerCase()
    );
    
    if (folderExists) {
      form.setError("name", {
        type: "manual",
        message: "A folder with this name already exists"
      });
      return;
    }
    
    try {
      const resultAction = await dispatch(
        createFolder({
          userId: session.user.id,
          folderName: values.name.trim()
        })
      );
      
      if (createFolder.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        
        if (data?.data) {
          // Call the onfoldercreate callback to close the dialog
          // Redux already adds the folder to the state, but we still need to call this
          // to trigger the dialog close
          onfoldercreate({
            id: data.data.id,
            name: data.data.name,
            _count: { links: 0 }
          });
          
          toast.success("Success", {
            description: `Folder ${values.name} created successfully`
          });
          
          // Navigate to the new folder
          router.push(`/dashboard/folder/${data.data.id}`);
        }
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create folder"
      });
      console.error("Failed to create folder:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="folder name" 
                    {...field} 
                    className={nameExists ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
                {nameExists && (
                  <p className="text-xs text-red-500 mt-1">
                    Try using a different name or adding a number to make it unique
                  </p>
                )}
              </FormItem>
            )}
          />
          <div>
            <Button 
              className="flex justify-between gap-x-2" 
              disabled={creating || form.formState.isSubmitting || nameExists} 
              type="submit"
            >
              <Plus />
              {creating ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}