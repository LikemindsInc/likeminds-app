import { createSlice, isRejected, isPending } from '@reduxjs/toolkit';
import _ from 'lodash';
import { PURGE } from 'redux-persist';

export interface IGlobalErrorState {
  message: string;
}

const initialState: IGlobalErrorState = {
  message: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearNetworkError(state: IGlobalErrorState) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return state;
    });
    builder.addMatcher(isPending, (state, action: any) => {
      // global error handle reducer
      state.message = '';
    });
    builder.addMatcher(isRejected, (state, action: any) => {
      // global error handle reducer
      // console.log("rejected", action);
      console.log({ data: action?.payload });
      if (action.payload?.message && _.isArray(action.payload.message)) {
        state.message = action.payload?.message?.join(',');
      } else if (
        action.payload?.message &&
        action.payload.message.trim() !== ''
      ) {
        state.message = action.payload?.message;
      } else if (action.error?.message && _.isArray(action.error?.message)) {
        state.message = action.error?.message[0];
      } else if (action.error?.message && !_.isArray(action.error?.message)) {
        state.message = action.error?.message;
      } else {
        state.message = action.payload?.message || action.message || '';
      }
    });
  },
});

export const { clearNetworkError } = errorSlice.actions;

export default errorSlice.reducer;
