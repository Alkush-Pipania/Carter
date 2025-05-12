
import React from 'react';
import {  SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Star } from 'lucide-react';
import SidebarNoFolder from './SidebarNoFolder';
import { BeautifulDropdownMenu } from '../BeautifullDropdownMenu';

interface FolderData {
  id: string;
  name: string;
  _count: { links: number };
}

interface SidebarFoldersProps {
  userLoading: boolean;
  folderLoading: boolean;
  folderData: FolderData[];
  activeRoute?: string;
  setActiveRoute: (id: string) => void;
  setIsCreateFolderOpen: (open: boolean) => void;
}

const SidebarFolders: React.FC<SidebarFoldersProps> = ({
  userLoading,
  folderLoading,
  folderData,
  activeRoute,
  setActiveRoute,
  setIsCreateFolderOpen,
}) => (
  <>
    {/* <div className="px-2 py-1 font-medium text-zinc-500 text-xs">Private</div> */}
    <div>
      <div className="font-medium text-slate-800 dark:text-zinc-100 flex items-center gap-2 transition-colors">
        <Star className="h-4 w-4 text-yellow-500" />
        <span>Folders</span>
      </div>
      <div className="mt-2 min-h-16 rounded-md ">
        {userLoading || folderLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-5 my-2 w-full bg-slate-100 dark:bg-zinc-800" />
            </div>
          ))
        ) : folderData?.length > 0 ? (
          folderData.map((data) => (
            <div  className="cursor-pointer gap-y-1" key={data.id}>
              <SidebarMenuSubButton asChild>
                <Link
                  onClick={() => setActiveRoute(data.id)}
                  href={`/dashboard/folder/${data.id}`}
                  className={`
                    ${activeRoute == data.id ? 'dark:bg-zinc-800/50 bg-slate-200 dark:text-white text-slate-900' : 'dark:text-zinc-400 text-slate-700'}
                    flex w-full justify-between items-center gap-2 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 dark:active:bg-zinc-900 hover:bg-slate-200 active:bg-slate-300 hover:text-slate-900 transition-colors
                  `}
                >
                  <span className="truncate">{data.name}</span>
                  <BeautifulDropdownMenu
                    onDelete={() =>  console.log("deleting...")}
                    folderId={data.id.toString()}
                    folderName={data.name}
                    numberOfLinks={data._count.links}
                  />
                </Link>
              </SidebarMenuSubButton>
            </div>
          ))
        ) : (
          <SidebarNoFolder createfolder={setIsCreateFolderOpen} />
        )}
      </div>
    </div>
  </>
);

export default SidebarFolders;
