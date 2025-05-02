import React from 'react';
import { SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Star } from 'lucide-react';
import SidebarNoFolder from './SidebarNoFolder';
import { BeautifulDropdownMenu } from '@/app/(main)/dashboard/_component/BeautifullDropdownMenu';

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
  handleShare: (id: string) => void;
  handleDelete: (id: string, name: string, links: number) => void;
  setIsCreateFolderOpen: (open: boolean) => void;
}

const SidebarFolders: React.FC<SidebarFoldersProps> = ({
  userLoading,
  folderLoading,
  folderData,
  activeRoute,
  setActiveRoute,
  handleShare,
  handleDelete,
  setIsCreateFolderOpen,
}) => (
  <>
    {/* <div className="px-2 py-1 font-medium text-zinc-500 text-xs">Private</div> */}
    <div>
      <div className="font-medium text-zinc-100 flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-500" />
        <span>Folders</span>
      </div>
      <div className="mt-2 px-3">
        {userLoading || folderLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-5 my-2 w-ful bg-zinc-800" />
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
                    ${activeRoute == data.id ? 'bg-zinc-800/50 text-white' : 'text-zinc-400'}
                    flex w-full justify-between items-center gap-2 hover:bg-zinc-800/50 hover:text-zinc-100 active:bg-zinc-900
                  `}
                >
                  <span className="truncate">{data.name}</span>
                  <BeautifulDropdownMenu
                    onShare={() => handleShare(data.id)}
                    onDelete={() => handleDelete(data.id, data.name, data._count.links)}
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
