"use client"
import Linkcompo from "@/components/dashboard/linkcompo";
import Image from "next/image";
import empty from "../../../../../public/Danger.png"
import { useEffect, useState } from "react";
import { LinkCardLoading } from "@/components/dashboard/link-card-loading";
import { getLinklist } from "@/server/actions/links";
import { useSearchParams } from "next/navigation";
import { useLinkStore } from '@/lib/store/links';

export default function Content() {
  const [isloading, setloading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const searchvalue = searchParams.get('search') || '';
  const { links, setLinks } = useLinkStore();

  useEffect(() => {
    async function fetchdata() {
      setloading(true)
      const data = await getLinklist(searchvalue);
      setLinks(data.data);
      setloading(false)
    }
    fetchdata();
  }, [searchParams, setLinks])

  return (
    <main className='flex sm:flex-row flex-col flex-wrap items-start px-5 justify-start mx-10 content-start gap-8'>
      {isloading ? (
        <>{Array.from({ length: 6 }).map((_, index) => (
          <LinkCardLoading key={index} />
        ))}</>
      ) : (
        <>
          {links?.length > 0 ? (
            links.map((link: any) => (
              <Linkcompo
                key={link.secret_Id}
                tobefind={link.tobefind}
                secretId={link.secret_Id}
                url={link.links}
                title={link.title || "no title"}
                imgurl={link.imgurl || "no image"}
              />
            ))
          ) : (
            <div className='flex gap-2 items-center justify-center text-slate-500'>
              <Image src={empty} alt='empty' className='w-[30px]' />
              Nothing?
            </div>
          )}
        </>
      )}
    </main>
  )
}