"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, Folder, RotateCcw, Trash2 } from "lucide-react"
import React from "react"



interface TrashFolder {
  id: string
  name: string
  linkCount: number
  deletedAt: Date
}

const initialTrashFolders: TrashFolder[] = [
  {
    id: "1",
    name: "Work Links",
    linkCount: 5,
    deletedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Personal Projects",
    linkCount: 3,
    deletedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Learning Resources",
    linkCount: 8,
    deletedAt: new Date("2024-01-13"),
  },
]

export default function LinkCart() {
  const [trashFolders, setTrashFolders] = React.useState<TrashFolder[]>(initialTrashFolders)
  const [isRestoring, setIsRestoring] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null)

  const handleRestore = async (id: string) => {
    setIsRestoring(id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTrashFolders((prev) => prev.filter((folder) => folder.id !== id))
    setIsRestoring(null)
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTrashFolders((prev) => prev.filter((folder) => folder.id !== id))
    setIsDeleting(null)
  }

  const handleDeleteAll = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTrashFolders([])
  }

  return (
    <div className=" text-gray-300 w-full">


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
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All
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

        {trashFolders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/30 rounded-lg border border-gray-800/50">
            <AlertCircle className="h-12 w-12 text-gray-700" />
            <h2 className="mt-4 text-xl font-semibold text-gray-300">No items in trash</h2>
            <p className="mt-2 text-sm text-gray-500">Deleted folders will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trashFolders.map((folder) => (
              <div
                key={folder.id}
                className="group bg-gray-900/30 rounded-lg border border-gray-800/50 transition-all duration-200 hover:border-gray-700"
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Folder className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="min-w-0">
                      <h3 className="text-base font-medium text-gray-200 truncate">{folder.name}</h3>
                      <p className="text-sm text-gray-500">
                        {folder.linkCount} {folder.linkCount === 1 ? "link" : "links"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 bg-gray-800/50 hover:bg-gray-800 text-gray-300 border border-gray-700"
                      disabled={isRestoring === folder.id}
                      onClick={() => handleRestore(folder.id)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {isRestoring === folder.id ? "Restoring..." : "Restore"}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="flex-1 bg-red-900/50 hover:bg-red-900/70 text-red-200"
                          disabled={isDeleting === folder.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {isDeleting === folder.id ? "Deleting..." : "Delete"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#0B0A0F] text-gray-300 border border-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete folder?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            This action cannot be undone. This will permanently delete the folder "{folder.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(folder.id)}
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