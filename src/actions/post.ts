import { AxiosResponse } from "axios";
import axiosClient from "../config/axiosClient";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import {
  ApiResponseSuccess,
  ICreateJobDTO,
  ICreatePostDTO,
  IPostFeed,
} from "@app-model";
import { uploadFile } from "./auth";

const CREATE_POST = "post:CREATE_POST";
const GET_POST_FEED = "post:GET_POST_FEED";
const CREATE_JOB = "job:CREATE_JOB";
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

export const createJobAction = asyncThunkWrapper<
  ApiResponseSuccess<IPostFeed[]>,
  ICreateJobDTO
>(CREATE_JOB, async (args: ICreateJobDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>("/api/job", args);

  return response.data;
});
