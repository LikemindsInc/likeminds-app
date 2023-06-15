import {
  ICreateJobDTO,
  ICreatePostDTO,
  IPostFeed,
  IThunkAPIStatus,
} from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  createJobAction,
  createPostAction,
  getPostFeedAction,
} from "../actions/post";

export interface IPostState {
  createPostDTO: ICreatePostDTO;
  createPostStatus: IThunkAPIStatus;
  createPostSuccess: string;
  createPostError: string;

  getPostFeedStatus: IThunkAPIStatus;
  getPostFeedSuccess: string;
  getPostFeedError: string;

  postFeeds: IPostFeed[];

  createJobStatus: IThunkAPIStatus;
  createJobSuccess: string;
  createJobError: string;

  createJobDTO: ICreateJobDTO | null;
}

const initialState: IPostState = {
  createPostDTO: {
    content: "",
    image: [],
  },
  createPostStatus: "idle",
  createPostSuccess: "",
  createPostError: "",

  getPostFeedStatus: "idle",
  getPostFeedSuccess: "",
  getPostFeedError: "",

  postFeeds: [],

  createJobStatus: "idle",
  createJobSuccess: "",
  createJobError: "",

  createJobDTO: null,
};

const PostSlice = createSlice({
  name: "post-slice",
  initialState,
  reducers: {
    clearCreatePostStatus(state: IPostState) {
      state.createPostStatus = "idle";
      state.createPostSuccess = "";
      state.createPostError = "";
    },

    clearCreateJobStatus(state: IPostState) {
      state.createJobStatus = "idle";
      state.createJobSuccess = "";
      state.createJobError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state) => {
      state.createPostStatus = "loading";
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.createPostSuccess = action.payload.message;
      state.createPostStatus = "completed";
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.createPostStatus = "failed";
      state.createPostError = action.payload?.message as string;
    });

    builder.addCase(getPostFeedAction.pending, (state) => {
      state.getPostFeedStatus = "loading";
    });
    builder.addCase(getPostFeedAction.fulfilled, (state, action) => {
      state.getPostFeedStatus = "completed";
      state.postFeeds = action.payload.data;
      state.getPostFeedSuccess = action.payload?.message;
    });
    builder.addCase(getPostFeedAction.rejected, (state, action) => {
      state.getPostFeedStatus = "failed";
      state.getPostFeedError = action.payload?.message as string;
    });

    builder.addCase(createJobAction.pending, (state) => {
      state.createJobStatus = "loading";
    });
    builder.addCase(createJobAction.fulfilled, (state, action) => {
      state.createJobStatus = "completed";
      state.createJobSuccess = action.payload?.message;
    });
    builder.addCase(createJobAction.rejected, (state, action) => {
      state.createJobStatus = "failed";
      state.createJobError = action.payload?.message as string;
    });
  },
});

export const { clearCreatePostStatus, clearCreateJobStatus } =
  PostSlice.actions;

export default PostSlice.reducer;
