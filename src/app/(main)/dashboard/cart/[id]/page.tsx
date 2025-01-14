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
      <div className="fixed  flex mx-3 justify-start gap-x-1 items-center ">
        {isloading ?(
          <Skeleton className="h-6 w-24 bg-zinc-800" />
        ) : (
          <>
          {foldername?.name} 
          <DownCircle className="" />
           </>
        )}
      </div>
      <section className="w-full h-full my-9">
      <Content folderid={foldername?.id} />
      </section>


    </section>
  )
}