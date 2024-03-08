import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const LOCATION_ORIGIN = window.location.origin;
const BASE_API_ORIGIN = "https://www.yuanzhi.xyz"

const API_URL = (LOCATION_ORIGIN.indexOf("localhost") !== -1 ? BASE_API_ORIGIN : LOCATION_ORIGIN) + "/api"; // 允许http用户使用http请求而非https, 同时兼容本地测试

const apiClient = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRefreshed(token: string) {
  subscribers.forEach(cb => cb(token));
  subscribers = []; // 清空数组，以便下次刷新时重新收集订阅者
}

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const expireString = localStorage.getItem('expire');
    const token = localStorage.getItem('token');

    if (expireString && token) {
      const expire = Number(expireString);
      const isExpired = new Date().getTime() >= expire;
      const isAuthUrl = config.url?.includes('auth/refresh');

      if (isExpired && !isAuthUrl) {
        if (!isRefreshing) {
          isRefreshing = true;
          apiClient.get('/auth/refresh').then((response) => {
            const { expire, token } = response.data.data;
            localStorage.setItem('expire', new Date(expire).getTime().toString());
            localStorage.setItem('token', token);
            apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
            isRefreshing = false;
            onRefreshed(token);
          }).catch((error) => {
            isRefreshing = false;
            console.error(error);
          });
        }

        return new Promise<AxiosRequestConfig>((resolve, reject) => {
          subscribeTokenRefresh(newToken => {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as any;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export function setupInterceptors(onUnauthorized: () => void): void {
  apiClient.interceptors.response.use(
    (response) => response,
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
