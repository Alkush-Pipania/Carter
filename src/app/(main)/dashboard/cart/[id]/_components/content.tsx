import { LinkCardLoading } from "@/components/dashboard/link-card-loading";
import Linkcompo from "@/components/dashboard/linkcompo";
import { useEffect, useState } from "react"
import empty from "@/../public/Danger.png"
import Image from "next/image";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFolderlinkStore } from "@/lib/store/links";
import { getfolderdata } from "@/server/actions/links";
import { useToast } from "@/hooks/use-toast";
import { Nolinks } from "@/components/dashboard/Nolinks";


export default function Content({ folderid }: { folderid: number }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isloading, setloading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const searchvalue = searchParams.get('search') || '';
  const { folderlinks, setfolderLinks } = useFolderlinkStore();

  useEffect(() => {
    async function fetchfolderdata() {
      try {
        setloading(true);
        const data = await getfolderdata(folderid, searchvalue)
        if (data.error === false) {
          setfolderLinks({
            id: data.data?.id, // @ts-ignore
            links: data.data?.links || [],
          })
          setloading(false);
        }
      } catch (e) {
        {
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive'
          })
          router.replace('/404')
        }
      }



    }
    fetchfolderdata();
  }, [searchParams, folderid])
  const currentFolder = folderlinks.find((folder) => folder.id === folderid)


  return (
    <main>
      {isloading == true ? (
        <main className='grid md:grid-cols-2 md:gap-6 gap-x-2 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 
        2xl:grid-cols-4'>{Array.from({ length: 6 }).map((_, index) => (
          <LinkCardLoading key={index} />
        ))}</main>
      ) : (
        <>
          {currentFolder && currentFolder.links.length > 0 ? (
            <main className='grid md:grid-cols-2 md:gap-6 gap-x-2 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 
             2xl:grid-cols-4'>
              {currentFolder.links.map((link: any) => (
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
    </main>
  )
}