import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Dashbar from '@/components/dashboard/dashbar'
import AppSidebar from "@/components/setting/AppSidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Dashbar />
    <SidebarProvider className="w-full h-[1px] ">
        <AppSidebar  />
        <main className="flex items-center justify-center mx-auto w-full h-full border-t-[1px]  border-[#eaeaea3d]">
          {children}
        </main>
    </SidebarProvider>
    </>
  )
}
