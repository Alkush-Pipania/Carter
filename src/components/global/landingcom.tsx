import React from 'react'

import Image, { StaticImageData } from 'next/image'

const Usecases = ({label , para , logo} : {label:string , para : string , logo : StaticImageData | string}) => {
  return (
    <div className='items-start flex flex-row justify-start'>
      
      <Image src={logo} className='sm:w-[60px] w-[70px]'  alt='logo' />
      
      <div className='flex gap-1 flex-col'>
        <h3 className='text-xl text-blue-50'>{label}</h3>
        <p className='text-washed-purple/washed-purple-200'>{para}</p>
      </div>
    </div>
  )
}

export default Usecases