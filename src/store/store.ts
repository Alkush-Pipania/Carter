import { configureStore } from '@reduxjs/toolkit';
import userLinkGlobalReducer from './slices/userLinksGlobal';
import folderLinksReducer from './slices/folderLinks';
import foldersReducer from './slices/folders';
import userdetailReducer from './slices/userdetailSlice';
import folderdataReducer from './slices/folderdataSlice';
import linkContentReducer from './slices/linkContentSlice';
import trashFolderReducer from './slices/trashFolderSlice';
import profileSettingsReducer from './slices/profile-settingSlice'; 

export const store = configureStore({
    reducer: {
        userLinkGlobal: userLinkGlobalReducer,
        folderLinks: folderLinksReducer,
        folders: foldersReducer,
        userdetail: userdetailReducer,
        folderdata: folderdataReducer,
        linkContent: linkContentReducer,
        trashFolder: trashFolderReducer,
        profileSettings : profileSettingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;