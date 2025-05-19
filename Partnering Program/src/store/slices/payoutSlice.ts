import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { payouts } from '../../lib/api';

interface PayoutRequest {
  amount: number;
  paymentMethod: string;
  details: any;
}

interface PayoutState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PayoutState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPayouts = createAsyncThunk('payout/fetchPayouts', async () => {
  const response = await payouts.getPayouts();
  return response;
});

export const requestPayout = createAsyncThunk(
  'payout/request',
  async (request: PayoutRequest) => {
    const response = await payouts.requestPayout(request);
    return response;
  }
);

const payoutSlice = createSlice({
  name: 'payout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payouts';
      })
      .addCase(requestPayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, action.payload];
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request payout';
      });
  },
});

export default payoutSlice.reducer;