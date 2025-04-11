import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarter, postCarter } from '../../services/API_Services';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

interface FolderDataParams {
  user_id: string;
  search?: string;
}

interface CreateFolderParams {
  userId: string;
  folderName: string;
}

export const getFolderData = createAsyncThunk(
  'folderdata/getFolderData',
  async ({ user_id, search = '' }: FolderDataParams, { rejectWithValue }) => {
    try {
      const response = await getCarter(API_ENDPOINTS.FolderData, { 
        user_id, 
        search 
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createFolder = createAsyncThunk(
  'folderdata/createFolder',
  async ({ userId, folderName }: CreateFolderParams, { rejectWithValue }) => {
    try {
      const response = await postCarter(API_ENDPOINTS.CreateFolder, { 
        userId, 
        folderName 
      });
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
