import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (payload) => api.post('/auth/register', payload),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload),
  resetPassword: (payload) => api.post('/auth/reset-password', payload),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (payload) => api.put('/auth/me', payload),
};
