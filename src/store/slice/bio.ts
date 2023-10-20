import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const deleteBio = createAsyncThunk(
  '',
  async (payload: { id: string; type: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(
        `/api/auth/bio/${payload.id}/${payload.type}`,
      );
      console.log(response.data.data);
      return response.data.data;
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
