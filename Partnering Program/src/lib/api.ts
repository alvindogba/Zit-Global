import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL
console.log('API_URL:', API_URL);
if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in .env file');
}
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
  message?: string;
}

export const auth = {
  signUp: async (data: { email: string; password: string; fullName: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  signIn: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },
  resetPassword: async (credentials: { password: string; confirmPassword: string; token: string }): Promise<void> => {
    await api.post('/auth/reset-password', credentials);
  },
};

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  avatarUrl?: string;
  bio?: string;
  referralLink?: string;
}

export const profiles = {
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getProfile: async (): Promise<{ user: Profile }> => {
    const response = await api.get('/profile/me');
    return response.data;
  },
  
  updateProfile: async (data: Partial<Profile>): Promise<{ user: Profile }> => {
    const response = await api.put('/profile/me', data);
    return response.data;
  },
};

export const referrals = {
  getReferrals: async () => {
    const response = await api.get('/referrals');
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/referrals/stats');

    return response.data;
  },
};

export const payouts = {
  getPayouts: async () => {
    const response = await api.get('/payouts');
    console.log("payouts ", response.data)
    return response.data;
  },
  
  requestPayout: async (amount: number) => {
    const response = await api.post('/payouts/request', { amount });
    return response.data;
  },
};