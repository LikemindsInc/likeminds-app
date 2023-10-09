import {
  ICreateSpaceRequestDTO,
  ISpaceList,
  IThunkAPIStatus,
} from "@app-model";
import {
  createSlice,
  isRejected,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
import {
  createSpaceAction,
  followSpaceAction,
  getCurrentUserSpace,
  getSpaceListAction,
} from "../actions/space";
import { PURGE } from "redux-persist";

export interface ISpaceState {
  createSpaceDTO: ICreateSpaceRequestDTO;
  createSpaceStatus: IThunkAPIStatus;
  createSpaceSuccess: string;
  createSpaceError: string;

  getSpaceListStatus: IThunkAPIStatus;
  getSpaceListSuccess: string;
  getSpaceListError: string;

  followSpaceStatus: IThunkAPIStatus;
  followSpaceSuccess: string;
  followSpaceError: string;

  spaceList: ISpaceList[];

  currentUserSpaceList: ISpaceList[];
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

  getSpaceListStatus: "idle",
  getSpaceListSuccess: "",
  getSpaceListError: "",

  followSpaceStatus: "idle",
  followSpaceSuccess: "",
  followSpaceError: "",

  spaceList: [],

  currentUserSpaceList: [],
};

const SpaceSlice = createSlice({
  name: "space-slice",
  initialState,
  reducers: {
    storeSpaceTitleAndDescription(
      state: ISpaceState,
      action: PayloadAction<{ title: string; description: string }>,
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

    clearFollowSpaceStatus(state: ISpaceState) {
      state.followSpaceStatus = "idle";
      state.followSpaceSuccess = "";
      state.followSpaceError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return state;
    });
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

    builder.addCase(getSpaceListAction.pending, (state) => {
      state.getSpaceListStatus = "loading";
    });
    builder.addCase(getSpaceListAction.fulfilled, (state, action) => {
      state.spaceList = action.payload.data;
      state.getSpaceListStatus = "completed";
    });
    builder.addCase(getSpaceListAction.rejected, (state, action) => {
      state.getSpaceListStatus = "failed";
      state.getSpaceListError = action.payload?.message as string;
    });

    builder.addCase(followSpaceAction.pending, (state) => {
      state.followSpaceStatus = "loading";
    });
    builder.addCase(followSpaceAction.fulfilled, (state, action) => {
      state.followSpaceStatus = "completed";
    });
    builder.addCase(followSpaceAction.rejected, (state, action) => {
      state.followSpaceStatus = "failed";
      state.followSpaceError = action.payload?.message as string;
    });

    builder.addCase(getCurrentUserSpace.pending, (state) => {
      state.getSpaceListStatus = "loading";
    });
    builder.addCase(getCurrentUserSpace.fulfilled, (state, action) => {
      state.getSpaceListStatus = "completed";
      state.currentUserSpaceList = action.payload.data;
    });
    builder.addCase(getCurrentUserSpace.rejected, (state, action) => {
      state.getSpaceListStatus = "failed";
      state.getSpaceListError = action.payload?.message as string;
    });
  },
});

export const {
  storeSpaceTitleAndDescription,
  storeSpacePhoto,
  clearCreateSpaceStatus,
  clearFollowSpaceStatus,
} = SpaceSlice.actions;

export default SpaceSlice.reducer;
