import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarter } from '../../services/API_Services';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

export const getUserDetails = createAsyncThunk(
  'userdetail/getUserDetails',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getCarter(API_ENDPOINTS.UserDetails, { userId });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
