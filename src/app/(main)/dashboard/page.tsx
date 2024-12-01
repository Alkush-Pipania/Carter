


import down from "../../../../public/down.png"
import Image from 'next/image';
import empty from "../../../../public/Danger.png"
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { getLinklist } from '@/lib/global/handler';
import Linkcompo from '@/components/dashboard/linkcompo';
import { redirect } from 'next/navigation';





const Dashboard = async () => {
  
  const session = getServerSession(authOption);
  if(!session){ 
    redirect('/signin');
  }
  const datacard = await getLinklist();
  

  return (
    <>
  <button className='sm:px-6 mt-10 flex justify-start gap-2 font-bold'>
    <div className='text-2xl outline-none'>Carter</div>
    <Image src={down} alt="drop down" className='w-[24px] my-auto' />
  </button>
  
  <section className='sm:px-6 px-7 grid grid-cols-1 gap-4 mt-10 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
  {datacard.data.length > 0 ? (
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
</section>
</>

  )
}

export default Dashboard