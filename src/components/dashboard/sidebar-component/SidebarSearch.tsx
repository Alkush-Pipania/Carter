import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SidebarSearchProps {
  onSearch: (value: string) => void;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ onSearch }) => (
  <div className="p-2">
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-500 dark:text-zinc-500 transition-colors" />
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        className="w-full bg-slate-100 dark:bg-zinc-800/50 pl-8 text-sm text-slate-800 dark:text-zinc-100 placeholder:text-slate-500 dark:placeholder:text-zinc-500 border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600 focus-visible:ring-slate-400 dark:focus-visible:ring-zinc-700 transition-colors"
      />
    </div>
  </div>
);

export default SidebarSearch;
