"use client"
import Image from 'next/image'
import Link from 'next/link'
import { IoMdCloudOutline } from "react-icons/io";
import { AiFillCloud } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { togglecloud } from '@/server/actions/links';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog';
import { DeleteProductAlertDialogContent } from './Deletealertdialog';


const Linkcompo = ({ tobefind, secretId, url, title, imgurl }: { tobefind: boolean, secretId: string, url: string, title: string, imgurl: string }) => {
  const [ iscloudPending , startcloudtransition ] = useTransition()
  const [local_tobefind , setLocal_tobefind ] = useState(tobefind);
  const { toast } = useToast();
  const router = useRouter();

 
 const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Success",
      description: "Copied to clipboard",
      variant: "default",
    });
  } catch (e) {
    toast({
      title: "Error",
      description: "Failed to copy to clipboard",
      variant: "destructive",
    });
  }
};

const handleCloudToggle = async () => {
  try {
    setLocal_tobefind(!local_tobefind);
    const data = await togglecloud(secretId);
    if (data.message) {
      toast({
        title: data.changeto ? "Added" : "Removed",
        description: data.changeto ? "Successfully added to cloud" : "Successfully removed from cloud",
        variant: data.changeto ? "great" : "destructive",
      });
    }
  } catch (e) {
    toast({
      title: "Unexpected error",
      description: "Something went wrong with the server",
      variant: "destructive",
    });
    setLocal_tobefind(prev => !prev); // Revert state on error
  }
};

  return (
    <div className='w-full bg-darkBg shadow-2xl hover:shadow-sm shadow-purpleShadow sm:max-w-[321px] h-full max-h-[350px] flex flex-col p-2 sm:p-3 rounded-lg transition-all duration-200 hover:shadow-purple-500/20'>
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
            className='text-xs sm:text-sm cursor-copy font-medium truncate w-full text-slate-300 hover:text-white transition-colors duration-200'
          >
            {url}
          </div>
          <button
            className='p-1 hover:bg-gray-700/50 rounded-full transition-colors duration-200'
            onClick={() => startcloudtransition(handleCloudToggle)}
          >
            {local_tobefind ? (
              <AiFillCloud className='size-5 sm:size-6 text-purple-400' />
            ) : (
              <IoMdCloudOutline className='size-5 sm:size-6 text-gray-400 hover:text-purple-400' />
            )}
          </button>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <h2 className='text-sm sm:text-base font-medium text-slate-300 truncate flex-1'>
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </h2>
          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="size-8 sm:size-9 px-0 hover:bg-gray-700/50 active:bg-gray-600/50 bg-gray-800/50 rounded-full transition-colors duration-200">
                    <div className="sr-only">Action Menu</div>
                    <DotsHorizontalIcon className="size-4 sm:size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-darkBg font-mono text-white border-gray-800'>
                  <DropdownMenuItem asChild className='hover:bg-gray-800/50 cursor-pointer'>
                    <Link href={`/dashboard/links/${secretId}/edit`}>Edit/open</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='hover:bg-gray-800/50 cursor-pointer'>
                    <h3 onClick={() => startcloudtransition(handleCloudToggle)}>
                      {local_tobefind ? "Remove from cloud" : "Add to cloud"}
                    </h3>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-gray-800'/>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className='hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer'>
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteProductAlertDialogContent id={secretId}/>
            </AlertDialog>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Linkcompo