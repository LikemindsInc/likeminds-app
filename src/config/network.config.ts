import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { REACT_NATIVE_DEFAULT_BASE_URI } from "@env";

import { ResponseInterface } from '@app-model';
import { APP_BASE_URL } from '../constants';
import { store } from '../store/store';
import { refreshTokenAction } from '../actions/auth';

// Set config defaults when creating the instance
export const network = axios.create({ baseURL: APP_BASE_URL });

network.interceptors.request.use(
  (config: any) => {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  },
  (error: AxiosError) => {
    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  },
);

// Add a response interceptor
network.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as unknown as AxiosRequestConfig<any>;

    if (
      error?.response?.status === 403 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.status === 401 ||
      error?.response?.data?.statusCode === 401
    ) {
    }

    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  },
);
