import React from 'react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserPlus } from 'lucide-react';

const SidebarInviteMembers: React.FC = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton className="text-zinc-400 active:bg-zinc-900  hover:bg-zinc-800/50 hover:text-zinc-100">
        <UserPlus className="h-4 w-4" />
        <span>Invite members</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);

export default SidebarInviteMembers;
