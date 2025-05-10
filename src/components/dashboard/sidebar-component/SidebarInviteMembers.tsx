import React from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserPlus } from 'lucide-react';

const SidebarInviteMembers: React.FC = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton className="text-slate-700 dark:text-zinc-400 hover:bg-slate-200 active:bg-slate-300 dark:active:bg-zinc-900 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">
        <UserPlus className="h-4 w-4" />
        <span>Invite members</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);

export default SidebarInviteMembers;
