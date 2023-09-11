import {
  ICountry,
  ISchool,
  IThunkAPIStatus,
  IUserData,
  Industry,
} from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import { getCountriesAction } from "../actions/settings";
import { PURGE, REHYDRATE } from "redux-persist";
import {
  getAllIndustriesAction,
  getAllSchoolAction,
  getCurrentUserAction,
  loginUserActionAction,
  refreshTokenAction,
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

  getSchoolsStatus: IThunkAPIStatus;
  getSchoolsSuccess: string;
  getSchoolsError?: string;

  getIndustryStatus: IThunkAPIStatus;
  getIndustrySuccess: string;
  getIndustryError?: string;

  countries: ICountry[];
  schools: ISchool[];
  industries: Industry[];
  userInfo: IUserData | null;
}

const initialState: ISettingState = {
  getCountriesStatus: "idle",
  getCountriesSuccess: "",
  getCountriesError: "",

  getCurrentUserStatus: "idle",
  getCurrentUserSuccess: "",
  getCurrentUserError: "",

  getSchoolsStatus: "idle",
  getSchoolsSuccess: "",
  getSchoolsError: "",

  getIndustryStatus: "idle",
  getIndustrySuccess: "",
  getIndustryError: "",

  countries: [],
  schools: [],
  industries: [],
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
    builder.addCase(PURGE, (state) => {
      state.userInfo = null;
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

    builder.addCase(getAllIndustriesAction.pending, (state) => {
      state.getIndustryStatus = "loading";
    });
    builder.addCase(getAllIndustriesAction.fulfilled, (state, action) => {
      state.getIndustryStatus = "completed";
      state.industries = action.payload.data;
    });

    builder.addCase(getAllIndustriesAction.rejected, (state, action) => {
      state.getIndustryStatus = "failed";
      state.getIndustryError = action.payload?.message as string;
    });

    builder.addCase(getAllSchoolAction.pending, (state) => {
      state.getSchoolsStatus = "loading";
    });
    builder.addCase(getAllSchoolAction.fulfilled, (state, action) => {
      state.getCountriesStatus = "completed";
      state.schools = action.payload.data;
    });

    builder.addCase(getAllSchoolAction.rejected, (state, action) => {
      state.getSchoolsStatus = "failed";
      state.getSchoolsError = action.payload?.message as string;
    });

    builder.addCase(loginUserActionAction.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
      state.userInfo.refreshToken = action.payload.data.refreshToken;
    });

    builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          access_token: action.payload.data.access_token,
          refreshToken: action.payload.data.refresh_token,
        };
      }
    });

    builder.addCase(refreshTokenAction.rejected, (state, action) => {
      state.userInfo = null;
    });
  },
});

export const { logoutUserAction } = settingSlice.actions;

export default settingSlice.reducer;
