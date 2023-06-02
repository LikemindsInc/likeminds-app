import { ICreateSpaceRequestDTO, IThunkAPIStatus } from "@app-model";
import {
  createSlice,
  isRejected,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { createSpaceAction } from "../actions/space";

export interface ISpaceState {
  createSpaceDTO: ICreateSpaceRequestDTO;
  createSpaceStatus: IThunkAPIStatus;
  createSpaceSuccess: string;
  createSpaceError: string;
}

const initialState: ISpaceState = {
  createSpaceDTO: {
    title: "",
    description: "",
    photo: null,
  },
  createSpaceStatus: "idle",
  createSpaceSuccess: "",
  createSpaceError: "",
};

const SpaceSlice = createSlice({
  name: "space-slice",
  initialState,
  reducers: {
    storeSpaceTitleAndDescription(
      state: ISpaceState,
      action: PayloadAction<{ title: string; description: string }>
    ) {
      state.createSpaceDTO.title = action.payload.title;
      state.createSpaceDTO.description = action.payload.description;
    },
    storeSpacePhoto(state: ISpaceState, action: PayloadAction<any>) {
      state.createSpaceDTO.photo = action.payload;
    },
    clearCreateSpaceStatus(state: ISpaceState) {
      state.createSpaceStatus = "idle";
      state.createSpaceSuccess = "";
      state.createSpaceError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSpaceAction.pending, (state) => {
      state.createSpaceStatus = "loading";
    });
    builder.addCase(createSpaceAction.fulfilled, (state, action) => {
      state.createSpaceSuccess = action.payload.message;
      state.createSpaceStatus = "completed";
    });
    builder.addCase(createSpaceAction.rejected, (state, action) => {
      state.createSpaceStatus = "failed";
      state.createSpaceError = action.payload?.message as string;
    });
  },
});

export const {
  storeSpaceTitleAndDescription,
  storeSpacePhoto,
  clearCreateSpaceStatus,
} = SpaceSlice.actions;

export default SpaceSlice.reducer;
