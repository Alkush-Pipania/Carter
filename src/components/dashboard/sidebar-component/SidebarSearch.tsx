import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SidebarSearchProps {
  onSearch: (value: string) => void;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ onSearch }) => (
  <div className="p-2">
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-500" />
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        className="w-full bg-zinc-800/50 pl-8 text-sm text-zinc-100 placeholder-zinc-500 border-zinc-700 hover:border-zinc-600 focus-visible:ring-zinc-700"
      />
    </div>
  </div>
);

export default SidebarSearch;
