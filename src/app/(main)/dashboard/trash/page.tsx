"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, Folder, RotateCcw, Trash2 } from "lucide-react"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getTrashFolders, deleteFolder, deleteAllFolders } from "@/store/thunks/trashFolderThunks"
import { restoreFromTrash } from "@/store/thunks/folderThunks"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LinkCart() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const userId = localStorage.getItem('userId')
  const { items: trashFolders, loading, restoring, deleting, deletingAll } = useAppSelector(state => state.trashFolder)

  useEffect(() => {
    if (userId) {
      dispatch(getTrashFolders({ userId: userId }))
    }
  }, [dispatch, userId])

  const handleRestore = async (id: string, name: string, count: number) => {
    const toastId = toast.loading(`Restoring ${name}...`);
    
    try {
      if (!userId) return;
      
      const result = await dispatch(
        restoreFromTrash({
          userId,
          folderId: id,
          folderName: name,
          numberOfLinks: count
        })
      ).unwrap();
      
      if (!result.error) {
        toast.success("Success", {
          id: toastId,
          description: "Folder has been restored successfully"
        });
        
        // Optionally navigate to the restored folder
        router.push(`/dashboard/folder/${id}`);
      }
    } catch (e) {
      console.error(e)
      toast.error("Error", {
        id: toastId,
        description: "Failed to restore folder"
      });
    }
  }

  const handleDelete = async (id: string, name: string) => {
    const toastId = toast.loading(`Deleting ${name}...`);
    
    try {
      if (!userId) return;
      
      const result = await dispatch(
        deleteFolder({
          userId,
          folderId: id
        })
      ).unwrap();
      
      if (!result.error) {
        toast.success("Success", {
          id: toastId,
          description: "Folder has been permanently deleted"
        });
      }
    } catch (e) {
      toast.error("Error", {
        id: toastId,
        description: "Failed to delete folder"
      });
    }
  }

  const handleDeleteAll = async () => {
    const toastId = toast.loading("Deleting all folders...");
    
    try {
      if (!userId) return;
      
      const result = await dispatch(
        deleteAllFolders({
          userId
        })
      ).unwrap();
      
      if (!result.error) {
        toast.success("Success", {
          id: toastId,
          description: "All folders have been permanently deleted"
        });
      }
    } catch (e) {
      toast.error("Error", {
        id: toastId,
        description: "Failed to delete all folders"
      });
    }
  }

  return (
    <div className="text-gray-700 dark:text-gray-300 w-full">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Trash</h1>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Manage your deleted folders</p>
          </div>
          {trashFolders.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto bg-red-100/70 hover:bg-red-200/80 dark:bg-red-900/50 dark:hover:bg-red-900/70 text-red-600 dark:text-red-200"
                  disabled={deletingAll}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {deletingAll ? "Deleting..." : "Delete All"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-[#0B0A0F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-white">Delete all items?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                    This action cannot be undone. This will permanently delete all folders from trash.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAll}
                    className="bg-red-100/70 dark:bg-red-900/50 text-red-600 dark:text-red-200 hover:bg-red-200/80 dark:hover:bg-red-900/70"
                  >
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-100/70 dark:bg-gray-900/30 rounded-lg border border-gray-200/80 dark:border-gray-800/50">
            <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Loading trash folders...</p>
          </div>
        ) : trashFolders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-100/70 dark:bg-gray-900/30 rounded-lg border border-gray-200/80 dark:border-gray-800/50">
            <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-700" />
            <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">No items in trash</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Deleted folders will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trashFolders.map((folder) => (
              <div
                key={folder.folderId}
                className="group bg-white/80 dark:bg-gray-900/30 rounded-lg border border-gray-200/80 dark:border-gray-800/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Folder className="h-5 w-5 text-gray-500 dark:text-gray-500 mr-3" />
                    <div className="min-w-0">
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 truncate">{folder.folderName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {folder.numberOfLinks} {folder.numberOfLinks === 1 ? "link" : "links"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
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
                          className="flex-1 bg-red-100/70 hover:bg-red-200/80 dark:bg-red-900/50 dark:hover:bg-red-900/70 text-red-600 dark:text-red-200"
                          disabled={deleting === folder.folderId}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deleting === folder.folderId ? "Deleting..." : "Delete"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-[#0B0A0F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gray-900 dark:text-white">Delete folder?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                            This action cannot be undone. This will permanently delete the folder &quot;{folder.folderName}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(folder.folderId, folder.folderName)}
                            className="bg-red-100/70 dark:bg-red-900/50 text-red-600 dark:text-red-200 hover:bg-red-200/80 dark:hover:bg-red-900/70"
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