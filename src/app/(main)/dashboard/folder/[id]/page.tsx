"use client"
import DownCircle from "@/app/favicon/downcirlce";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Content from "./_components/content";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchFolderLinks } from "@/store/thunks/folderLinksThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
export default function LinkCart() {
  const router = useRouter();
  const [isloading, setisLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const pathId = pathname.split('/').pop();
  
  const dispatch = useDispatch<AppDispatch>();
  const { folder } = useSelector((state: RootState) => state.folderLinks);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    if (userId && pathId) {
      dispatch(fetchFolderLinks({
        userId,
        searchQuery: '',
        folderId: parseInt(pathId, 10)
      })).unwrap()
        .then(() => {
          setisLoading(false);
        })
        .catch(() => {
          router.replace('/dashboard');
        });
    }
  }, [pathname, dispatch, pathId, userId, router]);

  return (
    <section className="w-full flex flex-col h-screen">
      <div className="fixed right-0 flex mx-3 justify-center gap-x-1 items-center">
        {isloading ? (
          <Skeleton className="h-6 w-24 bg-zinc-800" />
        ) : (
          <div className="flex bg-brand/brand-dark px-2 py-1 rounded-full items-center capitalize text-xl justify-between">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            {folder?.name}
            <DownCircle className="text-purple-400" />
          </div>
        )}
      </div>
      <section className="w-full px-5 h-full my-9">
        <Content folderid={folder?.id} />
      </section>
    </section>
  )
}
