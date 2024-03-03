import axios, { AxiosError } from 'axios';

const API_URL = 'http://www.yuanzhi.xyz/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url && config.url.startsWith('/need-auth/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export function setupInterceptors(onUnauthorized: () => void): void {
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}

export default apiClient;
