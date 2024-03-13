import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { ResponseCode } from '../types/consts';
import { ApiResponse } from '../types/basic';

const BASE_API_ORIGIN = 'https://www.yuanzhi.xyz/api';

const apiClient = axios.create({
  baseURL: BASE_API_ORIGIN,
});

// 创建拦截器实例
export function setupRefreshInterceptor(onUnauthorized: () => void): void {
  const refreshAuthLogic = (failedRequest: any) =>
    apiClient
      .get('/auth/refresh')
      .then((tokenRefreshResponse) => {
        const { token } = tokenRefreshResponse.data.data;
        localStorage.setItem('token', token);
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + token;
        return Promise.resolve();
      }).catch((error) => {
        // 如果刷新 token 失败，执行 onUnauthorized
        onUnauthorized();
        return Promise.reject(error);
      });
  createAuthRefreshInterceptor(apiClient, refreshAuthLogic, {
    shouldRefresh: (error: AxiosError) => {
      const response = error.response?.data as ApiResponse;
      return (
        error.response?.status === 401 &&
        response.code === ResponseCode.TOKEN_EXPIRE
      );
    },
  });
}

// 设置请求拦截器以确保每个请求都发送当前的 token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器以处理鉴权失败的情况
export function setupInterceptors(onUnauthorized: () => void): void {
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}

export default apiClient;
