import { Link2Off, Plus } from "lucide-react";
import { Button } from "../ui/button";

export function Nolinks(){
  return(
    <section className='flex w-full items-center justify-center text-slate-500'>
              <div className="min-h-[400px] w-full max-w-3xl mx-auto p-6">
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-transparent p-8">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-muted p-4">
                      <Link2Off className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No Links Added</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Get started by adding your first link. Your collection will grow from here!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </section>
  )
}