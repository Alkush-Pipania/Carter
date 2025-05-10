"use client"

import React from 'react'
import { User, Key, Trash, LogOut, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface SettingsSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export const SettingsSidebar = ({ isSidebarOpen, setIsSidebarOpen }: SettingsSidebarProps) => {
  return (
    <aside className={cn(
      "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 transition-all duration-200 md:translate-x-0 shadow-sm",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800 transition-colors">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white transition-colors">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-800 dark:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink href="/setting" icon={<User size={16} />}>User Profile</NavLink>
          <NavLink href="/setting/secret-keys" icon={<Key size={16} />}>Manage Secret Keys</NavLink>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800 space-y-1 transition-colors">
          <NavLink href="/setting/delete-account" icon={<Trash size={16} />} variant="destructive">
            Delete Account
          </NavLink>
          <button
            onClick={() => {
              localStorage.clear();
              signOut({ callbackUrl: '/signin' });
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <LogOut size={16} className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

// Simple Navigation Link component
const NavLink = ({
  href,
  icon,
  children,
  variant = "default"
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "destructive"
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
        isActive ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white" : "text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-zinc-800",
        variant === "destructive" && "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20",
        "transition-colors"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
} 