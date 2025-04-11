import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLinkContent } from '../thunks/linkContentThunks';

interface LinkContentData {
  links: string;
  title: string;
  description: string;
  secret_Id: string;
  body?: string;
  createdAt?: string;
}

interface LinkContentState {
  data: LinkContentData | null;
  loading: boolean;
  error: string | null;
}

const initialState: LinkContentState = {
  data: null,
  loading: false,
  error: null,
};

export const linkContentSlice = createSlice({
  name: 'linkContent',
  initialState,
  reducers: {
    clearLinkContent: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinkContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLinkContent.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.data || null;
        state.error = null;
      })
      .addCase(getLinkContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch link content';
      });
  },
});

export const { clearLinkContent } = linkContentSlice.actions;

export default linkContentSlice.reducer; 