"use client"
import Image from 'next/image';
import Link from 'next/link';
import { IoMdCloudOutline } from "react-icons/io";
import { AiFillCloud } from "react-icons/ai";
import { Button } from '../ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog';
import { DeleteProductAlertDialogContent } from './Deletealertdialog';
import { Dialog } from '../ui/dialog';
import { toggleCloudStatus } from '@/store/thunks/linkContentThunks';
import { useAppDispatch } from '@/store/hooks';

const Linkcompo = ({ tobefind, secretId, url, title, imgurl }: { tobefind: boolean, secretId: string, url: string, title: string, imgurl: string }) => {
  const [iscloudPending, startcloudtransition] = useTransition();
  const [local_tobefind, setLocal_tobefind] = useState(tobefind);
  const dispatch = useAppDispatch();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Success", {
        description: "Copied to clipboard"
      });
    } catch (e) {
      toast.error("Error", {
        description: "Failed to copy to clipboard"
      });
    }
  };

  const handleCloudToggle = async () => {
    try {
      // Optimistically update local state
      setLocal_tobefind(!local_tobefind);
      
      // Get userId from localStorage
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error("Authentication error", {
          description: "Please sign in again"
        });
        setLocal_tobefind(prev => !prev); // Revert state on error
        return;
      }
      
      const result = await dispatch(toggleCloudStatus({
        linkId: secretId,
        userId: userId
      })).unwrap();
      
      if (result.message) {
        toast.success(!local_tobefind ? "Added" : "Removed", {
          description: !local_tobefind ? "Successfully added to cloud" : "Successfully removed from cloud"
        });
      }
    } catch (e) {
      toast.error("Unexpected error", {
        description: "Something went wrong with the server"
      });
      setLocal_tobefind(prev => !prev); // Revert state on error
    }
  };

  return (
    <div className='w-full shadow-md hover:shadow-sm dark:shadow-zinc-800 light:shadow-zinc-200 sm:max-w-[321px] h-full max-h-[350px] flex flex-col p-2 sm:p-3 rounded-lg transition-all duration-200 dark:bg-card bg-white dark:hover:shadow-zinc-400/20 light:hover:shadow-zinc-300/50 border dark:border-border border-slate-200'>
      <Link href={url} target="_blank" rel="noopener noreferrer" className='w-full flex items-center justify-center'>
        <div className="w-full h-[120px] sm:h-[150px] overflow-hidden flex items-center justify-center rounded-md">
          {imgurl === "no image" ? (
            <div className="text-sm sm:text-base text-gray-400">Image not extracted</div>
          ) : (
            <Image
              src={imgurl}
              width={300}
              height={150}
              alt={title || "Link preview"}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 mt-2 px-2 w-full'>
        <div className='flex items-center gap-x-2 justify-between'>
          <div 
            onClick={() => handleCopy(url)} 
            className='text-xs sm:text-sm cursor-copy font-medium truncate w-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200'
          >
            {url}
          </div>
          <button
            className='p-1 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-full transition-colors duration-200'
            onClick={() => startcloudtransition(handleCloudToggle)}
          >
            {local_tobefind ? (
              <AiFillCloud className='size-5 sm:size-6 text-text-primary' />
            ) : (
              <IoMdCloudOutline className='size-5 sm:size-6 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400' />
            )}
          </button>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <h2 className='text-sm sm:text-base font-medium text-slate-800 dark:text-slate-300 truncate flex-1'>
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </h2>
          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="size-8 sm:size-9 px-0 hover:bg-gray-100 active:bg-gray-200 bg-slate-50 dark:hover:bg-gray-700/50 dark:active:bg-gray-600/50 dark:bg-zinc-700 rounded-full transition-colors duration-200">
                    <div className="sr-only">Action Menu</div>
                    <DotsHorizontalIcon className="size-4 sm:size-5 text-slate-700 dark:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='font-mono bg-white text-slate-800 border-slate-200 dark:bg-zinc-800/95 dark:text-white dark:border-gray-800'>
                  <DropdownMenuItem asChild className='hover:bg-slate-100 dark:hover:bg-gray-800/50 cursor-pointer'>
                    <Link href={`/dashboard/links/${secretId}`}>open</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='hover:bg-slate-100 dark:hover:bg-gray-800/50 cursor-pointer'>
                    <h3 onClick={() => startcloudtransition(handleCloudToggle)}>
                      {local_tobefind ? "Remove from cloud" : "Add to cloud"}
                    </h3>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-slate-200 dark:bg-gray-800'/>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className='hover:bg-red-50 text-red-600 hover:text-red-700 dark:hover:bg-red-500/20 dark:text-red-400 dark:hover:text-red-300 cursor-pointer'>
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteProductAlertDialogContent  id={secretId}/>
            </AlertDialog>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Linkcompo