"use client"

import React, { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SettingsSidebar } from './components/SettingsSidebar'

const SettingsLayout = ({children} : {children : React.ReactNode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsSidebarOpen(true)} 
        className="md:hidden fixed left-4 top-4 z-40 text-white"
      >
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>
      
      {/* Sidebar overlay for mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200", 
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <SettingsSidebar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        {/* Content */}
        <div className="flex-1 w-full">
          <div className=" pt-16 md:pt-0">
            <div className="p-6 md:p-8 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-white md:hidden mb-6">Settings</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SettingsLayout