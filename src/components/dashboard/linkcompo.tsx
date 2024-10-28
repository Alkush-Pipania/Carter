"use client"
import Image from 'next/image'
import Link from 'next/link'
import { IoMdCloudOutline } from "react-icons/io";
import { AiFillCloud } from "react-icons/ai";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdDeleteOutline } from "react-icons/md";


const Linkcompo = ({ tobefind, secretId, url, title, imgurl }: { tobefind: boolean, secretId: string, url: string, title: string, imgurl: string }) => {
  const router = useRouter();





  return (
    <div className='w-full bg-darkBg shadow-2xl hover:shadow-sm shadow-purpleShadow max-w-[321px] h-[227px] flex flex-col p-2  rounded-lg '>

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
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-medium text-slate-300'>
            {url.length > 25 ? `${url.slice(0, 25)}...` : url}
          </h2>
          <button
            onClick={async () => {
              try {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}api/linkform`, {
                  secret_Id: secretId,
                });
                router.refresh()

              } catch (error: any) {
                console.error("Error updating linkform:", error.response ? error.response.data : error.message);
              }
            }}
          >
            {tobefind === true ? (<AiFillCloud />) : (<IoMdCloudOutline />)}
          </button>

        </div>
        <div className='text-xs text-gray-100 flex justify-between items-center'>
          {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          <button
            onClick={async () => {
              try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/delteform`, {
                  data: { secret_Id: secretId }
                });

                router.refresh()
                console.log("Delete response:", response.data);
              } catch (error: any) {
                console.error("Error deleting linkform:", error.response ? error.response.data : error.message);
              }
            }}
          ><MdDeleteOutline className='text-base' /></button>
        </div>
      </div>
    </div>

  )
}

export default Linkcompo