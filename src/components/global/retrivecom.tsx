import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Copy } from 'lucide-react';

const Retrive = ({ url, imgurl, description, title }: { url: string, imgurl: string, description: string, title: string }) => {
  const { toast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "Copied to clipboard",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='w-full max-w-sm bg-darkBg hover:bg-darkBg/80 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl overflow-hidden'>
      <Link href={url} target="_blank" rel="noopener noreferrer" className='block'>
        <div className="aspect-video w-full overflow-hidden bg-gray-900">
          {imgurl === "no image" ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No image available
            </div>
          ) : (
            <Image
              src={imgurl}
              width={400}
              height={225}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
      </Link>

      <div className='p-4 space-y-3'>
        <div 
          onClick={() => handleCopy(url)}
          className='flex items-center justify-between group cursor-pointer'
        >
          <h2 className='text-sm text-lightGray font-medium truncate pr-2'>
            {url}
          </h2>
          <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className='text-lg font-semibold text-primary-purple/primary-purple-400 line-clamp-2'>
          {title}
        </h3>

        <p className='text-sm text-gray-400 line-clamp-2'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default Retrive