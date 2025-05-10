'use client'

import * as React from "react"
import { Globe, Trash2, Plus, Settings } from 'lucide-react'
import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CreateLinkCart } from "@/components/dashboard/createfolder"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getUserDetails } from "@/store/thunks/userdetailThunks"
import { getFolderData } from "@/store/thunks/folderdataThunks"
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
  const {status} = useSession();
  const userId = localStorage.getItem('userId')
  const pathname = usePathname();
  
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
    if (status === 'authenticated' && userId) {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, status, userId]);

  // Fetch folders with debounced search
  React.useEffect(() => {
    if (status === 'authenticated' && userId) {
      const debounceTimer = setTimeout(() => {
        dispatch(getFolderData({
          user_id: userId,
          search
        }));
      }, 300); // Debounce search for 300ms

      return () => clearTimeout(debounceTimer);
    }
  }, [search, dispatch, status, userId]);

  const handleFolderCreate = () => {
    setIsCreateFolderOpen(false);
  }




  return (
    <Sidebar
      className="border-r-0">
      <SidebarHeader className="border-b  border-none">
        <SidebarUserInfo userLoading={userLoading} username={userData?.name} />
        <SidebarSearch onSearch={setSearch} />
      </SidebarHeader>
      <SidebarContent className="p-0 overflow-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="#1">
                <SidebarMenuButton asChild>
                  <Link onClick={() => setActiveRoute("dashboard")} href="/dashboard/"
                    className={`flex 
                  ${activeRoute === "dashboard" ?
                        ('dark:bg-zinc-800/50 bg-slate-200 dark:text-white text-slate-900') :
                        ('dark:text-zinc-400 text-slate-700'
                        )}
                   dark:hover:bg-zinc-800/50 dark:active:bg-zinc-900 hover:bg-slate-200 active:bg-slate-300 dark:hover:text-zinc-100 hover:text-slate-900
                  items-center gap-2 transition-colors `}>
                    <Globe className="h-4 w-4" />
                    <span >Global Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key="#2">
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/trash" className={`flex 
                  ${activeRoute === "trash" ?
                        ('dark:bg-zinc-800/50 bg-slate-200 dark:text-white text-slate-900') :
                        ('dark:text-zinc-400 text-slate-700'
                        )}
                   dark:hover:bg-zinc-800/50 dark:active:bg-zinc-900 hover:bg-slate-200 active:bg-slate-300 dark:hover:text-zinc-100 hover:text-slate-900
                  items-center gap-2 transition-colors `}>
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
                      <h3 className="flex items-center gap-2 text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:text-zinc-400 dark:active:bg-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 hover:text-slate-900 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span >Create Folder</span>
                      </h3>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DialogTrigger>
                <DialogContent className="dark:bg-zinc-900/95 bg-white border dark:border-gray-800 border-gray-200">
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
        <Link href="/setting" className="flex items-center px-4 gap-2 text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:active:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 hover:text-slate-900 transition-colors">
        <Settings className="w-4 h-4" />
          <span >Settings</span>
          </Link>
        </SidebarMenuButton>

        <SidebarGroup className="z-20 border-t dark:border-zinc-800 border-slate-200">
          <SidebarGroupContent>
            <SidebarInviteMembers />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
} 