import { IUserProfileData } from '@app-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const addExperience = createAsyncThunk(
  'experience/post',
  async (payload: IUserProfileData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.patch(
        '/api/auth/complete-registration',
        payload,
      );
      return res.data?.data;
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
