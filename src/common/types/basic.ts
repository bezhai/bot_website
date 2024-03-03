import { AxiosResponse } from "axios";

export interface ApiResponse<T = undefined> {
  code: number;
  msg: string;
  data?: T;
}

export type NewApiResponse<T = undefined> = Promise<
  AxiosResponse<ApiResponse<T>>
>;

export type StringBooleanMap = {
  [key: string]: boolean;
};
