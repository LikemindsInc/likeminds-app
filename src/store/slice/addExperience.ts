import { ILogin } from '@app-model';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ExperienceDoc {
  experience: {
    startDate: string;
    endDate: string;
    stillWorkHere?: boolean;
    jobTitle: string;
    companyName: string;
    responsibilities: string;
    industry: string;
  }[];
}

export const addExperience = createAsyncThunk(
  'signup/post',
  async (payload: ExperienceDoc, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(
        '/api/auth/complete-registration',
        payload,
      );
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
