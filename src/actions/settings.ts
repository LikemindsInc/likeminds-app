import { ApiResponseSuccess, ICountry } from "@app-model";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { AxiosResponse } from "axios";
import axiosClient from "../config/axiosClient";

const GET_COUNTRIES = "authentication:GET_COUNTRIES";

export const getCountriesAction = asyncThunkWrapper<
  ApiResponseSuccess<ICountry[]>,
  any
>(GET_COUNTRIES, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>("/api/countries");

  return response.data?.data as ICountry[];
});
