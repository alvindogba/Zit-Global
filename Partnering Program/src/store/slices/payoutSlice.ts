import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { payouts, UpdatePayoutStatusRequest } from '../../lib/api';

interface PayoutRequest {
  amount: number;
  paymentMethod: string;
}

interface UpdatePayoutStatusParams {
  payoutId: number;
  request: UpdatePayoutStatusRequest;
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

export const updatePayoutStatus = createAsyncThunk(
  'payout/updateStatus',
  async ({ payoutId, request }: UpdatePayoutStatusParams) => {
    const response = await payouts.updateStatus(payoutId, request);
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
      })
      .addCase(updatePayoutStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayoutStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPayout = action.payload;
        state.list = state.list.map((payout: any) =>
          payout.id === updatedPayout.id ? updatedPayout : payout
        );
      })
      .addCase(updatePayoutStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update payout status';
      });
  },
});

export default payoutSlice.reducer;