import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarter, delCarter } from '../../services/API_Services';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

interface GetTrashFoldersParams {
  userId: string;
  search?: string;
}

interface DeleteFolderParams {
  userId: string;
  folderId: string;
}

interface DeleteAllFoldersParams {
  userId: string;
}

// Fetch trash folders
export const getTrashFolders = createAsyncThunk(
  'trashFolder/getTrashFolders',
  async ({ userId, search = '' }: GetTrashFoldersParams, { rejectWithValue }) => {
    try {
      const response = await getCarter(API_ENDPOINTS.TrashFolders, { 
        userId, 
        search 
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a single folder permanently
export const deleteFolder = createAsyncThunk(
  'trashFolder/deleteFolder',
  async ({ userId, folderId }: DeleteFolderParams, { rejectWithValue }) => {
    try {
      const response = await delCarter(API_ENDPOINTS.DeleteTrashFolder, { 
        userId, 
        folderId 
      });
      return { ...response, folderId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete all folders in trash
export const deleteAllFolders = createAsyncThunk(
  'trashFolder/deleteAllFolders',
  async ({ userId }: DeleteAllFoldersParams, { rejectWithValue }) => {
    try {
      const response = await delCarter(API_ENDPOINTS.DeleteTrashFolder, { 
        userId, 
        deleteAll: true 
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
); 