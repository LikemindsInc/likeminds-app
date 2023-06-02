import { ICreatePostDTO, IThunkAPIStatus } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { createPostAction } from "../actions/post";

export interface IPostState {
  createPostDTO: ICreatePostDTO;
  createPostStatus: IThunkAPIStatus;
  createPostSuccess: string;
  createPostError: string;
}

const initialState: IPostState = {
  createPostDTO: {
    content: "",
    image: "",
  },
  createPostStatus: "idle",
  createPostSuccess: "",
  createPostError: "",
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
  },
});

export const { clearCreatePostStatus } = PostSlice.actions;

export default PostSlice.reducer;
