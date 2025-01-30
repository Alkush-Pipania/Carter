import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Retrive = ({ url, imgurl, description, title }: { url: string, imgurl: string, description: string, title: string }) => {
  const { toast } = useToast();

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
    <div className='w-full bg-darkBg shadow-2xl hover:shadow-sm shadow-purpleShadow sm:max-w-[321px] h-full flex flex-col p-2  rounded-lg '>
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
      <div className='flex flex-col gap-y-2 mt-1 px-2 w-full'>
        <div onClick={()=> handleCopy(url)} 
        className='flex items-center justify-between'>
          <h2 className='text-sm text-lightGray cursor-copy font-medium '>
            {url.length > 25 ? `${url.slice(0, 25)}...` : url}
          </h2>
        </div>
        <div className='text-xl text-primary-purple/primary-purple-400 font-semibold flex justify-between items-center'>
          {title}
        </div>
        <div>
          <p className='text-sm text-gray-500 '>{description}</p>
        </div>
        
      </div>
    </div>
  )
}

export default Retrive