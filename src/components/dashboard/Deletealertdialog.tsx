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
import { toast } from "sonner"
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteGlobalLink } from "@/store/thunks/userLinksGlobalThunk";
import { deleteFolderLink } from "@/store/thunks/folderLinksThunk";

export function DeleteProductAlertDialogContent({ id }: { id: string }) {
  const pathname = usePathname();
  const pathId = pathname.split('/').pop();
  const [isDeletePending, startDeleteTransition] = useTransition()
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem('userId');

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting link...', {
      duration: Infinity 
    });

    try {
      if (pathId === 'dashboard') {
        await dispatch(deleteGlobalLink({ linkId: id, userId })).unwrap();
      } else {
        await dispatch(deleteFolderLink({ linkId: id, userId })).unwrap();
      }
      
      router.refresh();
      toast.success('Link deleted successfully', {
        id: toastId
      });
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong while deleting the link', {
        id: toastId
      });
    }
  };

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
          onClick={() => startDeleteTransition(handleDelete)}
          disabled={isDeletePending}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}