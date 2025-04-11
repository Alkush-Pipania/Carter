'use client'

import * as React from "react"
import { Search, Globe, DatabaseIcon as Database2, DockIcon as Docker, Star, UserPlus, Trash2, Plus, Folder } from 'lucide-react'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CreateLinkCart } from "../../app/(main)/dashboard/_component/createfolder"
import { deleteFolder, folderdata, getSecretKey, getuserdata, togglefolderCloud } from "@/server/actions/links"
import { Skeleton } from "@/components/ui/skeleton"
import { redirect, usePathname, useRouter } from "next/navigation"
import { SettingsDialog } from "../../app/(main)/dashboard/_component/setting/settings-dialog"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useFolderNameStore, useNameStore, useRenderStore, useTrashFolderStore } from "@/lib/store/links"
import { Button } from "@/components/ui/button"
import { BeautifulDropdownMenu } from "../../app/(main)/dashboard/_component/BeautifullDropdownMenu"



export function AppSidebar() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // State management with proper types
  const [isLoading, setIsLoading] = React.useState(true);
  const [folderLoading, setFolderLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<any>(null);
  const [activeRoute, setActiveRoute] = React.useState<string>();
  const [search, setSearch] = React.useState('');
  const [isCreateFolderOpen, setIsCreateFolderOpen] = React.useState(false);

  // Store hooks
  const { foldername, setFoldername, addFoldername, deleteFoldername } = useFolderNameStore();
  const { addTrashfolder } = useTrashFolderStore();
  const triggerRerender = useRenderStore((state) => state.triggerRerender);
  const { name, setName } = useNameStore();

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
    async function fetchUserData() {
      try {
        const response = await getuserdata();
        if (response.data) {
          setUserData(response.data);
          setName(response.data.username);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [setName, toast]);

  // Fetch folders with debounced search
  React.useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      try {
        setFolderLoading(true);
        const response = await folderdata(search);
        if (response.data) {
          setFoldername(response.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch folders",
          variant: "destructive",
        });
      } finally {
        setFolderLoading(false);
      }
    }, 300); // Debounce search for 300ms

    return () => clearTimeout(debounceTimer);
  }, [search, setFoldername, toast]);

  const handleFolderCreate = (newfolder: any) => {
    addFoldername(newfolder);
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

  const handleDelete = React.useCallback(async (folderId: string, folderName: string, numberOfLinks: number) => {
    try {
      const folder = { folderId, folderName, numberOfLinks };
      addTrashfolder(folder);
      
      const response = await deleteFolder(parseInt(folderId));
      if (!response.error) {
        deleteFoldername(folderId);
        if (activeRoute === folderId) {
          router.push('/dashboard');
        }
        toast({
          title: "Move to Trash",
          description: "Successfully moved to trash",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  }, [addTrashfolder, deleteFoldername, activeRoute, router, toast]);

  return (
    <Sidebar
      className="border-r-0  text-zinc-100">
      <SidebarHeader className="border-b bg-brand/brand-dark border-zinc-800">
        <div className="flex  items-center gap-2 px-2 py-1">
          {isLoading ? (
            <Skeleton className="h-6 w-6 rounded-lg bg-zinc-800" />
          ) : (
            <Avatar className="h-6 w-6 rounded-lg bg-emerald-500">
              <AvatarFallback className="text-black font-bold">{name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-24 bg-zinc-800" />
          ) : (
            <span className="text-sm font-medium text-zinc-100">{name}</span>
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
              {/* CReate folder here ! */}
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

              {/* ended */}

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
                    isLoading || folderLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <SidebarMenuSubItem key={index}>
                          <Skeleton className="h-5 my-2 w-ful bg-zinc-800" />
                        </SidebarMenuSubItem>
                      ))
                    ) : (
                      foldername.length > 0 ? (
                        foldername?.map((data: any) => (
                          <SidebarMenuSubItem className="cursor-pointer" key={data.id}>
                            <SidebarMenuSubButton asChild>
                              <Link onClick={() => setActiveRoute(data.id)}
                                href={`/dashboard/cart/${data.id}`}
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
                                  onCloud={() => handleCloud(data.id)}
                                  onDelete={() => {
                                    deleteFoldername(data.id);
                                    if (activeRoute == data.id) {
                                      router.push('/dashboard')
                                    }
                                    handleDelete(data.id, data.name, data._count.links)
                                  }
                                  }
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
        {/*  */}

        <SettingsDialog loading={isLoading} />

        {/*  */}
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

