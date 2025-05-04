import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Folder } from 'lucide-react';

interface SidebarNoFolderProps {
  createfolder: (open: boolean) => void;
}

const SidebarNoFolder: React.FC<SidebarNoFolderProps> = ({ createfolder }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 px-4 py-8 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
      <Folder className="h-6 w-6 text-zinc-500" />
    </div>
    <h3 className="mt-4 text-sm font-medium text-zinc-400">No folders available</h3>
    <p className="mt-1 text-xs text-zinc-500">Create a new folder to organize your content</p>
    <Button
      onClick={() => createfolder(true)}
      variant="outline"
      size="sm"
      className="mt-4 border-zinc-800 hover:bg-pureWhite text-black bg-white/80  hover:text-zinc-300"
    >
      <Plus className="mr-2 h-4 w-4" />
      Create Folder
    </Button>
  </div>
);

export default SidebarNoFolder;
