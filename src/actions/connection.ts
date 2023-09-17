import {
  ApiResponseSuccess,
  IConnectionReceivedDTO,
  ISearchDTO,
  IUserData,
} from "@app-model";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import axiosClient from "../config/axiosClient";
import { AxiosResponse } from "axios";

export const GET_USERS = "users:GET_USERS";
export const GET_USERS_BY_SCHOOL = "users:GET_USERS_BY_SCHOOL";
export const GET_USERS_BY_INDUSTRY = "users:GET_USERS_BY_INDUSTRY";
export const GET_USERS_BY_SUGGESTIONS = "users:GET_USERS_BY_SUGGESTIONS";
export const REQUESTS_CONNECTIONS = "connection:REQUESTS_CONNECTIONS";
export const CONNECTION_STATUS = "connection:CONNECTION_STATUS";
export const UNDO_CONNECTION_REQUEST = "connection:UNDO_CONNECTION_REQUEST";
export const GET_CONNECTION_REQUESTS = "connection:GET_CONNECTION_REQUESTS";
export const GET_SINGLE_USER = "connection:GET_SINGLE_USER";
export const RESPOND_TO_CONNECTION = "connection:RESPOND_TO_CONNECTION";

export const getUsers = asyncThunkWrapper<
  ApiResponseSuccess<IUserData[]>,
  ISearchDTO | void
>(GET_USERS, async (data: ISearchDTO | void) => {
  let url = "/api/users?page=1&limit=1000";
  const txData = { search: data?.search } as any;
  if (txData) {
    Object.keys(txData).forEach((key: any) => {
      if (!txData[key] && txData[key].trim() === "") return;

      url += `&${key}=${txData[key]}`;
    });
  }
  const response = await axiosClient.get<AxiosResponse<any>>(url);
  return response.data;
});

export const getUserRecommendationBySchool = asyncThunkWrapper<
  ApiResponseSuccess<IUserData[]>,
  ISearchDTO | void
>(GET_USERS_BY_SCHOOL, async (data: ISearchDTO | void) => {
  let url = "/api/users/schools?page=1&limit=1000";
  const txData = { search: data?.search } as any;
  if (txData) {
    Object.keys(txData).forEach((key: any) => {
      if (!txData[key] && txData[key]?.trim() === "") return;

      url += `&${key}=${txData[key]}`;
    });
  }
  const response = await axiosClient.get<AxiosResponse<any>>(url);
  return response.data;
});

export const getUserRecommendationByIndustry = asyncThunkWrapper<
  ApiResponseSuccess<IUserData[]>,
  ISearchDTO | void
>(GET_USERS_BY_INDUSTRY, async (data: ISearchDTO | void) => {
  let url = "/api/users/companies?page=1&limit=1000";
  const txData = { search: data?.search } as any;
  if (txData) {
    Object.keys(txData).forEach((key: any) => {
      if (!txData[key] && txData[key].trim() === "") return;

      url += `&${key}=${txData[key]}`;
    });
  }
  const response = await axiosClient.get<AxiosResponse<any>>(url);
  return response.data;
});

export const getUsersBySuggestion = asyncThunkWrapper<
  ApiResponseSuccess<IUserData[]>,
  ISearchDTO | void
>(GET_USERS_BY_SUGGESTIONS, async (data: ISearchDTO | void) => {
  let url = "/api/users/suggestions?page=1&limit=1000";
  const txData = { search: data?.search } as any;
  if (txData) {
    Object.keys(txData).forEach((key: any) => {
      if (!txData[key] && txData[key]?.trim() === "") return;

      url += `&${key}=${txData[key]}`;
    });
  }
  const response = await axiosClient.get<AxiosResponse<any>>(url);
  return response.data;
});

export const requestConnection = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  string
>(REQUESTS_CONNECTIONS, async (data) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    `/api/connect/${data}/follow`
  );
  return response.data;
});

export const getRequestConnectionStatus = asyncThunkWrapper<
  ApiResponseSuccess<{ status: string; id: string }>,
  string
>(CONNECTION_STATUS, async (data) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/connect/status/${data}`
  );
  return response.data;
});

export const undoConnectionRequest = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  string
>(UNDO_CONNECTION_REQUEST, async (data) => {
  const response = await axiosClient.patch<AxiosResponse<any>>(
    `/api/connect/${data}`
  );
  return response.data;
});

export const getConnections = asyncThunkWrapper<
  ApiResponseSuccess<IConnectionReceivedDTO[]>,
  void
>(GET_CONNECTION_REQUESTS, async (data) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/connect/me/received-request`
  );
  return response.data;
});

export const getSingleUserAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  string
>(GET_SINGLE_USER, async (data) => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    `/api/users/${data}`
  );
  return response.data;
});

export const acceptConnectionRequestAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  { connectionId: string; status: string }
>(RESPOND_TO_CONNECTION, async (data) => {
  const response = await axiosClient.put<AxiosResponse<any>>(
    `/api/connect/response/${data.connectionId}`,
    {
      status: data.status,
    }
  );
  return response.data;
});
