"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';

const Retrive = ({ url, imgurl, title }: { url: string, imgurl: string, title: string }) => {
  // Fallback image in case the provided one doesn't load
  const fallbackImage = "/placeholder.png";
  
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Link copied', {
        description: 'Link has been copied to clipboard',
      });
    } catch (error) {
      toast('Failed to copy', {
        description: 'Failed to copy link to clipboard',
      });
    }
  };

  return (
    <div className='w-full p-4 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl flex flex-col overflow-hidden bg-white dark:bg-brand-bg border border-gray-200 dark:border-gray-800'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='font-medium text-sm text-gray-600 dark:text-neutral-300 truncate max-w-[180px]'>
          {url.length > 25 ? `${url.slice(0, 25)}...` : url}
        </h2>
      </div>
      
      <Link href={url} target="_blank" rel="noopener noreferrer" className='group'>
        <div className="relative w-full h-[130px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
          <Image
            src={imgurl || fallbackImage}
            width={300}
            height={130}
            alt={title || "Link image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // @ts-ignore - fallback to placeholder if image fails
              e.currentTarget.src = fallbackImage;
            }}
          />
        </div>
      </Link>
      
      <div className='mt-3 flex flex-col justify-between flex-grow'>
        <div>
          <h3 className='text-sm font-semibold text-black dark:text-white line-clamp-2 mb-2'>
            {title}
          </h3>
        </div>
        
        <div className='mt-2 flex justify-between items-center'>
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs h-8 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => handleCopy(url)}
          >
            Copy Link
          </Button>
          
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-8 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Retrive;