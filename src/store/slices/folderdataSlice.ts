import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFolderData, createFolder } from '../thunks/folderdataThunks';

interface FolderData {
  id: string;
  name: string;
  _count: {
    links: number;
  };
}

interface FolderDataState {
  data: FolderData[];
  loading: boolean;
  creating: boolean;
  error: string | null;
  createError: string | null;
}

const initialState: FolderDataState = {
  data: [],
  loading: false,
  creating: false,
  error: null,
  createError: null,
};

export const folderdataSlice = createSlice({
  name: 'folderdata',
  initialState,
  reducers: {
    clearFolderData: (state) => {
      state.data = [];
      state.error = null;
    },
    addFolder: (state, action: PayloadAction<FolderData>) => {
      state.data.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(folder => folder.id.toString() !== action.payload.toString());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFolderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFolderData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.error = null;
      })
      .addCase(getFolderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch folder data';
      })
      .addCase(createFolder.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createFolder.fulfilled, (state, action: PayloadAction<any>) => {
        state.creating = false;
        state.createError = null;
        if (action.payload?.data) {
          const newFolder: FolderData = {
            id: action.payload.data.id.toString(),
            name: action.payload.data.name,
            _count: {
              links: 0
            }
          };
          state.data.unshift(newFolder);
        }
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.error.message || 'Failed to create folder';
      });
  },
});

export const { clearFolderData, addFolder, removeFolder } = folderdataSlice.actions;

export default folderdataSlice.reducer;
