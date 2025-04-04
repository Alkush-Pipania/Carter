import { API_ENDPOINTS } from "@/services/apiEndpoints";
import { getCarter, delCarter, postCarter } from "@/services/API_Services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalLinks } from "@/@types/globallinks";

export const fetchFolderLinks = createAsyncThunk(
    'folderLinks/fetchFolderLinks',
    async({ userId, searchQuery, folderId }: { userId: string | null, searchQuery: string, folderId: number }, thunkApi) => {
        try {
            const endpoint = `${API_ENDPOINTS.FolderLinks}`;
            console.log("Sending request with params:", { userId, searchQuery, folderId });
            const response = await getCarter(endpoint, { userId, searchQuery, folderId: folderId.toString() });
            if (!response) {
                throw new Error('No response received from API');
            }
            return response;
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Failed to fetch folder links',
            )
        }
    }
);

export const deleteFolderLink = createAsyncThunk(
    'folderLinks/deleteFolderLink',
    async({ linkId, userId }: { linkId: string, userId: string | null }, thunkApi) => {
        try {
            const endpoint = '/deleteLink';
            const response = await delCarter(endpoint, { linkId, userId });
            if (!response) {
                throw new Error('No response received from API');
            }
            return linkId; // Return the deleted link ID to remove it from state
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Failed to delete link',
            )
        }
    }
);

export const addFolderLink = createAsyncThunk(
    'folderLinks/addFolderLink',
    async({ url, userId, folderId }: { url: string, userId: string | null, folderId: number }, thunkApi) => {
        try {
            const endpoint = '/addLink';
            const response = await postCarter(endpoint, { url, userId, folder: folderId.toString() });
            if (!response) {
                throw new Error('No response received from API');
            }
            return response as GlobalLinks;
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Failed to add link',
            )
        }
    }
); 