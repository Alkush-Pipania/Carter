import { LinkCardLoading } from "@/components/dashboard/link-card-loading";
import Linkcompo from "@/components/dashboard/linkcompo";
import { useEffect, useState } from "react"
import empty from "@/../public/Danger.png"
import Image from "next/image";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFolderlinkStore } from "@/lib/store/links";
import { getfolderdata } from "@/server/actions/links";
import { useToast } from "@/hooks/use-toast";


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
    <main className='flex sm:flex-row flex-col flex-wrap items-start px-5 justify-start mx-10 content-start gap-8'>
      {isloading == true ? (
        <>{Array.from({ length: 6 }).map((_, index) => (
          <LinkCardLoading key={index} />
        ))}</>
      ) : (
        <>
          {currentFolder && currentFolder.links.length > 0 ? (
            // use current folder
            currentFolder.links.map((link: any) => (
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