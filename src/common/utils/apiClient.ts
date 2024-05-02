import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { ResponseCode } from '../types/consts';
import { ApiResponse } from '../types/basic';

const BASE_API_ORIGIN = 'https://www.yuanzhi.xyz/api/v2';

const apiClient = axios.create({
  baseURL: BASE_API_ORIGIN,
});

const refreshAuthLogic = (failedRequest: any) => {
  const refresh_token = localStorage.getItem('refresh_token');
  return axios
    .post(`${BASE_API_ORIGIN}/auth/refresh`, {
      refresh_token,
    })
    .then((tokenRefreshResponse) => {
      const { access_token } = tokenRefreshResponse.data.data;
      localStorage.setItem('access_token', access_token);
      failedRequest.response.config.headers['Authorization'] =
        'Bearer ' + access_token;
      return Promise.resolve();
    });
};
createAuthRefreshInterceptor(apiClient, refreshAuthLogic, {
  shouldRefresh: (error: AxiosError) => {
    const response = error.response?.data as ApiResponse;
    return (
      error.response?.status === 401 &&
      response.code === ResponseCode.TOKEN_EXPIRE
    );
  },
});
// 设置请求拦截器以确保每个请求都发送当前的 token
apiClient.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access_token}`;
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
