import {
  ApiResponseSuccess,
  FilePickerFormat,
  IChangePasswordDTO,
  ILogin,
  IRefreshTokenResponse,
  IRequestOTPEmail,
  IRequestOTPPhone,
  ISignUp,
  IUserData,
  IUserProfileData,
  IVerifyOtpPaylod,
  IVerifyPhoneEmailOTP,
} from "@app-model";
import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import { network } from "../config/network.config";
import { AxiosResponse } from "axios";
import axiosClient, { axioxRefreshClient } from "../config/axiosClient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Converter from "../utils/Converters";
import { DocumentResult } from "expo-document-picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../constants";
import { persistor } from "../store/store";
import { Platform } from "react-native";
import reportError from "../utils/reportError";
import { Image } from "react-native-compressor";
import { err } from "react-native-svg/lib/typescript/xml";

const SIGN_IN = "authentication:SIGN_IN";
const REFRSH_TOKEN = "authentication:REFRSH_TOKEN";
const SIGN_OUT = "authentication:SIGN_OUT";
const SIGNUP = "authentication:SIGNUP";
const VERIFY_OTP = "authentication:VERIFY_OTP";
const COMPLETE_PROFILE = "authentication:COMPLETE_PROFILE";
const REQUEST_OTP_EMAIL = "authentication:REQUEST_OTP_EMAIL";
const REQUEST_OTP_PHONE = "authentication:REQUEST_OTP_PHONE";
const CHANGE_PASSWORD_OTP = "authentication:CHANGE_PASSWORD_OTP";
const VERIFY_PHONE_EMAIL_OTP = "authentication:VERIFY_PHONE_EMAIL_OTP";
const STORE_OTP_CHANNEL_VALUE = "authentication:STORE_OTP_CHANNEL_VALUE";
const GET_CURRENT_USER = "authentication:GET_CURRENT_USER";

export const loginUserActionAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  ILogin
>(SIGN_IN, async (agrs: ILogin) => {
  const response = await axiosClient.post<AxiosResponse<IUserData>>(
    "/api/auth/login",
    agrs
  );

  console.log(response.data);

  return response.data;
});

export const refreshTokenAction = asyncThunkWrapper<
  ApiResponseSuccess<IRefreshTokenResponse>,
  string
>(REFRSH_TOKEN, async (token) => {
  try {
    const response = await axioxRefreshClient.post<
      AxiosResponse<IRefreshTokenResponse>
    >(
      "/api/auth/refresh_token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const storeOTPChannelValueAction = asyncThunkWrapper<string, string>(
  STORE_OTP_CHANNEL_VALUE,
  async (agrs: string) => {
    return agrs;
  }
);

export const signupUserActionAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ISignUp
>(SIGNUP, async (agrs: ISignUp) => {
  console.log("args> ", agrs);
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/auth/sign-up",
    agrs
  );

  return response.data;
});

export const verifyOTPActionAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  IVerifyOtpPaylod
>(VERIFY_OTP, async (agrs: IVerifyOtpPaylod) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/auth/verify-phone",
    agrs
  );

  return response.data;
});

export const requestOTPEmailAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IRequestOTPEmail
>(REQUEST_OTP_EMAIL, async (agrs: IRequestOTPEmail) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/auth/forgot-password",
    agrs
  );

  return response.data;
});

export const requestOTPPhoneAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IRequestOTPPhone
>(REQUEST_OTP_PHONE, async (agrs: IRequestOTPPhone) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/auth/forgot-password",
    agrs
  );

  return response.data;
});

export const changePasswordAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IChangePasswordDTO
>(CHANGE_PASSWORD_OTP, async (agrs: IChangePasswordDTO) => {
  const response = await axiosClient.patch<AxiosResponse<any>>(
    "/api/auth/change-password",
    agrs
  );

  return response.data;
});

export const getCurrentUserAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  void
>(GET_CURRENT_USER, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>(
    "/api/users/current"
  );

  return response.data;
});

export const verifyOTPOnChangePasswordAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IVerifyPhoneEmailOTP
>(VERIFY_PHONE_EMAIL_OTP, async (agrs: IVerifyPhoneEmailOTP) => {
  console.log("valled to verify otp ", agrs);
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/auth/verify-otp",
    agrs
  );

  return response.data;
});

export const completeUserProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IUserProfileData
>(COMPLETE_PROFILE, async (agrs: IUserProfileData) => {
  try {
    console.log("args> ", agrs);
    const profilePictureFile =
      agrs.profilePicture as ImagePicker.ImagePickerResult;

    const resumeFile = agrs.personalInformation.resume as FilePickerFormat;

    const certificateFile = agrs.certificates as FilePickerFormat[];

    let profileResponseUrl = "";
    let certificateFileUrl = "";
    let resumeUrl = "";

    if (
      profilePictureFile &&
      profilePictureFile.assets &&
      profilePictureFile.assets[0].uri
    ) {
      console.log(">>>>>>1");
      const profileImageBlob = Converter.dataURItoBlob(
        profilePictureFile?.assets ? profilePictureFile.assets[0].uri : ""
      );
      const formData = new FormData() as any;

      const file = new File([profileImageBlob], "file");

      const result = await Image.compress(profilePictureFile.assets[0].uri, {
        maxWidth: 1000,
        quality: 0.8,
      });

      formData.append("file", {
        uri: result,
        type: profilePictureFile.assets[0].type,
        name: profilePictureFile.assets[0].fileName,
      });
      const response = await uploadFile(formData);

      profileResponseUrl = response.data?.data?.url || "";
    }

    if (certificateFile && certificateFile[0].uri) {
      console.log(">>>>2");

      const formData = new FormData() as any;
      formData.append("file", {
        uri: certificateFile[0].uri,
        type: certificateFile[0].type,
        name: certificateFile[0].name,
      });

      const response = await uploadFile(formData);
      certificateFileUrl = response.data?.data?.url || "";
    }

    if (resumeFile && resumeFile.uri) {
      const formData = new FormData() as any;
      formData.append("file", {
        uri: resumeFile.uri,
        type: resumeFile.type,
        name: resumeFile.name,
      });

      const response = await uploadFile(formData);
      resumeUrl = response.data?.data?.url || "";
    }

    console.log("data> ", {
      firstName: agrs.personalInformation.firstName,
      lastName: agrs.personalInformation.lastName,
      country: agrs.personalInformation.country,
      city: agrs.personalInformation.city,
      countryOfOrigin: agrs.personalInformation.countryOfOrigin,
      resume: resumeUrl,
      bio: agrs.personalInformation.bio,
      experience: [
        {
          startDate: agrs.experience[0]?.startDate,
          endDate: agrs.experience[0]?.endDate,
          "stillWorkHere?": agrs.experience[0]?.stillWorkHere,
          jobTitle: agrs.experience[0]?.jobTitle,
          companyName: agrs.experience[0]?.companyName,
          responsibilities: agrs.experience[0]?.responsibilities,
        },
      ],
      education: [
        {
          startDate: agrs.education[0]?.startDate,
          endDate: agrs.education[0]?.endDate,
          degree: agrs.education[0]?.degree,
          school: agrs.education[0]?.school,
        },
      ],
      skills: agrs.skills,
      certificates: [{ name: "Certificate", url: certificateFileUrl }],
      profilePicture: profileResponseUrl,
    });

    const response = await axiosClient.patch<AxiosResponse<any>>(
      "/api/auth/complete-registration",
      {
        firstName: agrs.personalInformation.firstName,
        lastName: agrs.personalInformation.lastName,
        country: agrs.personalInformation.country,
        city: agrs.personalInformation.city,
        countryOfOrigin: agrs.personalInformation.countryOfOrigin,
        resume: resumeUrl,
        bio: agrs.personalInformation.bio,
        experience: [
          {
            startDate: agrs.experience[0]?.startDate,
            endDate: agrs.experience[0]?.endDate,
            "stillWorkHere?": agrs.experience[0]?.stillWorkHere,
            jobTitle: agrs.experience[0]?.jobTitle,
            companyName: agrs.experience[0]?.companyName,
            responsibilities: agrs.experience[0]?.responsibilities,
          },
        ],
        education: [
          {
            startDate: agrs.education[0]?.startDate,
            endDate: agrs.education[0]?.endDate,
            degree: agrs.education[0]?.degree,
            school: agrs.education[0]?.school,
          },
        ],
        skills: agrs.skills,
        certificates: [{ name: "Certificate", url: certificateFileUrl }],
        profilePicture: profileResponseUrl,
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("error> ", error?.response || error);
    throw new Error(error?.message || error);
  }
});

export const uploadFile = async (payload: FormData) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    "/api/file-upload",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const logoutAction = asyncThunkWrapper<any, void>(SIGN_OUT, async () => {
  await persistor.purge();
  await persistor.flush();
  await persistor.persist();
  return {};
});
