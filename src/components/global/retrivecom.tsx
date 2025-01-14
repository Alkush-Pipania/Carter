import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Retrive = ({ url , imgurl ,description , title } :{url : string , imgurl : string , description : string , title : string}) => {
  return (
    <div className='w-full shadow-purpleShadow bg-darkBg max-w-[321px] h-[247px] flex flex-col p-2  rounded-lg shadow-2xl'>

      <Link href={url} target="_blank" rel="noopener noreferrer" className='w-full flex items-center justify-center'>
        <div className="w-full h-[150px] overflow-hidden flex items-center justify-center">
          <Image
            src={imgurl}
            width={300}
            height={150}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className='flex flex-col gap-y-1 mt-1 px-2 w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm text-lightGray font-medium '>
            {url.length > 25 ? `${url.slice(0, 25)}...` : url}
          </h2>
        </div>
        <div>
          <p className='text-sm text-gray-500 '>{description}</p>
        </div>
        <div className='text-xs text-primary-purple/primary-purple-400 font-semibold flex justify-between items-center'>
          {title.length > 40 ? `${title.slice(0, 40)}...` : title}
         
        </div>
      </div>
    </div>
  )
}

export default Retrive