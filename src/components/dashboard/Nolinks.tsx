"use client"

import { Link } from "lucide-react";
import { AddLinkDialog } from "./AddLinkDialog";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Nolinks(){
  const [activeRoute, setActiveRoute] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    function handleRouteChange() {
      const pathId = pathname.split('/').pop();
      if (pathId === 'dashboard') {
        setActiveRoute('global')
      } else {
        setActiveRoute(pathId);
      }
    }
    handleRouteChange();
  }, [pathname]);

  return(
    <section className='flex w-full items-center justify-center text-slate-500 dark:text-slate-400'>
              <div className="min-h-[400px] w-full max-w-3xl mx-auto p-6">
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-transparent p-8 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-muted p-4">
                      <Link className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No Links Added</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Get started by adding your first link. Your collection will grow from here!
                    </p>
                    <div className="mt-4 flex gap-2">
                      <AddLinkDialog activeRoute={activeRoute} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
  )
}