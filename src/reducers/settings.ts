import { ICountry, IThunkAPIStatus, IUserData } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import { getCountriesAction } from "../actions/settings";
import { PURGE, REHYDRATE } from "redux-persist";
import {
  getCurrentUserAction,
  loginUserActionAction,
  signupUserActionAction,
  verifyOTPActionAction,
} from "../actions/auth";

export interface ISettingState {
  getCountriesStatus: IThunkAPIStatus;
  getCountriesSuccess: string;
  getCountriesError?: string;

  getCurrentUserStatus: IThunkAPIStatus;
  getCurrentUserSuccess: string;
  getCurrentUserError?: string;
  countries: ICountry[];
  userInfo: IUserData | null;
}

const initialState: ISettingState = {
  getCountriesStatus: "idle",
  getCountriesSuccess: "",
  getCountriesError: "",

  getCurrentUserStatus: "idle",
  getCurrentUserSuccess: "",
  getCurrentUserError: "",

  countries: [],
  userInfo: null,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    logoutUserAction(state) {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountriesAction.pending, (state) => {
      state.getCountriesStatus = "loading";
    });
    builder.addCase(getCountriesAction.fulfilled, (state, action) => {
      state.countries = action.payload.data;
      state.getCountriesStatus = "completed";
    });
    builder.addCase(getCountriesAction.rejected, (state, action) => {
      state.getCountriesStatus = "failed";
    });

    builder.addCase(verifyOTPActionAction.pending, (state) => {});
    builder.addCase(verifyOTPActionAction.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
    });

    builder.addCase(verifyOTPActionAction.rejected, (state, action) => {});

    builder.addCase(getCurrentUserAction.pending, (state) => {
      state.getCurrentUserStatus = "loading";
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.getCurrentUserStatus = "completed";
      state.userInfo = { ...state.userInfo, ...action.payload.data };
    });

    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
      state.getCurrentUserStatus = "failed";
      state.getCurrentUserError = action.payload?.message as string;
    });

    builder.addCase(loginUserActionAction.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
    });
  },
});

export const { logoutUserAction } = settingSlice.actions;

export default settingSlice.reducer;
