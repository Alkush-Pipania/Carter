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
                    <SidebarGroupLabel className='text-white text-2xl pb-4'>Settings</SidebarGroupLabel>
                    
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

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#1F1E2E] border-none hover:bg-neutral-800 max-w-[170px]">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] border-[1px] border-[#ffffff6b] bg-[#1F1E2E] p-6 shadow-2xl shadow-purpleShadow rounded-md">
                        <div className="space-y-4">
                            <div className="text-white text-left">
                                <h2 className="text-lg font-semibold mb-2">Delete account</h2>
                                <p className="text-sm text-neutral-400">
                                    This will permanently delete your Personal Account.
                                    Please note that this action is irreversible, so proceed with caution.
                                </p>
                            </div>
                            <Button
                                onClick={() => { deleteAccount() }}
                                className="bg-red-700 hover:bg-red-900 max-w-[200px] mx-auto block"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>


                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#1F1E2E] border-none hover:bg-neutral-800 max-w-[125px]">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] border-2 border-red-600 bg-[#1F1E2E] p-6 shadow-2xl shadow-purpleShadow rounded-md">
                        <div className="space-y-4">
                            <div className="text-white text-center">
                                <h2 className="text-lg font-semibold mb-2">Sign Out</h2>
                                <p className="text-sm text-neutral-400">
                                    Are you sure you want to sign out?
                                </p>
                            </div>

                            <Button
                                onClick={() => { signOut() }}
                                className="bg-red-700 hover:bg-red-900 max-w-[200px] mx-auto block"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </SidebarFooter>

        </Sidebar>

    )
}


