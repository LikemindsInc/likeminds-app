import {
  ICreateJobDTO,
  ICreatePostDTO,
  IJobDTO,
  IPostCommentFeed,
  IPostFeed,
  IThunkAPIStatus,
} from "@app-model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  commentOnCommentAction,
  commentOnPostAction,
  createJobAction,
  createPostAction,
  getCommentsOnPostAction,
  getJobsAction,
  getPostFeedAction,
  getPostFeedByIdAction,
  likePostAction,
  reactToPostAction,
  unlikePostAction,
} from "../actions/post";

export interface IPostState {
  createPostDTO: ICreatePostDTO;
  createPostStatus: IThunkAPIStatus;
  createPostSuccess: string;
  createPostError: string;

  likePostStatus: IThunkAPIStatus;
  likePostSuccess: string;
  likePostError: string;

  commentOnPostStatus: IThunkAPIStatus;
  commentOnPostSuccess: string;
  commentOnPostError: string;

  commentOnCommentStatus: IThunkAPIStatus;
  commentOnCommentSuccess: string;
  commentOnCommentError: string;

  getCommentOnPostStatus: IThunkAPIStatus;
  getCommentOnPostSuccess: string;
  getCommentOnPostError: string;

  getSinglePostStatus: IThunkAPIStatus;
  getSinglePostSuccess: string;
  getSinglePostError: string;

  getJobsStatus: IThunkAPIStatus;
  getJobsSuccess: string;
  getJobsError: string;

  unlikePostStatus: IThunkAPIStatus;
  unlikePostSuccess: string;
  unlikePostError: string;

  getPostFeedStatus: IThunkAPIStatus;
  getPostFeedSuccess: string;
  getPostFeedError: string;

  reactToPostStatus: IThunkAPIStatus;
  reactToPostSuccess: string;
  reactToPostError: string;

  postFeeds: IPostFeed[];

  postComments: IPostCommentFeed[];

  createJobStatus: IThunkAPIStatus;
  createJobSuccess: string;
  createJobError: string;

  createJobDTO: ICreateJobDTO | null;

  postDetail: IPostFeed | null;

  showReactionView: boolean;

  postReacted: IPostFeed | null;

  jobs: IJobDTO[];
}

const initialState: IPostState = {
  createPostDTO: {
    content: "",
    image: [],
  },
  createPostStatus: "idle",
  createPostSuccess: "",
  createPostError: "",

  likePostStatus: "idle",
  likePostSuccess: "",
  likePostError: "",

  commentOnPostStatus: "idle",
  commentOnPostSuccess: "",
  commentOnPostError: "",

  commentOnCommentStatus: "idle",
  commentOnCommentSuccess: "",
  commentOnCommentError: "",

  getCommentOnPostStatus: "idle",
  getCommentOnPostSuccess: "",
  getCommentOnPostError: "",

  getSinglePostStatus: "idle",
  getSinglePostSuccess: "",
  getSinglePostError: "",

  getJobsStatus: "idle",
  getJobsSuccess: "",
  getJobsError: "",

  unlikePostStatus: "idle",
  unlikePostSuccess: "",
  unlikePostError: "",

  reactToPostStatus: "idle",
  reactToPostSuccess: "",
  reactToPostError: "",

  getPostFeedStatus: "idle",
  getPostFeedSuccess: "",
  getPostFeedError: "",

  postFeeds: [],

  createJobStatus: "idle",
  createJobSuccess: "",
  createJobError: "",

  createJobDTO: null,

  postComments: [],

  postDetail: null,

  showReactionView: false,

  postReacted: null,

  jobs: [],
};

const PostSlice = createSlice({
  name: "post-slice",
  initialState,
  reducers: {
    showReactionView(
      state: IPostState,
      action: PayloadAction<{ post: IPostFeed | null; show: boolean }>
    ) {
      state.showReactionView = action.payload.show;
      state.postReacted = action.payload.post;
    },
    clearCreatePostStatus(state: IPostState) {
      state.createPostStatus = "idle";
      state.createPostSuccess = "";
      state.createPostError = "";
    },

    clearPostRactionStatus(state: IPostState) {
      state.reactToPostStatus = "idle";
      state.reactToPostSuccess = "";
      state.reactToPostSuccess = "";
    },

    clearCreateJobStatus(state: IPostState) {
      state.createJobStatus = "idle";
      state.createJobSuccess = "";
      state.createJobError = "";
    },

    clearCreateCommentOnPostState(state: IPostState) {
      state.commentOnPostStatus = "idle";
      state.commentOnPostError = "";
      state.commentOnPostSuccess = "";
    },
    savePostDetail(state: IPostState, action: PayloadAction<IPostFeed>) {
      state.postDetail = action.payload;
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
      console.log("action.payload?.messag> ", action.payload?.message);
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

    builder.addCase(likePostAction.pending, (state) => {
      state.likePostStatus = "loading";
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.likePostStatus = "completed";
      state.likePostSuccess = action.payload?.message;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.likePostStatus = "failed";
      state.likePostError = action.payload?.message as string;
    });

    builder.addCase(unlikePostAction.pending, (state) => {
      state.unlikePostStatus = "loading";
    });
    builder.addCase(unlikePostAction.fulfilled, (state, action) => {
      state.unlikePostStatus = "completed";
      state.unlikePostSuccess = action.payload?.message;
    });
    builder.addCase(unlikePostAction.rejected, (state, action) => {
      state.unlikePostStatus = "failed";
      state.unlikePostError = action.payload?.message as string;
    });

    builder.addCase(commentOnPostAction.pending, (state) => {
      state.commentOnPostStatus = "loading";
    });
    builder.addCase(commentOnPostAction.fulfilled, (state, action) => {
      state.commentOnPostStatus = "completed";
      state.commentOnPostSuccess = action.payload?.message;
    });
    builder.addCase(commentOnPostAction.rejected, (state, action) => {
      state.commentOnPostStatus = "failed";
      state.commentOnPostError = action.payload?.message as string;
    });

    builder.addCase(getCommentsOnPostAction.pending, (state) => {
      state.getCommentOnPostStatus = "loading";
    });
    builder.addCase(getCommentsOnPostAction.fulfilled, (state, action) => {
      state.getCommentOnPostStatus = "completed";
      state.postComments = action.payload.data;
      state.getCommentOnPostSuccess = action.payload?.message;
    });
    builder.addCase(getCommentsOnPostAction.rejected, (state, action) => {
      state.getCommentOnPostStatus = "failed";
      state.getCommentOnPostError = action.payload?.message as string;
    });

    builder.addCase(commentOnCommentAction.pending, (state) => {
      state.commentOnCommentStatus = "loading";
    });
    builder.addCase(commentOnCommentAction.fulfilled, (state, action) => {
      state.commentOnCommentStatus = "completed";

      state.commentOnCommentSuccess = action.payload?.message;
    });
    builder.addCase(commentOnCommentAction.rejected, (state, action) => {
      state.commentOnCommentStatus = "failed";
      state.commentOnCommentError = action.payload?.message as string;
    });

    builder.addCase(reactToPostAction.pending, (state) => {
      state.reactToPostStatus = "loading";
    });
    builder.addCase(reactToPostAction.fulfilled, (state, action) => {
      state.reactToPostStatus = "completed";
    });
    builder.addCase(reactToPostAction.rejected, (state, action) => {
      state.reactToPostStatus = "failed";
      state.reactToPostError = action.payload?.message as string;
    });

    builder.addCase(getPostFeedByIdAction.pending, (state) => {
      state.getSinglePostStatus = "loading";
    });
    builder.addCase(getPostFeedByIdAction.fulfilled, (state, action) => {
      state.getSinglePostStatus = "completed";
      state.postDetail = action.payload.data;
    });
    builder.addCase(getPostFeedByIdAction.rejected, (state, action) => {
      state.getSinglePostStatus = "failed";
      state.getSinglePostError = action.payload?.message as string;
    });

    builder.addCase(getJobsAction.pending, (state) => {
      state.getJobsStatus = "loading";
    });
    builder.addCase(getJobsAction.fulfilled, (state, action) => {
      state.getJobsStatus = "completed";
      state.jobs = action.payload.data;
    });
    builder.addCase(getJobsAction.rejected, (state, action) => {
      state.getJobsStatus = "failed";
      state.getJobsError = action.payload?.message as string;
    });
  },
});

export const {
  clearCreatePostStatus,
  clearCreateJobStatus,
  clearCreateCommentOnPostState,
  savePostDetail,
  showReactionView,
  clearPostRactionStatus,
} = PostSlice.actions;

export default PostSlice.reducer;
