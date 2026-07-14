import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { getToken, clearAuth } from '../utils';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Endpoints where the caller handles error display (no auto-toast)
const silentEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/me'];

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    const url = error.config?.url || '';
    const isSilent = silentEndpoints.some((ep) => url.includes(ep));

    if (error.response?.status === 401) {
      clearAuth();
      if (!isSilent && window.location.pathname !== '/login') {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    } else if (!isSilent) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
