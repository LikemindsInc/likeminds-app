import axios, { AxiosError, AxiosRequestConfig } from "axios";
// import { REACT_NATIVE_DEFAULT_BASE_URI } from "@env";

import { ResponseInterface } from "@app-model";
import { APP_BASE_URL } from "../constants";
import { store } from "../store/store";
import { refreshTokenAction } from "../actions/auth";

// Set config defaults when creating the instance
export const network = axios.create({ baseURL: APP_BASE_URL });

// Add a request interceptor
// network.interceptors.request.use(
//   (config) => {
//     // grab current state
//     const state = store.getState();

//     // get the JWT token out of it
//     // const access_token = state?.session?.userData?.token;
//     // Authorization: access_token && `Bearer ${access_token}`
//     return {
//       ...config,
//       headers: {
//         ...config.headers,
//         Authorization: access_token && `Bearer ${access_token}`,
//       },
//     };
//   },
//   (error: AxiosError) => {
//     console.log("error is error> ", error);
//     reportError(error?.response?.data as Error);
//     return Promise.reject(error?.response?.data as Error);
//   }
// );

network.interceptors.request.use(
  (config: any) => {
    // grab current state

    // get the JWT token out of it
    // const access_token = state?.session?.userData?.token;
    // Authorization: access_token && `Bearer ${access_token}`
    return {
      ...config,
      headers: {
        ...config.headers,
        // Authorization: access_token && `Bearer ${access_token}`,
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

    console.log("error21", error.message);

    console.log("path>>>> ", error.request.path);

    if (
      error?.response?.status === 403 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.status === 401 ||
      error?.response?.data?.statusCode === 401
    ) {
      //   const state = store.getState();
      //   const refresh_token = state?.session?.userData?.token;
      console.log("youshpud be here");
      // store.dispatch(refreshTokenAction());
    }

    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  },
);
