"use client"
import Linkcompo from "@/components/dashboard/linkcompo";
import { useEffect, useState } from "react";
import { LinkCardLoading } from "@/components/dashboard/link-card-loading";
import { useSearchParams } from "next/navigation";
import { Nolinks } from "@/components/dashboard/Nolinks";
import { fetchGlobalLinks } from "../../../../store/thunks/userLinksGlobalThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";

export default function Content() {
  const searchParams = useSearchParams();
  const searchvalue = searchParams.get('search') || '';
  const dispatch = useDispatch<AppDispatch>();
  const { links, loading, error } = useSelector((state: RootState) => state.userLinkGlobal);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      dispatch(fetchGlobalLinks({ userId, searchQuery: searchvalue }));
    }
  }, [dispatch, userId, searchvalue]);

  return (
    <section>
      {loading ? (
        <main className='grid md:grid-cols-2 md:gap-6 gap-x-1 sm:grid-cols-2 gap-y-2 grid-cols-1 lg:grid-cols-3 
        2xl:grid-cols-4'>{Array.from({ length: 6 }).map((_, index) => (
          <LinkCardLoading key={index} />
        ))}</main>
      ) : (
        <>
          {links?.length > 0 ? (
            <main className='grid gap-y-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6'>
              {links.map((link) => (
                <Linkcompo
                  key={link.secret_Id}
                  tobefind={link.tobefind}
                  secretId={link.secret_Id}
                  url={link.links}
                  title={link.title || "no title"}
                  imgurl={link.imgurl || "no image"}
                />
              ))}
            </main>
          ) : (
            <Nolinks />
          )}
        </>
      )}
    </section>
  )
}