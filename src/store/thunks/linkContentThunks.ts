import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCarter } from '../../services/API_Services';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

interface LinkContentParams {
  id: string;
  user_id: string;
}

export const getLinkContent = createAsyncThunk(
  'linkContent/getLinkContent',
  async ({ id, user_id }: LinkContentParams, { rejectWithValue }) => {
    try {
      const response = await postCarter(API_ENDPOINTS.LinkContent, { 
        id, 
        user_id 
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
); 