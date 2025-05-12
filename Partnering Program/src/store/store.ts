import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import referralReducer from './slices/referralSlice';
import payoutReducer from './slices/payoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    referral: referralReducer,
    payout: payoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;