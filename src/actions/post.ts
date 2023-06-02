import { AxiosResponse } from "axios";
import axiosClient from "../config/axiosClient";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { ApiResponseSuccess, ICreatePostDTO } from "@app-model";

const CREATE_POST = "post:CREATE_POST";

export const createPostAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICreatePostDTO
>(CREATE_POST, async (agrs: ICreatePostDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/post/create",
    agrs
  );

  console.log(response.data);

  return response.data;
});
