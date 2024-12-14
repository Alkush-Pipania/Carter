'use client'

import * as React from "react"
import { Search, Globe, Home, Inbox, Code2, FileJson, Users, Database, Repeat, Youtube, Users2, Layout, FileCode2, DatabaseIcon as Database2, DockIcon as Docker, Star, Box, GitFork, Server, UserPlus, Trash2, Plus, Settings, Ellipsis, EllipsisIcon } from 'lucide-react'

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
import { folderdata, getuserdata } from "@/server/actions/links"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"


export function AppSidebar() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [cartdata, setCartdata] = React.useState<any>([])
  const [userdata, setUserdata] = React.useState<any>("");


  React.useEffect(() => {
    async function fetchfolderdata() {
      const res = await folderdata()
      const userdata = await getuserdata();
      setUserdata(userdata.data);
      setCartdata(res.data)
      setIsLoading(false)
    }

    fetchfolderdata()
  }, [])


  return (
    <Sidebar className="border-r-0  text-zinc-100">
      <SidebarHeader className="border-b border-zinc-800">
        <div className="flex items-center gap-2 px-2 py-1">
          {isLoading ? (
            <Skeleton className="h-6 w-6 rounded-lg bg-zinc-800" />
          ) : (
            <Avatar className="h-6 w-6 rounded-lg bg-emerald-500">
              <AvatarFallback className="text-black font-bold">A</AvatarFallback>
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
                  <Link href="/dashboard/" className="flex items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
                    <Globe className="h-4 w-4" />
                    <span >Global Links</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key="#2">
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
                    <Trash2 className="h-4 w-4" />
                    <span >Trash</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* CReate folder here ! */}
              <Dialog>
                <DialogTrigger>
                  <SidebarMenuItem key="#3">
                    <SidebarMenuButton asChild>
                      <h3 className="flex items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
                        <Plus className="h-4 w-4" />
                        <span >Create LinkCart</span>
                      </h3>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DialogTrigger>
                <DialogContent className="bg-brand/brand-dark/80">
                  <DialogHeader>
                    <DialogTitle>
                      Create LinkCart
                    </DialogTitle>
                  </DialogHeader>
                  <CreateLinkCart />
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
                  <span>LinkCarts</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {
                    isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <SidebarMenuSubItem key={index}>
                          <Skeleton className="h-5 my-2 w-ful bg-zinc-800" />
                        </SidebarMenuSubItem>
                      ))
                    ) : (
                      cartdata?.map((data: any) => (
                        <SidebarMenuSubItem className="cursor-pointer" key={data.id}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={`/dashboard/cart/${data.id}`}
                              className="flex w-full justify-between items-center gap-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                            >
                              <span className="truncate">{data.name}</span>

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
                            </Link>

                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))
                    )
                  }
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
                  <Settings className="h-4 w-4" />
                  <span>Setting</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*  */}
        <SidebarGroup className="mt-auto border-t border-zinc-800">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100">
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

