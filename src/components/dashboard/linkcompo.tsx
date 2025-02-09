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


  return (
    <div className='w-full bg-darkBg shadow-2xl hover:shadow-sm shadow-purpleShadow sm:max-w-[321px] h-full max-h-[350px] flex flex-col p-2  rounded-lg '>

      <Link href={url} target="_blank" rel="noopener noreferrer" className='w-full flex items-center justify-center'>
        <div className="w-full h-[150px] overflow-hidden flex items-center justify-center">
          {imgurl === "no image" ? (
            <div>Image not extracted</div>
          ) : (
            <Image
              src={imgurl}
              width={300}
              height={150}
              alt="logo"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </Link>
      <div className='flex flex-col gap-y-1 mt-1 px-2 w-full'>
        <div className='flex items-center gap-x-2 justify-between'>
          <div onClick={()=> handleCopy(url)} className='text-sm cursor-copy font-medium truncate w-full text-slate-300'>
            {url}
          </div>
          <button
          className='p-0 '
            onClick={()=>{
               setLocal_tobefind(!local_tobefind)
              startcloudtransition(async ()=>{
                const data = await togglecloud(secretId);
                if(data.message){
                  toast({
                    title : data.changeto ? "Added" : "Removed",
                    description : data.changeto ? "Successfully added to cloud" : 
                    "Succesfully removed from cloud",
                    variant : data.changeto ? "great": "destructive",
                  })
                }
               
              })
            }}
          >
            {local_tobefind === true ? (<AiFillCloud className='size-6' />) : (<IoMdCloudOutline className='size-6' />)}
          </button>

        </div>
        <div className='text-xs text-gray-100 flex justify-between items-center'>
        <h2 className='text-sm font-medium text-slate-300'>
        {title.length > 40 ? `${title.slice(0, 40)}...` : title}
        </h2>
         
           <Dialog>
          <AlertDialog>

         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button  className="size-6 px-0  hover:bg-gray-400 active:bg-gray-300   bg-gray-500">
              <div className="sr-only">Action Menu</div>
              <DotsHorizontalIcon className="size-5" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-darkBg font-mono text-white'>
              <DropdownMenuItem asChild>
              <Link href={`/dashboard/links/${secretId}/edit`}>Edit/open</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
              <h3 
              onClick={()=>{
                startcloudtransition(async ()=>{
                  try{
                    setLocal_tobefind(!local_tobefind)
                  const data = await togglecloud(secretId);
                  if(data.message){
                    toast({
                      title : data.changeto ? "Added" : "Removed",
                      description : data.changeto ? "Successfully added to cloud" : 
                      "Succesfully removed from cloud",
                      variant : data.changeto ? "great": "destructive",
                    })
                  }
                  }catch(e){
                    toast({
                      title : "unexpected error",
                      description : "something up with the server",
                      variant : "destructive",
                    })
                  }
                 
                })
              }}
              >{local_tobefind == true ? "remove from cloud" : "add to cloud" }</h3>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <AlertDialogTrigger asChild>
              <DropdownMenuItem >
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