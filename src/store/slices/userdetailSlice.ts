import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetails } from '../thunks/userdetailThunks';

interface UserDetailsState {
  data: {
    email?: string;
    username?: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailsState = {
  data: null,
  loading: false,
  error: null,
};

export const userdetailSlice = createSlice({
  name: 'userdetail',
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
      });
  },
});

export const { clearUserDetails } = userdetailSlice.actions;

export default userdetailSlice.reducer;
