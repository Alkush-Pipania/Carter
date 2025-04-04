import { configureStore } from '@reduxjs/toolkit';
import userLinkGlobalReducer from './slices/userLinksGlobal';
import folderLinksReducer from './slices/folderLinks';
import foldersReducer from './slices/folders';

export const store = configureStore({
    reducer: {
        userLinkGlobal: userLinkGlobalReducer,
        folderLinks: folderLinksReducer,
        folders: foldersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;