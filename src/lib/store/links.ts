import { deleteFolder, folderdata } from '@/server/actions/links';
import { set } from 'zod';
import { create } from 'zustand'

interface LinkStore {
  links: any[];
  setLinks: (links: any[]) => void;
  addLink: (link: any) => void;
}

export const useLinkStore = create<any>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
  addLink: (link) => set((state) => ({ links: [link, ...state.links] })),
  deleteLink: (linkId) => set((state) => ({
    links: state.links.filter(link => link.secret_Id !== linkId)
  })),
}))

interface FoldernameStore {
  foldername: any[];
  setFoldername: (links: any[]) => void;
  addFoldername: (link: any) => void;
  deleteFoldername: (link: any) => void;
}

export const useFolderNameStore = create<FoldernameStore>((set)=>({
  foldername : [],
  setFoldername : (foldername) => set({foldername}),
  addFoldername : (folder) => set((state) => ({foldername : [folder, ...state.foldername]})),
  deleteFoldername : (folderID) => set((state) => ({
    foldername : state.foldername.filter(folder => folder.id !== folderID)
  }))
}))

// interface folderLinksStore {
//   folderlinks: any[];
//   setfolderLinks: (links: any[]) => void;
// }

// export const useFolderlinkStore = create<any>((set) => ({
//   folderlinks: [],
//   setfolderLinks: (folderData: any) =>
//     set((state) => {
//       const existingIndex = state.folderlinks.findIndex((folder) => folder.id === folderData.id);
//       if (existingIndex > -1) {
//         // update it
//         const updatedFolder = [...state.folderlinks];
//         updatedFolder[existingIndex] = folderData;
//         return { folderlinks: updatedFolder };
//       }
//       return { folderlinks: [folderData, ...state.folderlinks] };
//     }),
//   addfolderLink: (folderId: number, link: any) =>
//     set((state) => {
//       const existingIndex = state.folderlinks.findIndex((folder) => folder.id === folderId);
//       if (existingIndex > -1) {
//         const updatedFolder = [...state.folderlinks];
//         updatedFolder[existingIndex].links = [link, ...updatedFolder[existingIndex].links];
//         return { folderlinks: updatedFolder };
//       }
//       return state;
//     }),

//   deletefolderLink: (folderId: number, linkId: number) =>
//     set((state) => {
//       const existingIndex = state.folderlinks.findIndex((folder) => folder.id === folderId);
//       if (existingIndex > -1) {
//         const updatedFolder = [...state.folderlinks];
//         updatedFolder[existingIndex].links = updatedFolder[existingIndex].links.filter(
//           (link: any) => link.id !== linkId
//         );
//         console.log("Link deleted:", { folderId, linkId });
//         return { folderlinks: updatedFolder }; // Return new state reference
//       }
//       console.log("Folder not found:", folderId);
//       return state;
//     }),
// }))





interface FolderLink {
  id: number;
  links: Array<{
    id: number;
    secret_Id: string;
    // ... other link properties
  }>;
}

interface FolderLinkStore {
  folderlinks: FolderLink[];
  setfolderLinks: (folderData: FolderLink) => void;
  addfolderLink: (folderId: number, link: any) => void;
  deletefolderLink: (folderId: string | number, linkId: string | number) => void;
}




export const useFolderlinkStore = create<FolderLinkStore>((set) => ({
  folderlinks: [],
  setfolderLinks: (folderData) =>
    set((state) => {
      const existingIndex = state.folderlinks.findIndex(
        (folder) => folder.id === folderData.id
      );
      if (existingIndex > -1) {
        const updatedFolder = [...state.folderlinks];
        updatedFolder[existingIndex] = folderData;
        return { folderlinks: updatedFolder };
      }
      return { folderlinks: [folderData, ...state.folderlinks] };
    }),
  addfolderLink: (folderId, link) =>
    set((state) => {
      const existingIndex = state.folderlinks.findIndex(
        (folder) => folder.id === folderId
      );
      if (existingIndex > -1) {
        const updatedFolder = [...state.folderlinks];
        updatedFolder[existingIndex].links = [
          link,
          ...updatedFolder[existingIndex].links,
        ];
        return { folderlinks: updatedFolder };
      }
      return state;
    }),
  deletefolderLink: (folderId, linkId) =>
    set((state) => {
      // Convert folderId to number since it comes from URL
      const folderIdNum = typeof folderId === 'string' ? parseInt(folderId, 10) : folderId;
      
      const existingIndex = state.folderlinks.findIndex(
        (folder) => folder.id === folderIdNum
      );
      
      if (existingIndex > -1) {
        const updatedFolder = [...state.folderlinks];
        updatedFolder[existingIndex].links = updatedFolder[existingIndex].links.filter(
          (link) => link.secret_Id !== linkId
        );
        return { folderlinks: updatedFolder };
      }
      return state;
    }),
}));