import { AxiosResponse } from "axios";
import axiosClient from "../config/axiosClient";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import {
  ApiResponseSuccess,
  ICommentOnCommentDTO,
  ICommentOnPostDTO,
  ICreateJobDTO,
  ICreatePostDTO,
  IGetJobDTO,
  IJobDTO,
  IPostCommentFeed,
  IPostFeed,
  IPostReaction,
  IReactionToPostDTO,
} from "@app-model";
import { uploadFile } from "./auth";

const CREATE_POST = "post:CREATE_POST";
const COMMENT_ON_POST = "post:COMMENT_ON_POST";
const COMMENT_ON_COMMENT = "post:COMMENT_ON_COMMENT";
const GET_COMMENT_ON_POST = "post:GET_COMMENT_ON_POST";
const UNLIKE_POST = "post:UNLIKE_POST";
const REACTION_TO_POST = "post:REACTION_TO_POST";
const LIKE_POST = "post:LIKE_POST";
const GET_USER_POST_FEED = "post:GET_USER_POST_FEED";
const GET_POST_FEED_REACTIONS = "post:GET_POST_FEED_REACTIONS";

const GET_POST_FEED = "post:GET_POST_FEED";
const GET_SINGLE_POST_FEED = "post:GET_SINGLE_POST_FEED";
const CREATE_JOB = "job:CREATE_JOB";
const GET_JOBS = "job:GET_JOBS";

import { Image } from "react-native-compressor";

export const createPostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICreatePostDTO
>(CREATE_POST, async (agrs: ICreatePostDTO) => {
  const imageAssets = agrs.image || [];
  const images = [];
  for (let i = 0; i < imageAssets.length; i++) {
    const result = await Image.compress(imageAssets[i].uri, {
      maxWidth: 1000,
      quality: 0.8,
    });

    console.log("result of compressing> ", result);
    const formData = new FormData() as any;
    formData.append("file", {
      uri: result,
      type: imageAssets[i].type,
      name: imageAssets[i].fileName,
    });

    const response = await uploadFile(formData);

    const imageUrl = response.data?.data?.url || "";

    images.push(imageUrl);
  }
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/post/create",
    {
      content: agrs.content,
      images,
    }
  );

  return response.data;
});

export const getPostFeedAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostFeed[]>,
  void
>(GET_POST_FEED, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    "/api/post/feeds?page=1&limit=1000"
  );
  return response.data;
});

export const getPostReactions = asyncThunkWrapper<
  ApiResponseSuccess<IPostReaction[]>,
  string
>(GET_POST_FEED_REACTIONS, async (id) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/post/reaction/${id}`
  );
  return response.data;
});

export const getCurrentUserFeedAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostFeed[]>,
  void
>(GET_USER_POST_FEED, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    "/api/post/me/feeds?page=1&limit=1000"
  );
  return response.data;
});

export const getJobsAction = asyncThunkWrapper<
  ApiResponseSuccess<IJobDTO[]>,
  IGetJobDTO | void
>(GET_JOBS, async (data: any) => {
  let url = "/api/job?page=1&limit=1000";

  if (data) {
    Object.keys(data).forEach((key) => {
      if (!data[key] && data[key].trim() === "") return;

      url += `&${key}=${data[key]}`;
    });
  }
  console.log(url);
  const response = await axiosClient.get<AxiosResponse<any>>(url);
  return response.data;
});

export const createJobAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostFeed[]>,
  ICreateJobDTO
>(CREATE_JOB, async (args: ICreateJobDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>("/api/job", args);

  return response.data;
});

export const getPostFeedByIdAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostFeed>,
  string
>(GET_SINGLE_POST_FEED, async (postId) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/post/feeds/${postId}`
  );
  return response.data;
});

export const likePostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  string
>(LIKE_POST, async (args: string) => {
  console.log("called to like a post> ", args);
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/post/${args}/like`,
    {}
  );

  return response.data;
});

export const unlikePostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  string
>(UNLIKE_POST, async (args: string) => {
  console.log("called to unklike a post> ", args);
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/post/${args}/unlike`,
    {}
  );

  return response.data;
});

export const reactToPostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IReactionToPostDTO
>(REACTION_TO_POST, async (args: IReactionToPostDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/post/reaction/${args.postId}`,
    {
      reaction: args.reaction,
    }
  );

  return response.data;
});

export const commentOnPostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICommentOnPostDTO
>(COMMENT_ON_POST, async (args: ICommentOnPostDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/comment/${args.postId}`,
    {
      comment: args.comment,
    }
  );

  return response.data;
});

export const getCommentsOnPostAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostCommentFeed[]>,
  string
>(GET_COMMENT_ON_POST, async (args: string) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/comment/${args}`
  );

  return response.data;
});

export const commentOnCommentAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICommentOnCommentDTO
>(COMMENT_ON_COMMENT, async (args: ICommentOnCommentDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/comment/${args.postId}/${args.commentId}`,
    {
      comment: args.comment,
    }
  );

  return response.data;
});
