"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User, KeyRound, Clock, Trash2, LogOut, Brain } from "lucide-react";


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
export default function AppSidebar() {


    const deleteAccount = async () => {


    }
    const signOut = async () => {

    }

    const items = [
        {
            title: "Profile",
            url: "/settings/profile",
            icon: User,
        },
        {
            title: "Manage Secret Keys",
            url: "/settings/secret-keys",
            icon: KeyRound,
        },
        {
            title: "Sessions",
            url: "/settings/sessions",
            icon: Clock,
        },
        {
            title: "AI Features",
            url: "/settings/ai-features",
            icon: Brain,
        },
    ]
    const pathname = usePathname();

    return (
            <Sidebar >
                <SidebarContent className='bg-brand/brand-dark  '>
                    <SidebarGroup>
                        <SidebarGroupLabel className='text-white text-sm pb-4'>Settings</SidebarGroupLabel>
                        <SidebarGroupContent className=' mt-4 border-t-[1px]  border-[#eaeaea3d]  gap-y-3'>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className='pt-1  '>

                                        <SidebarMenuButton asChild className={`hover:bg-[#15141F] hover:shadow-lg transition duration-300  hover:shadow-purpleShadow ${pathname === item.url ? ("text-white bg-[#15141F]") : ("text-[#eaeaea8e]")} hover:text-white  `} >
                                            <a href={item.url} className='hover:text-white' >
                                                <item.icon />
                                                <span className=' '>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className='bg-brand/brand-dark text-white flex flex-col justify-between items-center border-t-[1px]  border-[#eaeaea3d] gap-y-4 pt-8'>

                    <Dialog >
                        <DialogTrigger asChild>
                            <Button className='bg-[#1F1E2E] border-none hover:Neutrals/neutrals-12 max-w-[170px]' > <Trash2 className='w-4 h-4 mr-2'/>  Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-[#1F1E2E] shadow-2xl shadow-purpleShadow">
                            <DialogDescription className='text-lg  text-white text-center '>
                                Are you sure About deleting the Account ?
                            </DialogDescription>
                            <Button onSubmit={() => { deleteAccount }} className='bg-red-700 max-w-[200px] mx-auto hover:bg-red-900'>Delete</Button>
                        </DialogContent>
                    </Dialog>


                    <Dialog >
                        <DialogTrigger asChild>
                            <Button className='bg-[#1F1E2E] border-none hover:Neutrals/neutrals-12 max-w-[125px] ' > <LogOut className='w-4 h-4 mr-2'/> Sign Out</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-[#1F1E2E] shadow-2xl shadow-purpleShadow">
                            <DialogDescription className='text-lg   text-white text-center'>
                                Are sure about signout ?
                            </DialogDescription>
                            <Button onSubmit={() => { deleteAccount }} className='bg-red-700 max-w-[200px] mx-auto hover:bg-red-900'>Sign Out</Button>
                        </DialogContent>
                    </Dialog>
                </SidebarFooter>

            </Sidebar>

    )
}


