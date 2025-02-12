import axios from 'axios';
import { logout, refreshTokens } from './slices/AuthSlice';

const client = axios.create({
  baseURL: 'http://10.2.1.35:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const store = (await import('./store')).default; 
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const store = (await import('./store')).default; 
      try {
        const result = await store.dispatch(refreshTokens()).unwrap();
        client.defaults.headers.Authorization = `Bearer ${result.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${result.access_token}`;          
        return client(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default client;
