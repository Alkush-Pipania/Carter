"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Content from "./_components/content";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchFolderLinks } from "@/store/thunks/folderLinksThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import { Folder } from "lucide-react";

export default function LinkCart() {
  const router = useRouter();
  const pathname = usePathname();
  const pathId = pathname.split('/').pop();
  
  const dispatch = useDispatch<AppDispatch>();
  const { folder, error , loading } = useSelector((state: RootState) => state.folderLinks);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    if (userId && pathId) {
      dispatch(fetchFolderLinks({
        userId,
        searchQuery: '',
        folderId: pathId,
      })).unwrap()
        .catch((err) => {
          toast.error(err || "Failed to load folder");
          router.replace('/dashboard');
        });
    }
  }, [pathname, dispatch, pathId, userId, router]);

  // Show error toast if there's an error in the state
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <section className="relative w-full flex flex-col h-screen">
      <div className="fixed right-6 flex mx-3 justify-center gap-x-1 items-center">
        { loading? (
          <Skeleton className="h-6 w-24 bg-zinc-800" />
        ) : (
          <div className="bg-white flex gap-1 text-gray-600 font-medium px-2 py-1 rounded-md">
            <Folder className=""/>
             {folder?.name}</div>
        )}
      </div>
      <section className="w-full px-5 h-full my-9">
        <Content folderid={folder?.id} />
      </section>
    </section>
  )
}
