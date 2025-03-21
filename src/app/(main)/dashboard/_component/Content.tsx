"use client"
import Linkcompo from "@/components/dashboard/linkcompo";
import Image from "next/image";
import empty from "../../../../../public/Danger.png"
import { useEffect, useState } from "react";
import { LinkCardLoading } from "@/components/dashboard/link-card-loading";
import { getLinklist } from "@/server/actions/links";
import { useSearchParams } from "next/navigation";
import { useLinkStore } from '@/lib/store/links';
import { Link2Off, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nolinks } from "@/components/dashboard/Nolinks";

export default function Content() {
  const [isloading, setloading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const searchvalue = searchParams.get('search') || '';
  const { links, setLinks } = useLinkStore();

  useEffect(() => {
    async function fetchdata() {
      setloading(true);
      const data = await getLinklist(searchvalue);
      setLinks(data.data);
      setloading(false);
    }
    fetchdata();
  }, [searchvalue, setLinks]);

  return (
    <section >
      {isloading ? (
        <main className='grid md:grid-cols-2 md:gap-6 gap-x-1 sm:grid-cols-2 gap-y-2 grid-cols-1 lg:grid-cols-3 
        2xl:grid-cols-4'>{Array.from({ length: 6 }).map((_, index) => (
          <LinkCardLoading key={index} />
        ))}</main>
      ) : (
        <>
          {links?.length > 0 ? (
            <main className='grid gap-y-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6'>
              {links.map((link: any) => (
                <Linkcompo
                  key={link.secret_Id}
                  tobefind={link.tobefind}
                  secretId={link.secret_Id}
                  url={link.links}
                  title={link.title || "no title"}
                  imgurl={link.imgurl || "no image"}
                />
              ))}
            </main>
          ) : (
            <Nolinks/>
          )}
        </>
      )}
    </section>
  )
}