'use client'

import * as React from "react"
import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SettingsSidebar } from "./settings-sidebar"
import { MySettings } from "./my-settings"
import { MyNotifications } from "./my-notifications"
import MyAccount from "./setingcomp/myaccount"
import { Separator } from "@/components/ui/separator"
import { getsettingdata } from "@/server/actions/links"
import { Skeleton } from "@/components/ui/skeleton"


type UserSettings = {
  username : string;
  varified : boolean;
  email: string;
}

export function SettingsDialog({loading}: {loading : boolean}) {
  const [open, setOpen] = React.useState(false)
  const [settingsdata, setSettingsdata] = React.useState<any>(null)
  const [activeItem, setActiveItem] = React.useState('#account')
 // ws approach futher...
  React.useEffect(()=>{
    async function fetchSettingsdata(){
      const res = await getsettingdata();
      setSettingsdata(res.data);
    }
    fetchSettingsdata();
  },[])

  function onhandleclick(username : any){
    settingsdata.username = username;
  }

  

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       {loading ? (
        <Skeleton className="h-4 w-24 bg-Neutrals/neutrals-11" />
       ):(
        <Button className="bg-transparent flex justify-start text-Neutrals/neutrals-6 hover:bg-Neutrals/neutrals-10 hover:text-Neutrals/neutrals-1">
        <Settings className="mr-2" />
        Open Settings
      </Button>
       )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-Neutrals/neutrals-12 border-Neutrals/neutrals-11">
        <div className="flex flex-col sm:flex-row h-[80vh]">
          <div className="w-full sm:w-64 bg-Neutrals/neutrals-11 sm:block hidden p-6 overflow-y-auto border-r border-Neutrals/neutrals-10">
            <SettingsSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-semibold text-Neutrals/neutrals-1">Settings</DialogTitle>
            </DialogHeader>
            <Separator className="my-6 border-Neutrals/neutrals-10" />
            
            {activeItem === '#account' && (
              <MyAccount onhandleclick={onhandleclick} userdata={settingsdata}/>
            )}
            {/* {activeItem === '#settings' && <MySettings />}
            {activeItem === '#notifications' && <MyNotifications />} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
