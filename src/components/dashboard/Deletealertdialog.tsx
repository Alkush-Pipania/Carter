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
    } catch (error : any) {
      toast.error(error.message || 'Something went wrong while deleting the link', {
        id: toastId
      });
    }
  };

  return (
    <AlertDialogContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 transition-colors">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-slate-900 dark:text-white transition-colors">Are you sure?</AlertDialogTitle>
        <AlertDialogDescription className="text-slate-600 dark:text-gray-400 transition-colors">
          This action cannot be undone. This will permanently delete this
          link.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 border-slate-200 dark:border-zinc-700 transition-colors">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          className="text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 border-none transition-colors"
          onClick={() => startDeleteTransition(handleDelete)}
          disabled={isDeletePending}
        >
          {isDeletePending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}