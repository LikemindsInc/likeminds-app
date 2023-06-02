import { AxiosResponse } from "axios";
import axiosClient from "../config/axiosClient";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { ApiResponseSuccess, ICreateSpaceRequestDTO } from "@app-model";
import { uploadFile } from "./auth";

const CREATE_SPACE = "space:CREATE_SPACE";

export const createSpaceAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICreateSpaceRequestDTO
>(CREATE_SPACE, async (agrs: ICreateSpaceRequestDTO) => {
  let photoUrl = "";

  if (agrs.photo && agrs.photo.assets && agrs.photo.assets[0].uri) {
    const formData = new FormData() as any;

    formData.append("file", {
      uri: agrs.photo.assets[0].uri,
      type: agrs.photo.assets[0].type,
      name: agrs.photo.assets[0].fileName,
    });
    uploadFile(formData)
      .then((response) => {
        photoUrl = response.data?.data?.url || "";
      })
      .catch((error) => {
        console.log("error> ", error?.response || error);
        // reportError(error);
      });
  }
  const response = await axiosClient.post<AxiosResponse<any>>("/api/space", {
    ...agrs,
    profilePicture: photoUrl,
  });

  return response.data;
});
