'use client'

import * as React from "react"
import { Search, Globe, Home, Inbox, Code2, FileJson, Users, Database, Repeat, Youtube, Users2, Layout, FileCode2, DatabaseIcon as Database2, DockIcon as Docker, Star, Box, GitFork, Server, UserPlus, Trash2, Plus, Settings, Ellipsis, EllipsisIcon, Folder } from 'lucide-react'

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
import { CreateLinkCart } from "./createfolder"
import { deleteFolder, folderdata, getuserdata } from "@/server/actions/links"
import { Skeleton } from "@/components/ui/skeleton"
import { redirect, usePathname, useRouter } from "next/navigation"
import { SettingsDialog } from "./setting/settings-dialog"
import { useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { title } from "process"
import { useFolderNameStore } from "@/lib/store/links"
import { Button } from "@/components/ui/button"



export function AppSidebar() {
  const { status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin')
    }
  }, [status])
  const [isLoading, setIsLoading] = React.useState(true)
  const [folderloading, setfolderloading] = React.useState<boolean>(true);
  const [cartdata, setCartdata] = React.useState<any>([]);
  const [userdata, setUserdata] = React.useState<any>(null);
  const [activeRoute, setActiveRoute] = React.useState<any>();
  const [search, setSearch] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const { foldername , setFoldername , addFoldername , deleteFoldername } = useFolderNameStore();
  const pathname = usePathname();
  const router = useRouter();



  React.useEffect(() => {
    function handleRouteChange() {
      const pathId = pathname.split('/').pop();
      setActiveRoute(pathId);
    }
    handleRouteChange();
  }, [pathname])


  React.useEffect(() => {
    async function fetchfolderdata() {
      const userdata = await getuserdata();
      setUserdata(userdata.data);
      setIsLoading(false)
    }
    fetchfolderdata();
  }, [])

  React.useEffect(() => {
    async function fetchuserfolder() {
      setfolderloading(true);
      const res = await folderdata(search);
      setFoldername(res.data);
      setCartdata(res.data)
      setfolderloading(false);
    }
    fetchuserfolder();
  }, [search])
 

  const handleFolderCreate = (newfolder: any) => {
    addFoldername(newfolder);
    setOpen(false);
  }
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const { toast } = useToast();

  return (
    <Sidebar 
      className="border-r-0  text-zinc-100">
      <SidebarHeader className="border-b bg-brand/brand-dark border-zinc-800">
        <div className="flex  items-center gap-2 px-2 py-1">
          {isLoading ? (
            <Skeleton className="h-6 w-6 rounded-lg bg-zinc-800" />
          ) : (
            <Avatar className="h-6 w-6 rounded-lg bg-emerald-500">
              <AvatarFallback className="text-black font-bold">{userdata.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-24 bg-zinc-800" />
          ) : (
            <span className="text-sm font-medium text-zinc-100">{userdata.username}</span>
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
              <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger onChange={() => setOpen(true)}>
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
                    isLoading || folderloading ? (
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
                                <DropdownMenu>
                                  <DropdownMenuTrigger>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#ffffff"
                                      stroke-width="1.75"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="lucide lucide-ellipsis"
                                    >
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="19" cy="12" r="1" />
                                      <circle cx="5" cy="12" r="1" />
                                    </svg>
                                    <span className="sr-only">open menu</span>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent onClick={handleMenuClick}
                                    className="bg-darkBg font-mono text-white sm:relative sm:left-20 border-zinc-400 rounded-xl
                                   ">
                                    <DropdownMenuItem className="text-white cursor-pointer ">
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={async (e) => {
                                      e.stopPropagation();
                                      deleteFoldername(data.id);
                                      if(activeRoute == data.id){
                                        router.replace('/dashboard')
                                      }
                                      const res = await deleteFolder(data.id)
                                      if(res.error == false){
                                        toast({
                                          title: data.error ? "Error" : "Success",
                                          description: data.error ? "Error while deleting" : "Folder deleted successfully",
                                          variant: data.error ? "destructive" : "default",
                                        })
                                      }
                                        
                                      
                                    }}
                                      className="cursor-pointer ">
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
  
                              </Link>
  
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ):(
                        <NoFolder createfolder={setOpen}/>
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
        <SidebarGroup className="bg-brand/brand-dark z-20 bottom-0 border-t border-zinc-800">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
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


function NoFolder({createfolder} : {createfolder : any}){
  return(
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 px-4 py-8 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
      <Folder className="h-6 w-6 text-zinc-500" />
    </div>
    <h3 className="mt-4 text-sm font-medium text-zinc-400">No folders available</h3>
    <p className="mt-1 text-xs text-zinc-500">Create a new folder to organize your content</p>
    <Button
      onClick={()=> createfolder(true)}
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

