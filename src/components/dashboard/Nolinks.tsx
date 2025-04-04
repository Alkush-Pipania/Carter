"use client"

import { Link, Link2Off, ClipboardList } from "lucide-react";
import { AddLinkDialog } from "./AddLinkDialog";
import { ImportLinksDialog } from "./ImportLinksDialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Nolinks(){
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
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
    <section className='flex w-full items-center justify-center text-slate-500'>
              <div className="min-h-[400px] w-full max-w-3xl mx-auto p-6">
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-transparent p-8">
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
                      <Button
                        onClick={() => setIsImportDialogOpen(true)}
                        className="flex rounded-2xl items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                      >
                        <ClipboardList className="h-4 w-4" />
                        Quick Import
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ImportLinksDialog 
              open={isImportDialogOpen} 
              onOpenChange={setIsImportDialogOpen}
            />
            </section>
  )
}