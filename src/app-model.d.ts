declare module "@app-model" {
  import * as DocumentPicker from "expo-document-picker";
  import * as ImagePicker from "expo-image-picker";

  interface ResponseInterface<T = null> {
    payload: T;
    message: string;
    status_code: number;
    errors: object | null;
  }

  type IThunkAPIStatus = "idle" | "loading" | "completed" | "failed";

  interface ApiResponseError {
    message: string | string[];
    code: number;
    error: string;
    statusCode: number;
  }

  interface ISignupSuccessData {}

  interface ApiResponseSuccess<T> {
    message: string;
    code: number;
    timestamp?: string;
    data: T;
    result?: T;
    results?: T[];
  }

  interface ISignUp {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  interface ILogin {
    email: string;

    password: string;
  }

  interface IProfileInformation {
    firstName: string;
    lastName: string;
    country: string;
    countryOfOrigin: string;
    resume:
      | DocumentPicker.DocumentResult
      | ImagePicker.ImagePickerResult
      | null;
    bio: string;
    city: string;
  }

  interface IExperience {
    startDate: string;
    endDate: string;
    stillWorkHere: boolean;
    jobTitle: string;
    companyName: string;
    responsiblities: string;
  }

  interface IEducation {
    startDate: string;
    endDate: string;

    degree: string;
    school: string;
  }

  interface IUserProfileData {
    phoneNumber: string;
    personalInformation: IProfileInformation;
    experience: IExperience[];
    eduction: IEducation[];
    certificates: (
      | DocumentPicker.DocumentResult
      | ImagePicker.ImagePickerResult
    )[];
    profilePicture:
      | DocumentPicker.DocumentResult
      | ImagePicker.ImagePickerResult
      | null;
  }

  interface IVerifyOtpPaylod {
    phone: string;
    code: string;
  }

  interface ICountry {
    name: string;
  }

  interface IUserData {
    access_token: string | null;
    accessToken: {
      access_token: string | null;
      refresh_token: string | null;
    };
    profilePicture: string | null;
    refreshToken: string | null;
    socialLogin: boolean;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    provider: string | null;
    role: "user";
    email: string | null;
    message: string | null;
  }

  interface IRequestOTPEmail {
    email: string;
  }

  interface IRequestOTPPhone {
    phone: string;
  }

  interface IChangePasswordDTO {
    phone?: string;
    email?: string;
    code: string;
    newPassword: string;
  }

  interface IVerifyPhoneEmailOTP {
    phone?: string;
    email?: string;
    code: string;
  }

  interface ICreateSpaceRequestDTO {
    title: string;
    description: string;
    photo?: any;
  }

  interface ICreatePostDTO {
    content: string;
    image?: ImagePicker.ImagePickerAsset[];
  }

  interface IPostFeed {
    id: string;
    content: string;
    images: string[];
    files: any[];
    likedBy: any[];
    comments: any[];
    authorId: string;
    spaceId: null;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    reactionCount: number;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePicture: string | null;
    };
  }

  interface ICreateJobDTO {
    industry: string;
    companyName: string;
    companyDescription: string;
    companyLocation: string;
    jobTitle: string;
    jobName: string;
    jobType: string[];
    jobLocation: string;
    jobDescription: string;
    salary: number;
    experienceLevel: string[];
  }
}
