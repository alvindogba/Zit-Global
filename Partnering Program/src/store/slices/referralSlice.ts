import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { referrals } from '../../lib/api';

interface ReferralState {
  list: any[];
  stats: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReferralState = {
  list: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchReferrals = createAsyncThunk('referral/fetchReferrals', async () => {
  const response = await referrals.getReferrals();
  console.log(' referrals:', response);
  return response;
});

export const fetchReferralStats = createAsyncThunk('referral/fetchStats', async () => {
  const response = await referrals.getStats();
  console.log('Fetched referral stats:', response);
  return response;
});

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch referrals';
      })
      .addCase(fetchReferralStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchReferralStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stats';
      });
  },
});

export default referralSlice.reducer;