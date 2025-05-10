import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile } from '../thunks/profile-settingThunk';

interface ProfileState {
  user: {
    email: string | null;
    username: string | null;
    image: string | null;
  };
  pendingImageFile: File | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  updating: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  user: {
    email: null,
    username: null,
    image: null,
  },
  pendingImageFile: null,
  loading: 'idle',
  updating: 'idle',
  error: null,
};

const profileSettingSlice = createSlice({
  name: 'profileSettings',
  initialState,
  reducers: {
    setPendingImageFile: (state, action: PayloadAction<File | null>) => {
      state.pendingImageFile = action.payload;
    },
    clearProfileError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string || 'Failed to fetch profile';
      })
      // Update Profile (Username/Image)
      .addCase(updateProfile.pending, (state) => {
        state.updating = 'pending';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = 'succeeded';
        state.user = action.payload; // Update user data with response
        state.pendingImageFile = null; // Clear pending file on success
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = 'failed';
        state.error = action.payload as string || 'Failed to update profile';
      });
  },
});

export const { setPendingImageFile, clearProfileError } = profileSettingSlice.actions;
export default profileSettingSlice.reducer;
