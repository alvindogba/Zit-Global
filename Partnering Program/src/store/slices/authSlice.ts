import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, AuthResponse } from '../../lib/api';

type ThunkConfig = {
  rejectValue: { message: string };
};

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  passwordResetStatus: 'idle' | 'loading' | 'success' | 'error';
  passwordResetError: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  passwordResetStatus: 'idle',
  passwordResetError: null,
};

export const signUp = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; fullName: string },
  ThunkConfig
>('auth/signUp', async (data, { rejectWithValue }) => {
  try {
    const response = await auth.signUp(data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    return rejectWithValue({ message: 'Sign up failed' });
  }
});

export const signIn = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  ThunkConfig
>('auth/signIn', async (data, { rejectWithValue }) => {
  try {
    const response = await auth.signIn(data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    return rejectWithValue({ message: 'Sign in failed' });
  }
});

export const forgotPassword = createAsyncThunk<
  void,
  string,
  ThunkConfig
>('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    await auth.forgotPassword(email);
  } catch (error) {
    return rejectWithValue({ message: 'Failed to send reset email' });
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { password: string; confirmPassword: string; token: string },
  ThunkConfig
>('auth/resetPassword', async (credentials, { rejectWithValue }) => {
  try {
    await auth.resetPassword(credentials);
  } catch (error) {
    return rejectWithValue({ message: 'Failed to reset password' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // Sign up
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })

    // Sign in
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })

    // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.passwordResetStatus = 'loading';
        state.passwordResetError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.passwordResetStatus = 'success';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.passwordResetStatus = 'error';
        state.passwordResetError = action.error.message || 'Failed to send reset email';
      })

    // Reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetStatus = 'loading';
        state.passwordResetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetStatus = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordResetStatus = 'error';
        state.passwordResetError = action.error.message || 'Failed to reset password';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;