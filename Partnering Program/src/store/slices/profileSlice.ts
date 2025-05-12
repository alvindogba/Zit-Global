import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profiles } from '../../lib/api';

interface ProfileState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const response = await profiles.getProfile();
  console.log('Fetched profile:', response.user);
  return response.user;
});

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data: { fullName?: string; avatarUrl?: string }) => {
    const response = await profiles.updateProfile(data);
    return response.user;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export default profileSlice.reducer;