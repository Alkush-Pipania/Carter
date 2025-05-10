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
      <Skeleton className="h-6 w-6 rounded-lg bg-slate-100 dark:bg-zinc-800 transition-colors" />
    ) : (
      <h3 className='text-xl text-slate-700 dark:text-zinc-400 transition-colors'>😇</h3>
    )}
    {userLoading ? (
      <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-zinc-800 transition-colors" />
    ) : (
      <span className="text-sm font-medium text-slate-800 dark:text-zinc-100 transition-colors">{username || 'User'}</span>
    )}
  </div>
);

export default SidebarUserInfo;
