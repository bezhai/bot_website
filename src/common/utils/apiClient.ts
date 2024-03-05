import axios, { AxiosError } from 'axios';

const LOCATION_ORIGIN = window.location.origin;
const BASE_API_ORIGIN = "https://www.yuanzhi.xyz"

const API_URL = (LOCATION_ORIGIN.indexOf("localhost") !== -1 ? BASE_API_ORIGIN : LOCATION_ORIGIN) + "/api"; // 允许http用户使用http请求而非https, 同时兼容本地测试

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
