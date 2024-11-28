import { UnTranslateData } from './types/translate';
import { NewApiResponse } from './types/basic';
import {
  ListImageData,
  ListImageReq,
  UpdateImagesStatusReq,
} from './types/image';
import { RedisArrayData, RedisStringData } from './types/redis';
import { LoginResponseData } from './types/login';
import apiClient from './utils/apiClient';

const TRANSLATION_PREFIX = `/translation`;

export const getUntranslatedWords = (
  page: number,
  page_size: number,
  search_key: string
): NewApiResponse<UnTranslateData> => {
  return apiClient.get(TRANSLATION_PREFIX, {params: {
    page,
    page_size,
    search_key,
    only_untranslated: true,
  }});
};

export const submitTranslation = (
  origin: string,
  translation: string
): NewApiResponse => {
  return apiClient.post(TRANSLATION_PREFIX, { origin, translation });
};

export const deleteTranslation = (origin: string): NewApiResponse => {
  return apiClient.delete(TRANSLATION_PREFIX, { params: { origin } });
};

const IMAGE_STORE_PREFIX = `/image-store`;

export const fetchImages = (
  filters: ListImageReq
): NewApiResponse<ListImageData> => {
  return apiClient.get(`${IMAGE_STORE_PREFIX}`, {params: filters});
};

export const updateImagesStatus = (
  filters: UpdateImagesStatusReq
): NewApiResponse => {
  return apiClient.post(`${IMAGE_STORE_PREFIX}/update-status`, filters);
};

const CONFIG_PREFIX = `/setting`;

export const getRedisValue = (key: string): NewApiResponse<RedisStringData> => {
  return apiClient.get(`${CONFIG_PREFIX}`, {
    params: { key },
  });
};

export const setRedisValue = (key: string, value: string): NewApiResponse => {
  return apiClient.post(`${CONFIG_PREFIX}`, { key, value });
};

export const getRedisMemberValue = (
  key: string
): NewApiResponse<RedisArrayData> => {
  return apiClient.get(`${CONFIG_PREFIX}/array`, {
    params: { key },
  });
};

export const setRedisMemberValue = (
  key: string,
  value: string[]
): NewApiResponse => {
  return apiClient.post(`${CONFIG_PREFIX}/array`, { key, value });
};

const AUTH_PREFIX = `/auth`;

export const login = (
  username: string,
  password: string
): NewApiResponse<LoginResponseData> => {
  return apiClient.post(`${AUTH_PREFIX}/login`, { username, password });
};

export const register = (
  username: string,
  password: string
): NewApiResponse => {
  return apiClient.post(`${AUTH_PREFIX}/register`, { username, password });
};
