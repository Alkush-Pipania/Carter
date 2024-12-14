import Linkcompo from "@/components/dashboard/linkcompo";
import Image from "next/image";
import empty from "../../../../../public/Danger.png"


export default function Content({datacard} : {datacard : any}){
return(
  <main className='flex sm:flex-row flex-col flex-wrap items-start px-5 gap-y-4 justify-start content-start gap-2'>
      
    {datacard?.data?.length > 0 ? (
      datacard.data.map(link => (
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
  </main>
)
}