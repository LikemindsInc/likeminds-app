import axios from "axios";
import { APP_BASE_URL } from "../constants";
import { store } from "../store/store";
import { ISettingState } from "../reducers/settings";

axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.delete["Accept"] = "application/json";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = APP_BASE_URL;

axios.interceptors.request.use((config: any) => {
  // grab current state
  let token = "";

  if (store) {
    const state = (store.getState() as any).settingReducer as ISettingState;

    // alert((token))

    token =
      state?.userInfo?.access_token ||
      state.userInfo?.accessToken?.access_token ||
      "";
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

export default axios;

// export default (() => {
//   axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.put["Authorization"] = `Bearer ${token}`;
//   axios.defaults.headers.delete["Authorization"] = `Bearer ${token}`;

//   return axios;
// })();
