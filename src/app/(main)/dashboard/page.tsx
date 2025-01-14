import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { getLinklist } from '@/lib/global/handler';
import { redirect } from 'next/navigation';
import Content from "./_component/Content";

const Dashboard = async () => {
  const session = await getServerSession(authOption);
  if (!session) {
    redirect('/signin')
  }


  return (
    <section className=" w-full   ">

      <Content />

    </section>

  )
}

export default Dashboard

