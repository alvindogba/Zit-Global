import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

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

export const auth = {
  signUp: async (data: { email: string; password: string; fullName: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  
  signIn: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const profiles = {
  getProfile: async () => {
    const response = await api.get('/profiles/me');
    return response.data;
  },
  
  updateProfile: async (data: { fullName?: string; avatarUrl?: string }) => {
    const response = await api.put('/profiles/me', data);
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
    return response.data;
  },
  
  requestPayout: async (amount: number) => {
    const response = await api.post('/payouts/request', { amount });
    return response.data;
  },
};