import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarter, putCarter, postCarterFormData } from '@/services/API_Services'; // Assuming postCarterFormData exists/will be created
import { API_ENDPOINTS } from '@/services/apiEndpoints';
import type { RootState, AppDispatch } from '../store'; // Import RootState and AppDispatch

// Interface for the expected profile data
interface UserProfile {
  email: string | null;
  username: string | null;
  image: string | null;
}

// Thunk to fetch user profile
export const fetchProfile = createAsyncThunk<
  UserProfile, 
  void, 
  { 
    rejectValue: string 
    // No need for state here if userId comes from localStorage
  }
>(
  'profileSettings/fetchProfile',
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem('userId'); 
    if (!userId) {
      console.error("fetchProfile: userId not found in localStorage");
      return rejectWithValue('User ID not found in localStorage');
    }
    // console.log("fetchProfile: Got userId", userId);
    try {
      const response = await getCarter(API_ENDPOINTS.Profile, { userId });
      // console.log("fetchProfile: API response", response);
      return response as UserProfile;
    } catch (error: any) {
      console.error("fetchProfile: Error", error);
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

// Interface for update profile arguments
interface UpdateProfileArgs {
  username: string;
  // userId will be retrieved from localStorage within the thunk
}

// Thunk to update user profile (username and potentially image)
export const updateProfile = createAsyncThunk<
  UserProfile,
  UpdateProfileArgs,
  { state: RootState, dispatch: AppDispatch, rejectValue: string }
>(
  'profileSettings/updateProfile',
  async ({ username }, { getState, rejectWithValue }) => {
    // console.log("updateProfile: Thunk started");
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("updateProfile: userId not found in localStorage");
      return rejectWithValue('User ID not found in localStorage for update');
    }
    // console.log("updateProfile: Got userId", userId);

    const state = getState();
    // @ts-ignore - Temporarily ignore error until store is fixed
    const { pendingImageFile } = state.profileSettings;
    // console.log("updateProfile: Pending image file?", pendingImageFile);

    let updatedUserData: UserProfile;

    try {
      // 1. Update username
      // console.log(`updateProfile: Updating username to '${username}' for userId '${userId}'`);
      const usernameUpdatePayload = { userId, username };
      updatedUserData = await putCarter(API_ENDPOINTS.UpdateUsername, usernameUpdatePayload);
      // console.log("updateProfile: Username update response", updatedUserData);

      // 2. Upload image if pending
      if (pendingImageFile) {
        // console.log("updateProfile: Pending image file exists, preparing upload.");
        // console.log("updateProfile: File type:", pendingImageFile.type);
        // console.log("updateProfile: File size:", pendingImageFile.size);
        
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('profileImage', pendingImageFile);
        
        // console.log("updateProfile: Calling postCarterFormData...");
        const imageUpdateResponse = await postCarterFormData(API_ENDPOINTS.UpdateProfileImage, formData);
        // console.log("updateProfile: Image update response", imageUpdateResponse);
        
        if (imageUpdateResponse && typeof imageUpdateResponse === 'object' && 'image' in imageUpdateResponse) {
          updatedUserData = imageUpdateResponse as UserProfile;
          // console.log("updateProfile: Using full response from image upload.");
        } else {
          const imagePath = (imageUpdateResponse as any)?.path;
          if(imagePath) {
            updatedUserData.image = imagePath;
            // console.log("updateProfile: Manually updated image path to", imagePath);
          } else {
            //  console.log("updateProfile: Image upload response did not contain path/image.");
          }
        }
      } else {
        // console.log("updateProfile: No pending image file to upload.");
      }

      // console.log("updateProfile: Thunk succeeded, returning", updatedUserData);
      return updatedUserData;
    } catch (error: any) {
      console.error("updateProfile: Error during update", error);
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);
