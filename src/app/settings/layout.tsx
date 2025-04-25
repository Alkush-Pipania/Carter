import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import AppSidebar from "@/components/setting/AppSidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full h-[1px] ">
        <AppSidebar  />
        <main className="flex justify-center items-center mx-auto w-[40%] border-t-[1px]  border-[#eaeaea3d]">
          {children}
        </main>
    </SidebarProvider>
  )
}
