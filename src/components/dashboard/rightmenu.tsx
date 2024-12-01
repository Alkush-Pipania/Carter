
import { getServerSession } from "next-auth";
import { Editprofile } from "../form/Editprofile";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { EllipsisVertical } from 'lucide-react';
import { authOption } from "@/lib/auth";
import { useEffect, useState } from "react";
import { retrivedata } from "@/server/actions/links";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";



export default function Rightmenu({ userid } : {userid : string}) {
  const {toast} = useToast();
 const [data , setdata] = useState<any>(null)
  useEffect( () =>{
   async function fetchdata(){
    var data = await retrivedata(userid);
    setdata(data)
   }
   fetchdata()
  },[userid])
  
  
  const handleCopy = async (text : string) =>{
    try{
      await navigator.clipboard.writeText(text);
      toast({
        title :  "Success",
        description : "Copied to clipboard",
        variant :  "default"
      })
    }catch(e){
      toast({
        title :  "Error",
        description : "Failed to copy to clipboard",
        variant :  "destructive"
      })
    }
  }
  
  

  return (
    <Sheet key="right">
      <SheetTrigger asChild>
        <EllipsisVertical className='h-6 cursor-pointer hover:text-slate-300 active:text-slate-100' />
      </SheetTrigger>
      <SheetContent className='bg-brand/brand-dark/85 ' side='right'>
        <SheetHeader>
          <SheetTitle asChild >
            <h3 className='text-gray-100 hover:text-white'>Edit profile</h3>
          </SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <Editprofile data={data?.data}/>
        <SheetHeader>
          <SheetTitle className='text-gray-100 hover:text-white'>
           Global Secret key
          </SheetTitle>
          <div>
          <Badge onClick={() => handleCopy(data?.data.secretkey)}
           className=" w-auto cursor-copy" >{data?.data.secretkey}</Badge>
          </div>
        </SheetHeader>
        
      </SheetContent>
    </Sheet>
  )
}