import { createSlice, isRejected, isPending } from "@reduxjs/toolkit";
import _ from "lodash";

export interface IGlobalErrorState {
  message: string;
}

const initialState: IGlobalErrorState = {
  message: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    clearNetworkError(state: IGlobalErrorState) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action: any) => {
      // global error handle reducer
      state.message = "";
    });
    builder.addMatcher(isRejected, (state, action: any) => {
      // global error handle reducer
      if (action.payload?.message && _.isArray(action.payload.message)) {
        state.message = action.payload?.message?.join(",");
      } else {
        state.message = action.payload?.message || action.message || "";
      }
    });
  },
});

export const { clearNetworkError } = errorSlice.actions;

export default errorSlice.reducer;
