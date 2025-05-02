import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface SidebarUserInfoProps {
  userLoading: boolean;
  username?: string;
}

const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({ userLoading, username }) => (
  <div className="flex items-center gap-2 px-2 py-1">
    {userLoading ? (
      <Skeleton className="h-6 w-6 rounded-lg bg-zinc-800" />
    ) : (
      <Avatar className="h-6 w-6 rounded-lg bg-emerald-500">
        <AvatarFallback className="text-black font-bold">
          {username ? username[0].toUpperCase() : '?'}
        </AvatarFallback>
      </Avatar>
    )}
    {userLoading ? (
      <Skeleton className="h-4 w-24 bg-zinc-800" />
    ) : (
      <span className="text-sm font-medium text-zinc-100">{username || 'User'}</span>
    )}
  </div>
);

export default SidebarUserInfo;
