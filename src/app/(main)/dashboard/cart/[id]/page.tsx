"use client"
import DownCircle from "@/app/favicon/downcirlce";
import { getfolderdata, getfoldername } from "@/server/actions/links";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Content from "./_components/content";
import { Skeleton } from "@/components/ui/skeleton";

type Folderdata = {
  name : string;
  id : number;
}

export default function LinkCart() {
  const router = useRouter();
 const [isloading , setisLoading] = useState<boolean>(true);
  const [ foldername , setFoldername] = useState<Folderdata>();
  const pathname = usePathname();
  

 useEffect(() =>{
  async function fetchdata(){
    setisLoading(true)
    const pathId = pathname.split('/').pop();
    const data = await getfoldername(pathId);
    if(data.data === null){
      router.replace('/dashboard')
    }
    
    setFoldername(data.data);
    setisLoading(false)
  }
  fetchdata();
 },[pathname ])

  return (
    <section className=" w-full flex flex-col h-screen  ">
      <div className="fixed right-0 flex mx-3 justify-center gap-x-1 items-center ">
        {isloading ?(
          <Skeleton className="h-6 w-24 bg-zinc-800" />
        ) : (
          <div className="flex bg-brand/brand-dark px-2 py-1 rounded-full items-center capitalize text-xl justify-between">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            
          {foldername?.name} 
          <DownCircle className="text-purple-400" />
           </div>
        )}
      </div>
      <section className="w-full px-5 h-full my-9">
      <Content folderid={foldername?.id} />
      </section>


    </section>
  )
}
