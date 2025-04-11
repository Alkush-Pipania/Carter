"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Folder, RotateCcw, Trash2 } from "lucide-react"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getTrashFolders, deleteFolder, deleteAllFolders } from "@/store/thunks/trashFolderThunks"
import { restoreFromTrash } from "@/store/thunks/folderThunks"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface TrashFolder {
  id: string
  name: string
  linkCount: number
  deletedAt: Date
}

export default function LinkCart() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: session } = useSession()
  const { items: trashFolders, loading, restoring, deleting, deletingAll } = useAppSelector(state => state.trashFolder)
  const { toast } = useToast()

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(getTrashFolders({ userId: session.user.id }))
    }
  }, [dispatch, session])

  const handleRestore = async (id: string, name: string, count: number) => {
    try {
      if (!session?.user?.id) return;
      
      const result = await dispatch(
        restoreFromTrash({
          userId: session.user.id,
          folderId: id,
          folderName: name,
          numberOfLinks: count
        })
      ).unwrap();
      
      if (!result.error) {
        toast({
          title: "Success",
          description: "Folder has been restored successfully",
          variant: "default",
        });
        
        // Optionally navigate to the restored folder
        router.push(`/dashboard/folder/${id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore folder",
        variant: "destructive",
      });
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (!session?.user?.id) return;
      
      const result = await dispatch(
        deleteFolder({
          userId: session.user.id,
          folderId: id
        })
      ).unwrap();
      
      if (!result.error) {
        toast({
          title: "Success",
          description: "Folder has been permanently deleted",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  }

  const handleDeleteAll = async () => {
    try {
      if (!session?.user?.id) return;
      
      const result = await dispatch(
        deleteAllFolders({
          userId: session.user.id
        })
      ).unwrap();
      
      if (!result.error) {
        toast({
          title: "Success",
          description: "All folders have been permanently deleted",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete all folders",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="text-gray-300 w-full">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Trash</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your deleted folders</p>
          </div>
          {trashFolders.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto bg-red-900/50 hover:bg-red-900/70 text-red-200"
                  disabled={deletingAll}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {deletingAll ? "Deleting..." : "Delete All"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#0B0A0F] text-gray-300 border border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Delete all items?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete all folders from trash.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAll}
                    className="bg-red-900/50 text-red-200 hover:bg-red-900/70"
                  >
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/30 rounded-lg border border-gray-800/50">
            <p className="mt-4 text-xl font-semibold text-gray-300">Loading trash folders...</p>
          </div>
        ) : trashFolders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/30 rounded-lg border border-gray-800/50">
            <AlertCircle className="h-12 w-12 text-gray-700" />
            <h2 className="mt-4 text-xl font-semibold text-gray-300">No items in trash</h2>
            <p className="mt-2 text-sm text-gray-500">Deleted folders will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trashFolders.map((folder) => (
              <div
                key={folder.folderId}
                className="group bg-gray-900/30 rounded-lg border border-gray-800/50 transition-all duration-200 hover:border-gray-700"
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Folder className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="min-w-0">
                      <h3 className="text-base font-medium text-gray-200 truncate">{folder.folderName}</h3>
                      <p className="text-sm text-gray-500">
                        {folder.numberOfLinks} {folder.numberOfLinks === 1 ? "link" : "links"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 bg-gray-800/50 hover:bg-gray-800 text-gray-300 border border-gray-700"
                      disabled={restoring === folder.folderId}
                      onClick={() => handleRestore(folder.folderId, folder.folderName, folder.numberOfLinks)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {restoring === folder.folderId ? "Restoring..." : "Restore"}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="flex-1 bg-red-900/50 hover:bg-red-900/70 text-red-200"
                          disabled={deleting === folder.folderId}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deleting === folder.folderId ? "Deleting..." : "Delete"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#0B0A0F] text-gray-300 border border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete folder?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            This action cannot be undone. This will permanently delete the folder "{folder.folderName}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(folder.folderId)}
                            className="bg-red-900/50 text-red-200 hover:bg-red-900/70"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}