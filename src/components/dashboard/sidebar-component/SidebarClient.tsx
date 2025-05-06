'use client'

import * as React from "react"
import { Globe, Trash2, Plus, Settings } from 'lucide-react'
import { useSession } from "next-auth/react"
import type { Session } from "next-auth"
import { redirect, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CreateLinkCart } from "../../../app/(main)/dashboard/_component/createfolder"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getUserDetails } from "@/store/thunks/userdetailThunks"
import { getFolderData } from "@/store/thunks/folderdataThunks"
import { moveToTrash } from "@/store/thunks/folderThunks"
import SidebarUserInfo from './SidebarUserInfo';
import SidebarSearch from './SidebarSearch';
import SidebarFolders from './SidebarFolders';
import SidebarInviteMembers from './SidebarInviteMembers';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function SidebarClient() {
  const { status, data: sessionData } = useSession() as { status: string, data: Session | null };
  const pathname = usePathname();
  const { toast } = useToast();
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userdetail.data);
  const userLoading = useAppSelector((state) => state.userdetail.loading);
  const folderData = useAppSelector((state) => state.folderdata.data);
  const folderLoading = useAppSelector((state) => state.folderdata.loading);

  // State management with proper types
  const [activeRoute, setActiveRoute] = React.useState<string>();
  const [search, setSearch] = React.useState('');
  const [isCreateFolderOpen, setIsCreateFolderOpen] = React.useState(false);


  // Authentication check
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin');
    }
  }, [status]);

  // Route change handler
  React.useEffect(() => {
    const pathId = pathname.split('/').pop();
    setActiveRoute(pathId);
  }, [pathname]);

  // Fetch user data
  React.useEffect(() => {
    if (status === 'authenticated' && sessionData?.user?.id) {
      dispatch(getUserDetails(sessionData.user.id));
    }
  }, [dispatch, status, sessionData]);

  // Fetch folders with debounced search
  React.useEffect(() => {
    if (status === 'authenticated' && sessionData?.user?.id) {
      const debounceTimer = setTimeout(() => {
        dispatch(getFolderData({
          user_id: sessionData.user.id,
          search
        }));
      }, 300); // Debounce search for 300ms

      return () => clearTimeout(debounceTimer);
    }
  }, [search, dispatch, status, sessionData]);

  const handleFolderCreate = () => {
    setIsCreateFolderOpen(false);
  }




  return (
    <Sidebar
      className="border-r-0 text-zinc-100">
      <SidebarHeader className="border-b bg-brand-bg border-none">
        <SidebarUserInfo userLoading={userLoading} username={userData?.username} />
        <SidebarSearch onSearch={setSearch} />
      </SidebarHeader>
      <SidebarContent className="p-0 bg-brand-bg overflow-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="#1">
                <SidebarMenuButton asChild>
                  <Link onClick={() => setActiveRoute("dashboard")} href="/dashboard/"
                    className={`flex 
                  ${activeRoute === "dashboard" ?
                        ('bg-zinc-800/50 text-white') :
                        ('text-zinc-400 '
                        )}
                   hover:bg-zinc-800/50 active:bg-zinc-900 hover:text-zinc-100
                  items-center gap-2 `}>
                    <Globe className="h-4 w-4" />
                    <span >Global Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key="#2">
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/trash" className={`flex 
                  ${activeRoute === "trash" ?
                        ('bg-zinc-800/50 text-white') :
                        ('text-zinc-400 '
                        )}
                   hover:bg-zinc-800/50 active:bg-zinc-900 hover:text-zinc-100
                  items-center gap-2 `}>
                    <Trash2 className="h-4 w-4" />
                    <span >Trash</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Create folder here ! */}
              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen} >
                <DialogTrigger onChange={() => setIsCreateFolderOpen(true)}>
                  <SidebarMenuItem key="#3">
                    <SidebarMenuButton asChild>
                      <h3 className="flex items-center gap-2 text-zinc-400 active:bg-zinc-900 hover:bg-zinc-800/50 hover:text-zinc-100">
                        <Plus className="h-4 w-4" />
                        <span >Create Folder</span>
                      </h3>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DialogTrigger>
                <DialogContent className="bg-brand/brand-dark/80">
                  <DialogHeader>
                    <DialogTitle>
                      Create Folder
                    </DialogTitle>
                  </DialogHeader>
                  <CreateLinkCart onfoldercreate={handleFolderCreate} />
                </DialogContent>
              </Dialog>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarFolders
            userLoading={userLoading}
            folderLoading={folderLoading}
            folderData={folderData}
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
            setIsCreateFolderOpen={setIsCreateFolderOpen}
          />
        </SidebarGroup>
        <SidebarMenuButton asChild>
        <Link href="/setting" className="flex items-center px-4 gap-2 active:bg-zinc-900 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
        <Settings className="w-4 h-4" />
          <span >Settings</span>
          </Link>
        </SidebarMenuButton>

        <SidebarGroup className=" z-20 border-t border-zinc-800">
          <SidebarGroupContent>
            <SidebarInviteMembers />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
} 