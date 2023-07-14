import { ICountry, IThunkAPIStatus, IUserData } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import { getCountriesAction } from "../actions/settings";
import { PURGE, REHYDRATE } from "redux-persist";
import {
  loginUserActionAction,
  signupUserActionAction,
  verifyOTPActionAction,
} from "../actions/auth";

export interface ISettingState {
  getCountriesStatus: IThunkAPIStatus;
  getCountriesSuccess: string;
  getCountriesError?: string;
  countries: ICountry[];
  userInfo: IUserData | null;
}

const initialState: ISettingState = {
  getCountriesStatus: "idle",
  getCountriesSuccess: "",
  getCountriesError: "",
  countries: [],
  userInfo: null,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.countries = [];
      state.userInfo = null;
      state.getCountriesStatus = "idle";
      state.getCountriesSuccess = "";
      state.getCountriesError = "";
    });
    builder.addCase(REHYDRATE, (state) => {
      state.countries = [];
      state.getCountriesStatus = "idle";
      state.getCountriesSuccess = "";
      state.getCountriesError = "";
    });
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

    builder.addCase(loginUserActionAction.fulfilled, (state, action) => {
      console.log("user data> ", action.payload.data);
      state.userInfo = action.payload.data;
    });
  },
});

export const {} = settingSlice.actions;

export default settingSlice.reducer;
