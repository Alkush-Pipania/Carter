import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalLinks } from '@/@types/globallinks';
import { fetchGlobalLinks, deleteGlobalLink, addGlobalLink } from '../thunks/userLinksGlobalThunk';

interface UserLinksGlobalState {
    links: GlobalLinks[];
    loading: boolean;
    error: string | null;
}

const initialState: UserLinksGlobalState = {
    links: [],
    loading: false,
    error: null,
};

const userLinksGlobalSlice = createSlice({
    name: 'userLinkGlobal',
    initialState,
    reducers: {
        setGlobalLinks: (state, action: PayloadAction<GlobalLinks[]>) => {
            state.links = action.payload;
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
            .addCase(fetchGlobalLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGlobalLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.links = action.payload;
            })
            .addCase(fetchGlobalLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteGlobalLink.fulfilled, (state, action) => {
                state.links = state.links.filter(link => link.secret_Id !== action.payload);
            })
            .addCase(addGlobalLink.fulfilled, (state, action) => {
                state.links.unshift(action.payload);
            });
    },
});

export const { setGlobalLinks, setLoading, setError } = userLinksGlobalSlice.actions;
export default userLinksGlobalSlice.reducer; 