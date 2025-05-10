import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Folder } from 'lucide-react';

interface SidebarNoFolderProps {
  createfolder: (open: boolean) => void;
}

const SidebarNoFolder: React.FC<SidebarNoFolderProps> = ({ createfolder }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed dark:border-zinc-800 border-slate-300 px-4 py-8 text-center transition-colors">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-900 transition-colors">
      <Folder className="h-6 w-6 text-slate-500 dark:text-zinc-500 transition-colors" />
    </div>
    <h3 className="mt-4 text-sm font-medium text-slate-700 dark:text-zinc-400 transition-colors">No folders available</h3>
    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500 transition-colors">Create a new folder to organize your content</p>
    <Button
      onClick={() => createfolder(true)}
      variant="outline"
      size="sm"
      className="mt-4 border-slate-300 hover:bg-slate-100 text-slate-900 dark:border-zinc-800 dark:hover:text-black dark:text-black dark:hover:bg-white dark:bg-white/80 transition-colors"
    >
      <Plus className="mr-2 h-4 w-4" />
      Create Folder
    </Button>
  </div>
);

export default SidebarNoFolder;
