"use client"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useFolderlinkStore, useLinkStore } from "@/lib/store/links";
import { deltelinkcard } from "@/server/actions/links"
import { usePathname, useRouter } from 'next/navigation';

import { useTransition } from "react"

export function DeleteProductAlertDialogContent({ id }: { id: string }) {
  const pathname = usePathname();
  const pathId = pathname.split('/').pop();
  const [isDeletePending, startDeleteTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter();
  const { setfolderLinks ,folderlinks, deletefolderLink } = useFolderlinkStore();
  const { deleteLink } = useLinkStore();

  return (
    <AlertDialogContent className="bg-brand/brand-dark">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          link.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="text-black hover:bg-gray-300">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            startDeleteTransition(async () => {
              const data = await deltelinkcard(id);
              if (data.error == false) {
                if (pathId == 'dashboard') {
                 deleteLink(id);
                } else {
                  console.log(pathId , id)
                  deletefolderLink(pathId , id)
                }
              }

              if (data.message) {
                toast({
                  title: data.error ? "Error" : "Success",
                  description: data.message,
                  variant: data.error ? "destructive" : "default",
                })
              }
              router.refresh();
            })
          }}
          disabled={isDeletePending}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}