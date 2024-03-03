import axios from "axios";
import { UnTranslateData } from "./types/translate";
import { NewApiResponse } from "./types/basic";
import { ListImageData, ListImageReq, UpdateImagesStatusReq } from "./types/image";
import { RedisArrayData, RedisStringData } from "./types/redis";

const API_URL = "http://www.yuanzhi.xyz/api";

export const getUntranslatedWords = (
  page: number,
  page_size: number,
  search_key: string
): NewApiResponse<UnTranslateData> => {
  return axios.post(`${API_URL}/temp/un_trans`, {
    page,
    page_size,
    search_key,
  });
};

export const submitTranslation = (
  origin: string,
  translation: string
): NewApiResponse => {
  return axios.post(`${API_URL}/temp/update_trans`, { origin, translation });
};

export const deleteTranslation = (word: string): NewApiResponse => {
  return axios.post(`${API_URL}/temp/delete_trans`, { word });
};

export const fetchImages = (filters: ListImageReq): NewApiResponse<ListImageData> => {
  return axios.post(`${API_URL}/need-auth/image-store/list-info`, filters);
};

export const updateImagesStatus = (filters: UpdateImagesStatusReq): NewApiResponse => {
  return axios.post(`${API_URL}/need-auth/image-store/update-status`, filters);
};

export const getRedisValue = (key: string): NewApiResponse<RedisStringData> => {
  return axios.get(`${API_URL}/temp/redis/get`, { params: { key } });
};

export const setRedisValue = (key: string, value: string): NewApiResponse => {
  return axios.post(`${API_URL}/temp/redis/set`, { key, value });
};

export const getRedisMemberValue = (key: string): NewApiResponse<RedisArrayData> => {
  return axios.get(`${API_URL}/temp/redis/member/get`, {params: { key }});
};

export const setRedisMemberValue = (key: string, value: string[]): NewApiResponse => {
  return axios.post(`${API_URL}/temp/redis/member/set`, { key, value });
};
