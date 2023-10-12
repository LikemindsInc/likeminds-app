import { createSlice } from '@reduxjs/toolkit';

interface initialStateFields {
  loading: boolean;
  isFirstLogin: boolean;
  isFirstLaunch: boolean;
  refreshToken: string;
  token: string;
}

const initialState: initialStateFields = {
  loading: false,
  isFirstLogin: true,
  isFirstLaunch: true,
  refreshToken: '',
  token: '',
};

const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    firstLaunch: (state) => {
      state.isFirstLaunch = false;
    },
    loadTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    loggedIn: (state) => {
      state.isFirstLogin = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { firstLaunch, loadTokens } = setting.actions;
const settingReducer = setting.reducer;
export default settingReducer;
