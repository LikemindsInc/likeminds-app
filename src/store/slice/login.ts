import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILogin } from '@app-model';
import axiosClient from '../../config/axiosClient';

const initialState: {
  data: object;
  loading: boolean;
  error: any;
  isLogin: boolean;
} = {
  data: {},
  loading: false,
  error: undefined || '',
  isLogin: false,
};

// actions
export const login = createAsyncThunk(
  'login/post',
  async (payload: ILogin, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/api/auth/login', payload);
      return res.data;
    } catch (error) {
      const errorValue: string | [] = error?.response?.data?.message;
      if (Array.isArray(errorValue)) {
        const message = errorValue as Array<string>;
        return rejectWithValue(message[0]);
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginError(state: any) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // pending state
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    // fulfilled state
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isLogin = true;
      state.data = {
        ...action.payload,
        ...action.meta.arg,
      };
    });
    // error handling
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    });
  },
});

export const { clearLoginError } = loginSlice.actions;

// Generate reducer
const loginReducer = loginSlice.reducer;
export default loginReducer;
