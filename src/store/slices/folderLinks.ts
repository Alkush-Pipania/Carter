import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalLinks } from '@/@types/globallinks';
import { fetchFolderLinks, deleteFolderLink, addFolderLink } from '../thunks/folderLinksThunk';

interface FolderInfo {
    id: number;
    name: string;
}

interface FolderLinksState {
    folder: FolderInfo | null;
    links: GlobalLinks[];
    loading: boolean;
    error: string | null;
}

const initialState: FolderLinksState = {
    folder: null,
    links: [],
    loading: true,
    error: null,
};

const folderLinksSlice = createSlice({
    name: 'folderLinks',
    initialState,
    reducers: {
        setFolderLinks: (state, action: PayloadAction<GlobalLinks[]>) => {
            state.links = action.payload;
        },
        setFolder: (state, action: PayloadAction<FolderInfo>) => {
            state.folder = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFolderLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFolderLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.folder = action.payload.folder;
                state.links = action.payload.links;
            })
            .addCase(fetchFolderLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteFolderLink.fulfilled, (state, action) => {
                state.links = state.links.filter(link => link.secret_Id !== action.payload);
            })
            .addCase(addFolderLink.fulfilled, (state, action) => {
                state.links.unshift(action.payload);
            });
    },
});

export const { setFolderLinks, setFolder, setLoading, setError } = folderLinksSlice.actions;
export default folderLinksSlice.reducer; 