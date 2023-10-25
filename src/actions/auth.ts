import {
  ApiResponseSuccess,
  FilePickerFormat,
  IChangePasswordDTO,
  ILogin,
  IRefreshTokenResponse,
  IRequestOTPEmail,
  IRequestOTPPhone,
  ISchool,
  ISignUp,
  IUserData,
  IUserProfileData,
  IVerifyOtpPaylod,
  IVerifyPhoneEmailOTP,
  Industry,
  ResendOTPDTO,
} from '@app-model';
import asyncThunkWrapper from '../helpers/asyncThunkWrapper';
import { AxiosResponse } from 'axios';
import axiosClient, { axioxRefreshClient } from '../config/axiosClient';
import * as ImagePicker from 'expo-image-picker';
import Converter from '../utils/Converters';
import { persistor, store } from '../store/store';
import { Image } from 'react-native-compressor';

const SIGN_IN = 'authentication:SIGN_IN';
const REFRSH_TOKEN = 'authentication:REFRSH_TOKEN';
const SIGN_OUT = 'authentication:SIGN_OUT';
const SIGNUP = 'authentication:SIGNUP';
const RESEND_OTP = 'authentication:RESEND_OTP';
const VERIFY_OTP = 'authentication:VERIFY_OTP';
const COMPLETE_PROFILE = 'authentication:COMPLETE_PROFILE';
const REQUEST_OTP_EMAIL = 'authentication:REQUEST_OTP_EMAIL';
const REQUEST_OTP_PHONE = 'authentication:REQUEST_OTP_PHONE';
const CHANGE_PASSWORD_OTP = 'authentication:CHANGE_PASSWORD_OTP';
const VERIFY_PHONE_EMAIL_OTP = 'authentication:VERIFY_PHONE_EMAIL_OTP';
const STORE_OTP_CHANNEL_VALUE = 'authentication:STORE_OTP_CHANNEL_VALUE';
const GET_CURRENT_USER = 'authentication:GET_CURRENT_USER';
const COMPLETE_EDUCATION_PROFILE = 'profile:COMPLETE_EDUCATION_PROFILE';
const COMPLETE_EXPERIENCE_PROFILE = 'profile:COMPLETE_EXPERIENCE_PROFILE';
const COMPLETE_SKILLS_PROFILE = 'profile:COMPLETE_SKILLS_PROFILE';
const COMPLETE_CERTIFICATE_PROFILE = 'profile:COMPLETE_CERTIFICATE_PROFILE';
const UPDATE_PERSONAL_INFORMATION = 'profile:UPDATE_PERSONAL_INFORMATION';
const UPDATE_PROFILE_PICTURE = 'profile:UPDATE_PROFILE_PICTURE';

const GET_INDUSTRY = 'authentication:GET_INDUSTRY';
const GET_SCHOOLS = 'authentication:GET_SCHOOLS';

export const loginUserActionAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  ILogin
>(SIGN_IN, async (agrs: ILogin) => {
  const response = await axiosClient.post<AxiosResponse<IUserData>>(
    '/api/auth/login',
    agrs,
  );

  return response.data;
});

export const resendOTPAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ResendOTPDTO
>(RESEND_OTP, async (agrs: ResendOTPDTO) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/resend-otp',
    agrs,
  );

  return response.data;
});

export const getAllIndustriesAction = asyncThunkWrapper<
  ApiResponseSuccess<Industry[]>,
  void
>(GET_INDUSTRY, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>('/api/industries');

  return response.data;
});

export const getAllSchoolAction = asyncThunkWrapper<
  ApiResponseSuccess<ISchool[]>,
  void
>(GET_SCHOOLS, async () => {
  const response = await axiosClient.get<AxiosResponse<any>>('/api/schools');

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
      '/api/auth/refresh_token',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
  },
);

export const signupUserActionAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  ISignUp
>(SIGNUP, async (agrs: ISignUp) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/sign-up',
    agrs,
  );
  return response.data;
});

export const verifyOTPActionAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  IVerifyOtpPaylod
>(VERIFY_OTP, async (agrs: IVerifyOtpPaylod) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/verify-phone',
    agrs,
  );

  return response.data;
});

export const requestOTPEmailAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IRequestOTPEmail
>(REQUEST_OTP_EMAIL, async (agrs: IRequestOTPEmail) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/forgot-password',
    agrs,
  );

  return response.data;
});

export const requestOTPPhoneAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IRequestOTPPhone
>(REQUEST_OTP_PHONE, async (agrs: IRequestOTPPhone) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/forgot-password',
    agrs,
  );

  return response.data;
});

export const changePasswordAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IChangePasswordDTO
>(CHANGE_PASSWORD_OTP, async (agrs: IChangePasswordDTO) => {
  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/change-password',
    agrs,
  );

  return response.data;
});

export const getCurrentUserAction = asyncThunkWrapper<
  ApiResponseSuccess<IUserData>,
  void
>(GET_CURRENT_USER, async () => {
  const response =
    await axiosClient.get<AxiosResponse<any>>('/api/users/current');

  return response.data;
});

export const verifyOTPOnChangePasswordAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IVerifyPhoneEmailOTP
>(VERIFY_PHONE_EMAIL_OTP, async (agrs: IVerifyPhoneEmailOTP) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/auth/verify-otp',
    agrs,
  );

  return response.data;
});

export const updateEducationProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  void
>(COMPLETE_EDUCATION_PROFILE, async () => {
  const education = store.getState().sessionReducer.profileData.education || [];
  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      education: education,
    },
  );

  return response.data;
});

export const updateExperienceProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  void
>(COMPLETE_EXPERIENCE_PROFILE, async () => {
  const experiences =
    store.getState().sessionReducer.profileData.experience || [];
  console.log('experiences> ', experiences);
  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      experience: experiences,
    },
  );

  return response.data;
});

export const updateSkillsProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  void
>(COMPLETE_SKILLS_PROFILE, async () => {
  const skills = store.getState().sessionReducer.profileData.skills;
  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      skills: skills,
    },
  );

  return response.data;
});

export const updatePersonalInformationAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IUserProfileData
>(UPDATE_PERSONAL_INFORMATION, async (args: IUserProfileData) => {
  const resumeFile =
    (args.personalInformation?.resume as FilePickerFormat) || {};
  let resumeUrl = '';
  if (resumeFile && resumeFile.uri) {
    const formData = new FormData() as any;
    formData.append('file', {
      uri: resumeFile.uri,
      type: resumeFile.type,
      name: resumeFile.name,
    });

    const response = await uploadFile(formData);
    resumeUrl = response.data?.data?.url || '';
  }

  const info = store.getState().sessionReducer.profileData.personalInformation;

  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      firstName: info?.firstName,
      lastName: info?.lastName,
      country: info?.country,
      city: info?.city,
      countryOfOrigin: info?.countryOfOrigin,
      resume: resumeUrl,
      bio: info?.bio,
    },
  );

  return response.data;
});

export const updateUserProfilePictureAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IUserProfileData
>(UPDATE_PROFILE_PICTURE, async (args: IUserProfileData) => {
  const profilePictureFile =
    store.getState().sessionReducer.profileData.profilePicture ||
    Object.create(null);

  let profileResponseUrl = '';

  if (
    profilePictureFile &&
    profilePictureFile.assets &&
    profilePictureFile.assets[0].uri
  ) {
    const formData = new FormData() as any;

    const result = await Image.compress(profilePictureFile.assets[0].uri, {
      maxWidth: 1000,
      quality: 0.8,
    });

    formData.append('file', {
      uri: result,
      type: profilePictureFile.assets[0].type || 'png',
      name: profilePictureFile.assets[0].fileName || 'picture',
    });
    const response = await uploadFile(formData);

    profileResponseUrl = response.data?.data?.url || '';
  }

  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      profilePicture: profileResponseUrl,
    },
  );

  return response.data;
});

export const updateCertificateProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IUserProfileData
>(COMPLETE_CERTIFICATE_PROFILE, async (agrs: IUserProfileData) => {
  const certificateFile =
    store.getState().sessionReducer.profileData.certificates || [];
  let certificateFileUrl = '';

  const certificates: { name: string; url: string }[] = [];

  for (const item of certificateFile) {
    if (item.file) {
      const formData = new FormData() as any;
      formData.append('file', {
        uri: item.file.uri,
        type: item.file.type,
        name: item.file.name,
      });

      const response = await uploadFile(formData);
      certificateFileUrl = response.data?.data?.url || '';

      certificates.push({ name: item.name, url: certificateFileUrl });
    }
  }

  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      certificates: certificates,
    },
  );

  return response.data;
});

export const completeUserProfileAction = asyncThunkWrapper<
  ApiResponseSuccess<any>,
  IUserProfileData
>(COMPLETE_PROFILE, async (agrs: IUserProfileData) => {
  const profilePictureFile =
    agrs.profilePicture as ImagePicker.ImagePickerResult;

  const resumeFile =
    (agrs.personalInformation?.resume as FilePickerFormat) || {};

  const certificateFile =
    store.getState().sessionReducer.profileData.certificates || [];

  let certificateFileUrl = '';

  let profileResponseUrl = '';
  let resumeUrl = '';

  if (
    profilePictureFile &&
    profilePictureFile.assets &&
    profilePictureFile.assets[0].uri
  ) {
    const profileImageBlob = Converter.dataURItoBlob(
      profilePictureFile?.assets ? profilePictureFile.assets[0].uri : '',
    );
    const formData = new FormData() as any;

    const result = await Image.compress(profilePictureFile.assets[0].uri, {
      maxWidth: 1000,
      quality: 0.8,
    });

    formData.append('file', {
      uri: result,
      type: profilePictureFile.assets[0].type,
      name: profilePictureFile.assets[0].fileName,
    });
    const response = await uploadFile(formData);

    profileResponseUrl = response.data?.data?.url || '';
  }

  const certificates: { name: string; url: string }[] = [];

  for (const item of certificateFile) {
    if (item.file) {
      const formData = new FormData() as any;
      formData.append('file', {
        uri: item.file.uri,
        type: item.file.type,
        name: item.file.name,
      });

      const response = await uploadFile(formData);
      certificateFileUrl = response.data?.data?.url || '';

      certificates.push({ name: item.name, url: certificateFileUrl });
    }
  }

  if (resumeFile && resumeFile.uri) {
    const formData = new FormData() as any;
    formData.append('file', {
      uri: resumeFile.uri,
      type: resumeFile.type,
      name: resumeFile.name,
    });

    const response = await uploadFile(formData);
    resumeUrl = response.data?.data?.url || '';
  }

  const response = await axiosClient.patch<AxiosResponse<any>>(
    '/api/auth/complete-registration',
    {
      firstName: agrs.personalInformation?.firstName,
      lastName: agrs.personalInformation?.lastName,
      country: agrs.personalInformation?.country,
      city: agrs.personalInformation?.city,
      countryOfOrigin: agrs.personalInformation?.countryOfOrigin,
      resume: resumeUrl,
      bio: agrs.personalInformation?.bio,
      experience: (agrs.experience || []).map((item) => ({
        ...item,
        'stillWorkHere?': item.stillWorkHere,
      })),
      education: agrs.education || [],
      skills: agrs.skills,
      certificates: certificates,
      profilePicture: profileResponseUrl,
    },
  );

  return response.data;
});

export const uploadFile = async (payload: FormData) => {
  const response = await axiosClient.post<AxiosResponse<any>>(
    '/api/file-upload',
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
};

export const logoutAction = asyncThunkWrapper<any, void>(SIGN_OUT, async () => {
  await persistor.purge();
  await persistor.flush();
  await persistor.persist();
  return {};
});
