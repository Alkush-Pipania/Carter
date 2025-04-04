import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Folder {
    id: number;
    name: string;
    userId: string;
}

interface FoldersState {
    currentFolder: Folder | null;
    folders: Folder[];
    loading: boolean;
    error: string | null;
}

const initialState: FoldersState = {
    currentFolder: null,
    folders: [],
    loading: false,
    error: null,
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setCurrentFolder: (state, action: PayloadAction<Folder | null>) => {
            state.currentFolder = action.payload;
        },
        setFolders: (state, action: PayloadAction<Folder[]>) => {
            state.folders = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setCurrentFolder, setFolders, setLoading, setError } = foldersSlice.actions;
export default foldersSlice.reducer; 