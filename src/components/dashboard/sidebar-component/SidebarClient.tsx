'use client'

import * as React from "react"
import { Search, Globe, UserPlus, Trash2, Plus, Star, Folder } from 'lucide-react'
import { useSession } from "next-auth/react"
import { redirect, useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CreateLinkCart } from "../../../app/(main)/dashboard/_component/createfolder"
import { SettingsDialog } from "../../../app/(main)/dashboard/_component/setting/settings-dialog"
import { Button } from "@/components/ui/button"
import { BeautifulDropdownMenu } from "../../../app/(main)/dashboard/_component/BeautifullDropdownMenu"
import { useRenderStore } from "@/lib/store/links"
import { getSecretKey, togglefolderCloud } from "@/server/actions/links"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getUserDetails } from "@/store/thunks/userdetailThunks"
import { getFolderData } from "@/store/thunks/folderdataThunks"
import { addFolder } from "@/store/slices/folderdataSlice"
import { moveToTrash } from "@/store/thunks/folderThunks"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function SidebarClient() {
  const { status, data: sessionData } = useSession();
  const router = useRouter();
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

  // Store hooks
  const triggerRerender = useRenderStore((state) => state.triggerRerender);

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

  const handleFolderCreate = (newfolder: any) => {
    // Don't add the folder again - it's already added by the createFolder thunk
    // Just close the dialog
    setIsCreateFolderOpen(false);
  }

  const handleShare = React.useCallback(async (id: string) => {
    try {
      const response = await getSecretKey(id);
      if (!response.error && response.data) {
        const shareMessage = `Hey! I've shared a folder with you on Carter. 🚀  
        
🔑 Secret Key: ${response.data}  
🔗 Access it here: https://carter.fun/find  

Enter the secret key to view the saved links. 🔐`;

        await navigator.clipboard.writeText(shareMessage);
        toast({
          title: "Share",
          description: "Secret key and instructions have been copied to clipboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share folder",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleCloud = React.useCallback(async (id: string) => {
    try {
      const response = await togglefolderCloud(id);
      if (!response.error) {
        triggerRerender();
        toast({
          title: "Cloud",
          description: "All links are now in cloud state",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cloud state",
        variant: "destructive",
      });
    }
  }, [triggerRerender, toast]);

  // New handleDelete function using Redux
  const handleDelete = React.useCallback(async (folderId: string, folderName: string, numberOfLinks: number) => {
    try {
      if (!sessionData?.user?.id) return;
      
      await dispatch(
        moveToTrash({
          userId: sessionData.user.id,
          folderId,
          folderName,
          numberOfLinks
        })
      ).unwrap();
      
      // Navigation is now handled in the BeautifulDropdownMenu component
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move folder to trash",
        variant: "destructive",
      });
    }
  }, [dispatch, sessionData, toast]);

  function NoFolder({ createfolder }: { createfolder: any }) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 px-4 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
          <Folder className="h-6 w-6 text-zinc-500" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-zinc-400">No folders available</h3>
        <p className="mt-1 text-xs text-zinc-500">Create a new folder to organize your content</p>
        <Button
          onClick={() => createfolder(true)}
          variant="outline"
          size="sm"
          className="mt-4 border-zinc-800
        text-white
        hover:bg-primary-purple/primary-purple-600 active:bg-primary-purple/primary-purple-700 bg-primary-purple/primary-purple-500  hover:text-zinc-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Folder
        </Button>
      </div>
    )
  }

  return (
    <Sidebar
      className="border-r-0 text-zinc-100">
      <SidebarHeader className="border-b bg-brand/brand-dark border-zinc-800">
        <div className="flex items-center gap-2 px-2 py-1">
          {userLoading ? (
            <Skeleton className="h-6 w-6 rounded-lg bg-zinc-800" />
          ) : (
            <Avatar className="h-6 w-6 rounded-lg bg-emerald-500">
              <AvatarFallback className="text-black font-bold">
                {userData?.username ? userData.username[0].toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
          )}
          {userLoading ? (
            <Skeleton className="h-4 w-24 bg-zinc-800" />
          ) : (
            <span className="text-sm font-medium text-zinc-100">{userData?.username || 'User'}</span>
          )}
        </div>
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-500" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-zinc-800/50 pl-8 text-sm text-zinc-100 placeholder-zinc-500 border-zinc-700 hover:border-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 bg-[#030014] overflow-auto">
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
                  <Link href="/dashboard/trash" className="flex items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
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
                      <h3 className="flex items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
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
          <SidebarGroupLabel className="px-2 text-xs font-medium text-zinc-500">Private</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="font-medium text-zinc-100 hover:text-white hover:bg-zinc-800/50">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Folders</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {
                    userLoading || folderLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <SidebarMenuSubItem key={index}>
                          <Skeleton className="h-5 my-2 w-ful bg-zinc-800" />
                        </SidebarMenuSubItem>
                      ))
                    ) : (
                      folderData?.length > 0 ? (
                        folderData?.map((data: any) => (
                          <SidebarMenuSubItem className="cursor-pointer" key={data.id}>
                            <SidebarMenuSubButton asChild>
                              <Link onClick={() => setActiveRoute(data.id)}
                                href={`/dashboard/folder/${data.id}`}
                                className={`
                                  ${activeRoute == data.id ?
                                    ('bg-zinc-800/50 text-white') :
                                    ('text-zinc-400 ')}
                                    flex w-full justify-between items-center gap-2  hover:bg-zinc-800/50 hover:text-zinc-100 active:bg-zinc-900
                                  `}
                              >
                                <span className="truncate">{data.name}</span>
                                <BeautifulDropdownMenu
                                  onShare={() => handleShare(data.id)}
                                  onDelete={() => handleDelete(data.id, data.name, data._count.links)}
                                  folderId={data.id.toString()}
                                  folderName={data.name}
                                  numberOfLinks={data._count.links}
                                />
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ) : (
                        <NoFolder createfolder={setIsCreateFolderOpen} />
                      )
                    )
                  }
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SettingsDialog loading={userLoading} />

        <SidebarGroup className="bg-brand/brand-dark z-20 border-t border-zinc-800">
          <SidebarGroupContent>
            <SidebarMenu >
              <SidebarMenuItem >
                <SidebarMenuButton className="text-zinc-400  hover:bg-zinc-800/50 hover:text-zinc-100">
                  <UserPlus className="h-4 w-4" />
                  <span>Invite members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
} 