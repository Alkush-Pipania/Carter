import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTrashFolders, deleteFolder, deleteAllFolders } from '../../store/thunks/trashFolderThunks';
import { moveToTrash, restoreFromTrash } from '../thunks/folderThunks';

interface TrashFolderItem {
  id: number;
  folderId: string;
  folderName: string;
  deletedAt: string;
  numberOfLinks: number;
}

interface TrashFolderState {
  items: TrashFolderItem[];
  loading: boolean;
  error: string | null;
  restoring: string | null;
  deleting: string | null;
  deletingAll: boolean;
  movingToTrash: string | null;
}

const initialState: TrashFolderState = {
  items: [],
  loading: false,
  error: null,
  restoring: null,
  deleting: null,
  deletingAll: false,
  movingToTrash: null
};

export const trashFolderSlice = createSlice({
  name: 'trashFolder',
  initialState,
  reducers: {
    clearTrashFolders: (state) => {
      state.items = [];
      state.error = null;
    },
    setRestoringFolder: (state, action: PayloadAction<string | null>) => {
      state.restoring = action.payload;
    },
    setDeletingFolder: (state, action: PayloadAction<string | null>) => {
      state.deleting = action.payload;
    },
    setDeletingAll: (state, action: PayloadAction<boolean>) => {
      state.deletingAll = action.payload;
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(folder => folder.folderId !== action.payload);
    },
    addFolderToTrash: (state, action: PayloadAction<{
      folderId: string;
      folderName: string;
      numberOfLinks: number;
    }>) => {
      const { folderId, folderName, numberOfLinks } = action.payload;
      // Only add if not already in trash
      if (!state.items.some(item => item.folderId === folderId)) {
        state.items.unshift({
          id: parseInt(folderId),
          folderId,
          folderName,
          deletedAt: new Date().toISOString(),
          numberOfLinks
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // getTrashFolders reducers
      .addCase(getTrashFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrashFolders.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        
        // Transform the data to match the expected format in the component
        if (action.payload?.data) {
          state.items = action.payload.data.map((folder: any) => ({
            id: folder.id,
            folderId: folder.id.toString(),
            folderName: folder.name,
            deletedAt: folder.deletedAt,
            numberOfLinks: folder._count?.links || 0
          }));
        } else {
          state.items = [];
        }
        
        state.error = null;
      })
      .addCase(getTrashFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trash folders';
      })
      
      // moveToTrash reducers
      .addCase(moveToTrash.pending, (state, action) => {
        state.movingToTrash = action.meta.arg.folderId;
      })
      .addCase(moveToTrash.fulfilled, (state, action) => {
        state.movingToTrash = null;
        
        // Add folder to trash if request was successful
        if (!action.payload.error && action.payload.folderInfo) {
          const { folderId, folderName, numberOfLinks } = action.payload.folderInfo;
          
          if (!state.items.some(item => item.folderId === folderId)) {
            state.items.unshift({
              id: parseInt(folderId),
              folderId,
              folderName,
              deletedAt: new Date().toISOString(),
              numberOfLinks
            });
          }
        }
      })
      .addCase(moveToTrash.rejected, (state) => {
        state.movingToTrash = null;
      })
      
      // restoreFromTrash reducers
      .addCase(restoreFromTrash.pending, (state, action) => {
        state.restoring = action.meta.arg.folderId;
      })
      .addCase(restoreFromTrash.fulfilled, (state, action) => {
        state.restoring = null;
        // Remove the folder from the list
        if (action.payload?.folderId) {
          state.items = state.items.filter(folder => folder.folderId !== action.payload.folderId);
        }
      })
      .addCase(restoreFromTrash.rejected, (state) => {
        state.restoring = null;
      })
      
      // deleteFolder reducers
      .addCase(deleteFolder.pending, (state, action) => {
        state.deleting = action.meta.arg.folderId;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.deleting = null;
        // Remove the folder from the list
        if (action.payload?.folderId) {
          state.items = state.items.filter(folder => folder.folderId !== action.payload.folderId);
        }
      })
      .addCase(deleteFolder.rejected, (state) => {
        state.deleting = null;
      })
      
      // deleteAllFolders reducers
      .addCase(deleteAllFolders.pending, (state) => {
        state.deletingAll = true;
      })
      .addCase(deleteAllFolders.fulfilled, (state) => {
        state.deletingAll = false;
        // Clear all folders
        state.items = [];
      })
      .addCase(deleteAllFolders.rejected, (state) => {
        state.deletingAll = false;
      });
  },
});

export const { 
  clearTrashFolders, 
  setRestoringFolder, 
  setDeletingFolder, 
  setDeletingAll,
  removeFolder,
  addFolderToTrash
} = trashFolderSlice.actions;

export default trashFolderSlice.reducer; 