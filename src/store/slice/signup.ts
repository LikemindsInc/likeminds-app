import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISignUp } from '@app-model';
import axiosClient from '../../config/axiosClient';
import { navigate } from '../../utils/NavigateUtil';
import { APP_SCREEN_LIST } from '../../constants';
import axios from 'axios';

const initialState: {
  data: any;
  loading: boolean;
  error: any;
  isSignup: boolean;
} = {
  data: {},
  loading: false,
  error: undefined || '',
  isSignup: false,
};

// actions
export const signup = createAsyncThunk(
  'signup/post',
  async (payload: ISignUp, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/api/auth/sign-up', payload);
      return res.data;
    } catch (error: any) {
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
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  extraReducers: (builder) => {
    // pending state
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    // fulfilled state
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isSignup = true;
      state.data = {
        ...action.payload,
        ...action.meta.arg,
      };
    });
    // error handling
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    });
  },
  reducers: {
    clearSignUpError: (state) => {
      state.error = undefined;
    },

    updateSignupPhoneNumber: (state, action: PayloadAction<string>) => {
      state.data.phone = action.payload;
    },
  },
});

// Generate reducer
export const { clearSignUpError, updateSignupPhoneNumber } =
  signupSlice.actions;
const signupReducer = signupSlice.reducer;
export default signupReducer;
