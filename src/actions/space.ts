import { AxiosResponse } from 'axios';
import axiosClient from '../config/axiosClient';
import asyncThunkWrapper from '../helpers/asyncThunkWrapper';
import {
  ApiResponseSuccess,
  ICreateSpaceRequestDTO,
  ISpaceList,
} from '@app-model';
import { uploadFile } from './auth';

const CREATE_SPACE = 'space:CREATE_SPACE';
const GET_CURRENT_USER_SPACE = 'space:GET_CURRENT_USER_SPACE';
const GET_SPACE_LIST = 'space:GET_SPACE_LIST';
const FOLLOW_SPACE = 'space:FOLLOW_SPACE';

export const createSpaceAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ICreateSpaceRequestDTO
>(CREATE_SPACE, async (agrs: ICreateSpaceRequestDTO) => {
  let photoUrl = '';

  if (agrs.photo && agrs.photo.assets && agrs.photo.assets[0].uri) {
    const formData = new FormData() as any;

    formData.append('file', {
      uri: agrs.photo.assets[0].uri,
      type: agrs.photo.assets[0].type,
      name: agrs.photo.assets[0].fileName,
    });
    uploadFile(formData)
      .then((response) => {
        photoUrl = response.data?.data?.url || '';
      })
      .catch((error) => {
        // reportError(error);
      });
  }
  const response = await axiosClient.post<AxiosResponse<any>>('/api/space', {
    ...agrs,
    profilePicture: photoUrl,
  });

  return response.data;
});

export const getSpaceListAction = asyncThunkWrapper<
  ApiResponseSuccess<ISpaceList[]>,
  void
>(GET_SPACE_LIST, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    '/api/space?page=1&limit=1000',
  );
  return response.data;
});

export const getCurrentUserSpace = asyncThunkWrapper<
  ApiResponseSuccess<ISpaceList[]>,
  void
>(GET_CURRENT_USER_SPACE, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>('/api/space/me');
  return response.data;
});

export const followSpaceAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  string
>(FOLLOW_SPACE, async (spaceId: string) => {
  const response = await axiosClient.patch<AxiosResponse<any>>(
    `/api/space/follow/${spaceId}`,
  );
  return response.data;
});
