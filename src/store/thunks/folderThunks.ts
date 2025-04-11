import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCarter } from '../../services/API_Services';
import { API_ENDPOINTS } from '../../services/apiEndpoints';
import { removeFolder } from '../slices/folderdataSlice';
import { addFolder } from '../slices/folderdataSlice';

interface MoveToTrashParams {
  userId: string;
  folderId: string;
  folderName: string;
  numberOfLinks: number;
}

interface RestoreFromTrashParams {
  userId: string;
  folderId: string;
  folderName: string;
  numberOfLinks: number;
}

// Move a folder to trash
export const moveToTrash = createAsyncThunk(
  'folder/moveToTrash',
  async ({ userId, folderId, folderName, numberOfLinks }: MoveToTrashParams, { dispatch, rejectWithValue }) => {
    try {
      // Call the move-to-trash endpoint
      const response = await postCarter(API_ENDPOINTS.MoveToTrash, { 
        userId, 
        folderId 
      });
      
      // If successful, remove the folder from the folderdata slice
      if (!response.error) {
        dispatch(removeFolder(folderId));
      }
      
      // Return the response along with folder info for adding to trash
      return { 
        ...response, 
        folderInfo: {
          folderId,
          folderName,
          numberOfLinks
        }
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Restore a folder from trash
export const restoreFromTrash = createAsyncThunk(
  'folder/restoreFromTrash',
  async ({ userId, folderId, folderName, numberOfLinks }: RestoreFromTrashParams, { dispatch, rejectWithValue }) => {
    try {
      // Call the restore-folder endpoint
      const response = await postCarter(API_ENDPOINTS.RestoreFolder, { 
        userId, 
        folderId 
      });
      
      // If successful, add the folder back to the folderdata slice
      if (!response.error) {
        dispatch(addFolder({
          id: folderId,
          name: folderName,
          _count: {
            links: numberOfLinks
          }
        }));
      }
      
      // Return the response along with folder info
      return { 
        ...response, 
        folderInfo: {
          folderId,
          folderName,
          numberOfLinks
        }
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
); 