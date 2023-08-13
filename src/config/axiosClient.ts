import axios, { AxiosError } from "axios";
import { APP_BASE_URL } from "../constants";
import { store } from "../store/store";
import { ISettingState } from "../reducers/settings";
import { refreshTokenAction } from "../actions/auth";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = APP_BASE_URL;

const axiosClient = axios.create({ baseURL: APP_BASE_URL });

export const axioxRefreshClient = axios.create({ baseURL: APP_BASE_URL });

axiosClient.interceptors.request.use((config: any) => {
  // grab current state
  let token = "";

  if (store) {
    const state = (store.getState() as any).settingReducer as ISettingState;

    // alert((token))

    token =
      state?.userInfo?.access_token ||
      state.userInfo?.accessToken?.access_token ||
      (`${state.userInfo?.accessToken}` as string);
  }

  // get the JWT token out of it
  // const access_token = state?.session?.userData?.token;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export default axiosClient;

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    if (
      error?.response?.status === 403 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.status === 401 ||
      error?.response?.data?.statusCode === 401
    ) {
      //   const state = store.getState();
      //   const refresh_token = state?.session?.userData?.token;

      const state = (store.getState() as any).settingReducer as ISettingState;
      const token = state.userInfo?.refreshToken as string;

      store.dispatch(refreshTokenAction(token));

      return;
    }

    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  }
);
