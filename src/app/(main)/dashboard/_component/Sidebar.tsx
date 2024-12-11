import Dashbar from "@/components/dashboard/dashbar"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



const SideBar = () => {
  return (
    <>
     
    <Sidebar collapsible="icon" variant="floating"  className="mt-10">
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Application</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  )
}

export default SideBar