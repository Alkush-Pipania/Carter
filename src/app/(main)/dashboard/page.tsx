


import down from "../../../../public/down.png"
import Image from 'next/image';
import empty from "../../../../public/Danger.png"
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { getLinklist } from '@/lib/global/handler';
import Linkcompo from '@/components/dashboard/linkcompo';
import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Dashbar from "@/components/dashboard/dashbar";
import { Button } from "@/components/ui/button";
import {AppSidebar} from "./_component/Sidebar";
import { Menu } from "lucide-react";
import Content from "./_component/Content";





const Dashboard = async () => {
  const datacard = await getLinklist();

  const session = getServerSession(authOption);
  if (!session || !datacard) {
    redirect('/')
  }



  return (
    <section className=" w-full  ">
      
     <Content datacard={datacard}/>
     
    </section>

  )
}

export default Dashboard

