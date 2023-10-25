import {
  FilePickerFormat,
  IEducation,
  IExperience,
  IProfileInformation,
  IThunkAPIStatus,
  IUserProfileData,
} from '@app-model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  changePasswordAction,
  completeUserProfileAction,
  loginUserActionAction,
  requestOTPEmailAction,
  requestOTPPhoneAction,
  resendOTPAction,
  signupUserActionAction,
  updateCertificateProfileAction,
  updateEducationProfileAction,
  updateExperienceProfileAction,
  updatePersonalInformationAction,
  updateSkillsProfileAction,
  updateUserProfilePictureAction,
  verifyOTPActionAction,
  verifyOTPOnChangePasswordAction,
} from '../actions/auth';
import { PURGE, REHYDRATE } from 'redux-persist';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { addExperience } from '../store/slice/addExperience';
import { deleteBio } from '../store/slice/bio';

export interface ISessionState {
  signingInStatus: IThunkAPIStatus;
  signingInSuccess: string;
  signingInError?: string;

  resendOtpStatus: IThunkAPIStatus;
  resendOtpSuccess: string;
  resendOtpError?: string;

  requestOTPEmailStatus: IThunkAPIStatus;
  requestOTPEmailSuccess: string;
  requestOTPEmailError?: string;

  requestOTPPhoneStatus: IThunkAPIStatus;
  requestOTPPhoneSuccess: string;
  requestOTPPhoneError?: string;

  verifyPhoneEmailOTPStatus: IThunkAPIStatus;
  verifyPhoneEmailOTPSuccess: string;
  verifyPhoneEmailOTPError?: string;

  changePasswordOTpStatus: IThunkAPIStatus;
  changePasswordOTpSuccess: string;
  changePasswordOTpError?: string;

  signingUpStatus: IThunkAPIStatus;
  signingUpSuccess: string;
  signingUpError?: string;
  profileData: IUserProfileData;

  otpVerificationStatus: IThunkAPIStatus;
  otpVerificationSuccess: string;
  otpVerificationError?: string;

  completeProfileStatus: IThunkAPIStatus;
  completeProfileSuccess: string;
  completeProfileError?: string;

  updatePersonalInformationStatus: IThunkAPIStatus;
  updatePersonalInformationSuccess: string;
  updatePersonalInformationError?: string;

  updateProfiePictureStatus: IThunkAPIStatus;
  updateProfiePictureSuccess: string;
  updateProfiePictureError?: string;

  updateEducationHistoryStatus: IThunkAPIStatus;
  updateEducationHistorySuccess: string;
  updateEducationHistoryError?: string;

  updateExperienceStatus: IThunkAPIStatus;
  updateExperienceSuccess: string;
  updateExperienceError?: string;

  updateUserSkillsStatus: IThunkAPIStatus;
  updateUserSkillsSuccess: string;
  updateUserSkillsError?: string;

  updateUserCertificatesStatus: IThunkAPIStatus;
  updateUserCertificatesSuccess: string;
  updateUserCertificatesError?: string;

  otpChannelValue: string;
  otpCode: string;
}

const initialState: ISessionState = {
  signingInStatus: 'idle',
  signingInSuccess: '',
  signingInError: '',

  resendOtpStatus: 'idle',
  resendOtpSuccess: '',
  resendOtpError: '',

  requestOTPEmailStatus: 'idle',
  requestOTPEmailSuccess: '',
  requestOTPEmailError: '',

  requestOTPPhoneStatus: 'idle',
  requestOTPPhoneSuccess: '',
  requestOTPPhoneError: '',

  verifyPhoneEmailOTPStatus: 'idle',
  verifyPhoneEmailOTPSuccess: '',
  verifyPhoneEmailOTPError: '',

  changePasswordOTpStatus: 'idle',
  changePasswordOTpSuccess: '',
  changePasswordOTpError: '',

  signingUpStatus: 'idle',
  signingUpSuccess: '',
  signingUpError: '',

  profileData: {
    phoneNumber: '',
    personalInformation: {
      firstName: '',
      lastName: '',
      country: '',
      countryOfOrigin: '',
      resume: null,
      bio: '',
      city: '',
    },
    education: [],
    experience: [],
    certificates: [],
    profilePicture: null,
    skills: [],

    isAddExperienceLoading: false,
    isAddExperienceSuccessfully: false,
    addExperienceError: '',

    isBioLoading: false,
    isBioSuccessfully: false,
    bioError: '',
  },

  otpVerificationStatus: 'idle',
  otpVerificationSuccess: '',
  otpVerificationError: '',

  completeProfileStatus: 'idle',
  completeProfileSuccess: '',
  completeProfileError: '',

  otpChannelValue: '',

  otpCode: '',

  updatePersonalInformationStatus: 'idle',
  updatePersonalInformationSuccess: '',
  updatePersonalInformationError: '',

  updateProfiePictureStatus: 'idle',
  updateProfiePictureSuccess: '',
  updateProfiePictureError: '',

  updateEducationHistoryStatus: 'idle',
  updateEducationHistorySuccess: '',
  updateEducationHistoryError: '',

  updateExperienceStatus: 'idle',
  updateExperienceSuccess: '',
  updateExperienceError: '',

  updateUserSkillsStatus: 'idle',
  updateUserSkillsSuccess: '',
  updateUserSkillsError: '',

  updateUserCertificatesStatus: 'idle',
  updateUserCertificatesSuccess: '',
  updateUserCertificatesError: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearLoginStatus(state: ISessionState) {
      state.signingInStatus = 'idle';
      state.signingInSuccess = '';
      state.signingInError = '';
    },
    clearBioErrors(state) {
      state.profileData.bioError = '';
      state.profileData.isBioSuccessfully = false;
    },

    resetAddExperienceSuccess: (state) => {
      state.profileData.isAddExperienceSuccessfully = false;
    },

    clearSignupStatus(state: ISessionState) {
      state.signingUpStatus = 'idle';
      state.signingUpSuccess = '';
      state.signingUpError = '';
    },

    clearResendOtpStatus(state: ISessionState) {
      state.requestOTPPhoneStatus = 'idle';
      state.requestOTPPhoneSuccess = '';
      state.resendOtpError = '';
    },

    clearOtpVerificationStatus(state: ISessionState) {
      state.otpVerificationStatus = 'idle';
      state.otpVerificationSuccess = '';
      state.otpVerificationError = '';
    },
    updatePhoneNumber(state: ISessionState, action: PayloadAction<string>) {
      state.profileData.phoneNumber = action.payload;
    },

    storeOTPChannelValue(state: ISessionState, action: PayloadAction<string>) {
      state.otpChannelValue = action.payload;
    },
    storeOtpCode(state: ISessionState, action: PayloadAction<string>) {
      state.otpCode = action.payload;
    },
    clearOTPCode(state: ISessionState, action: PayloadAction<string>) {
      state.otpCode = action.payload;
    },

    updatePersonalInformation(
      state: ISessionState,
      action: PayloadAction<IProfileInformation>,
    ) {
      state.profileData.personalInformation = action.payload;
      console.log('stat> ', state.profileData);
    },

    updateProfilePicture(
      state: ISessionState,
      action: PayloadAction<
        DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult | null
      >,
    ) {
      state.profileData.profilePicture = action.payload;
    },

    clearEmailPhoneOtpVerificationStatus(state: ISessionState) {
      state.verifyPhoneEmailOTPError = '';
      state.verifyPhoneEmailOTPStatus = 'idle';
      state.verifyPhoneEmailOTPSuccess = '';
    },

    updateSkills(state: ISessionState, action: PayloadAction<string[]>) {
      state.profileData.skills = action.payload;
    },

    updateExperience(state: ISessionState, action: PayloadAction<IExperience>) {
      if (action.payload) {
        state.profileData.experience = [
          ...(state.profileData.experience || []),
          action.payload,
        ];
      }
    },
    removeExperienceItemActionLocal(
      state: ISessionState,
      action: PayloadAction<number>,
    ) {
      const replica = [...(state.profileData.experience || [])];

      replica.splice(action.payload, 1);

      state.profileData.experience = replica;
    },
    removeEducationItemActionLocal(
      state: ISessionState,
      action: PayloadAction<number>,
    ) {
      const replica = [...(state.profileData.education || [])];

      replica.splice(action.payload, 1);

      state.profileData.education = replica;
    },
    updateEducation(state: ISessionState, action: PayloadAction<IEducation>) {
      state.profileData.education = [
        ...(state.profileData.education || []),
        action.payload,
      ];
    },
    updateCertificate(
      state: ISessionState,
      action: PayloadAction<{ name: string; file: FilePickerFormat | null }[]>,
    ) {
      if (action.payload) {
        state.profileData.certificates = [
          ...(state.profileData.certificates || []),
          ...action.payload,
        ];
      }
    },
    clearCompleteProfileStatus(state: ISessionState) {
      state.completeProfileStatus = 'idle';
      state.completeProfileError = '';
      state.completeProfileError = '';
    },

    clearChangePasswordError(state: ISessionState) {
      state.changePasswordOTpError = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.signingInStatus = 'idle';
      state.signingInSuccess = '';
      state.signingInError = '';
      state.signingUpSuccess = '';
      state.signingUpStatus = 'idle';

      state.otpVerificationStatus = 'idle';
      state.otpVerificationSuccess = '';
      state.otpVerificationError = '';

      state.profileData = {
        phoneNumber: '',
        personalInformation: {
          firstName: '',
          lastName: '',
          country: '',
          countryOfOrigin: '',
          resume: null,
          bio: '',
          city: '',
        },
        education: [],
        experience: [],
        certificates: [],
        profilePicture: null,
        skills: [],
      };
    });
    builder.addCase(REHYDRATE, (state) => {
      state.signingInStatus = 'idle';
      state.signingInSuccess = '';
      state.signingInError = '';
      state.signingUpSuccess = '';
      state.signingUpStatus = 'idle';

      state.otpVerificationStatus = 'idle';
      state.otpVerificationSuccess = '';
      state.otpVerificationError = '';

      state.profileData = {
        phoneNumber: '',
        personalInformation: {
          firstName: '',
          lastName: '',
          country: '',
          countryOfOrigin: '',
          resume: null,
          bio: '',
          city: '',
        },
        education: [],
        experience: [],
        certificates: [],
        profilePicture: null,
        skills: [],
      };
    });
    builder.addCase(loginUserActionAction.pending, (state) => {
      state.signingInStatus = 'loading';
    });
    builder.addCase(loginUserActionAction.fulfilled, (state, action) => {
      state.signingInStatus = 'completed';
    });
    builder.addCase(loginUserActionAction.rejected, (state, action) => {
      state.signingInError = '';
      state.signingInStatus = 'failed';
    });

    builder.addCase(resendOTPAction.pending, (state) => {
      state.resendOtpStatus = 'loading';
    });
    builder.addCase(resendOTPAction.fulfilled, (state, action) => {
      state.resendOtpStatus = 'completed';
    });
    builder.addCase(resendOTPAction.rejected, (state, action) => {
      state.resendOtpError = action.payload?.message as string;
      state.resendOtpStatus = 'failed';
    });

    builder.addCase(signupUserActionAction.pending, (state) => {
      state.signingUpStatus = 'loading';
    });
    builder.addCase(signupUserActionAction.fulfilled, (state, action) => {
      state.signingUpSuccess = action.payload.message;
      state.signingUpStatus = 'completed';
    });
    builder.addCase(signupUserActionAction.rejected, (state, action) => {
      state.signingUpStatus = 'failed';
    });

    builder.addCase(verifyOTPActionAction.pending, (state) => {
      state.otpVerificationStatus = 'loading';
    });
    builder.addCase(verifyOTPActionAction.fulfilled, (state, action) => {
      state.otpVerificationSuccess = action.payload.message;
      console.log(action.payload);
      state.otpVerificationStatus = 'completed';
    });
    builder.addCase(verifyOTPActionAction.rejected, (state, action) => {
      state.otpVerificationStatus = 'failed';
    });

    builder.addCase(completeUserProfileAction.pending, (state) => {
      state.completeProfileStatus = 'loading';
    });
    builder.addCase(completeUserProfileAction.fulfilled, (state, action) => {
      state.completeProfileSuccess = action.payload.message;
      state.completeProfileStatus = 'completed';
    });
    builder.addCase(completeUserProfileAction.rejected, (state, action) => {
      state.completeProfileStatus = 'failed';
      state.completeProfileError =
        (action.payload?.message as string) || action.error.message || '';
    });

    builder.addCase(updateEducationProfileAction.pending, (state) => {
      state.updateEducationHistoryStatus = 'loading';
    });
    builder.addCase(updateEducationProfileAction.fulfilled, (state, action) => {
      state.updateEducationHistorySuccess = action.payload.message;
      state.updateEducationHistoryStatus = 'completed';
    });
    builder.addCase(updateEducationProfileAction.rejected, (state, action) => {
      state.updateEducationHistoryStatus = 'failed';
      state.updateEducationHistoryError =
        (action.payload?.message as string) || action.error.message || '';
    });

    builder.addCase(updateExperienceProfileAction.pending, (state) => {
      state.updateExperienceStatus = 'loading';
    });
    builder.addCase(
      updateExperienceProfileAction.fulfilled,
      (state, action) => {
        state.updateExperienceSuccess = action.payload.message;
        state.updateExperienceStatus = 'completed';
      },
    );
    builder.addCase(updateExperienceProfileAction.rejected, (state, action) => {
      state.updateExperienceStatus = 'failed';
      state.updateExperienceError =
        (action.payload?.message as string) || action.error.message || '';
    });

    builder.addCase(updateCertificateProfileAction.pending, (state) => {
      state.updateUserCertificatesStatus = 'loading';
    });
    builder.addCase(
      updateCertificateProfileAction.fulfilled,
      (state, action) => {
        state.updateUserCertificatesSuccess = action.payload.message;
        state.updateUserCertificatesStatus = 'completed';
      },
    );
    builder.addCase(
      updateCertificateProfileAction.rejected,
      (state, action) => {
        state.updateUserCertificatesStatus = 'failed';
        state.updateUserCertificatesError =
          (action.payload?.message as string) || action.error.message || '';
      },
    );

    builder.addCase(updateSkillsProfileAction.pending, (state) => {
      state.updateUserSkillsStatus = 'loading';
    });
    builder.addCase(updateSkillsProfileAction.fulfilled, (state, action) => {
      state.updateUserSkillsSuccess = action.payload.message;
      state.updateUserSkillsStatus = 'completed';
    });
    builder.addCase(updateSkillsProfileAction.rejected, (state, action) => {
      state.updateUserSkillsError = 'failed';
      state.completeProfileError =
        (action.payload?.message as string) || action.error.message || '';
    });

    builder.addCase(updatePersonalInformationAction.pending, (state) => {
      state.updatePersonalInformationStatus = 'loading';
    });
    builder.addCase(
      updatePersonalInformationAction.fulfilled,
      (state, action) => {
        state.updatePersonalInformationSuccess = action.payload.message;
        state.updatePersonalInformationStatus = 'completed';
      },
    );
    builder.addCase(
      updatePersonalInformationAction.rejected,
      (state, action) => {
        state.updatePersonalInformationStatus = 'failed';
        state.updatePersonalInformationError =
          (action.payload?.message as string) || action.error.message || '';
      },
    );

    builder.addCase(updateUserProfilePictureAction.pending, (state) => {
      state.updateProfiePictureStatus = 'loading';
    });
    builder.addCase(
      updateUserProfilePictureAction.fulfilled,
      (state, action) => {
        state.updateProfiePictureSuccess = action.payload.message;
        state.updateProfiePictureStatus = 'completed';
      },
    );
    builder.addCase(
      updateUserProfilePictureAction.rejected,
      (state, action) => {
        state.updateProfiePictureStatus = 'failed';
        state.updateProfiePictureError =
          (action.payload?.message as string) || action.error.message || '';
      },
    );

    builder.addCase(requestOTPEmailAction.pending, (state) => {
      state.requestOTPEmailStatus = 'loading';
    });
    builder.addCase(requestOTPEmailAction.fulfilled, (state, action) => {
      state.requestOTPEmailSuccess = action.payload.message;
      state.requestOTPEmailStatus = 'completed';
    });
    builder.addCase(requestOTPEmailAction.rejected, (state, action) => {
      state.requestOTPEmailStatus = 'failed';
      state.requestOTPEmailError = action.payload?.message as string;
    });

    builder.addCase(requestOTPPhoneAction.pending, (state) => {
      state.requestOTPPhoneStatus = 'loading';
    });
    builder.addCase(requestOTPPhoneAction.fulfilled, (state, action) => {
      state.requestOTPPhoneSuccess = action.payload.message;
      state.requestOTPPhoneStatus = 'completed';
    });
    builder.addCase(requestOTPPhoneAction.rejected, (state, action) => {
      state.requestOTPPhoneStatus = 'failed';
      state.requestOTPPhoneError = action.payload?.message as string;
    });

    builder.addCase(changePasswordAction.pending, (state) => {
      state.changePasswordOTpStatus = 'loading';
    });
    builder.addCase(changePasswordAction.fulfilled, (state, action) => {
      state.changePasswordOTpSuccess = action.payload.message;
      state.changePasswordOTpStatus = 'completed';
    });
    builder.addCase(changePasswordAction.rejected, (state, action) => {
      state.changePasswordOTpStatus = 'failed';
      state.changePasswordOTpError = action.payload?.message as string;
    });

    builder.addCase(verifyOTPOnChangePasswordAction.pending, (state) => {
      state.verifyPhoneEmailOTPStatus = 'loading';
    });
    builder.addCase(
      verifyOTPOnChangePasswordAction.fulfilled,
      (state, action) => {
        state.verifyPhoneEmailOTPSuccess = action.payload.message;
        state.verifyPhoneEmailOTPStatus = 'completed';
      },
    );
    builder.addCase(
      verifyOTPOnChangePasswordAction.rejected,
      (state, action) => {
        state.verifyPhoneEmailOTPStatus = 'failed';
        state.verifyPhoneEmailOTPError = action.payload?.message as string;
      },
    );

    builder.addCase(addExperience.pending, (state, action) => {
      state.profileData.isAddExperienceLoading = true;
      state.profileData.addExperienceError = '';
    });
    builder.addCase(addExperience.fulfilled, (state, action) => {
      state.profileData = action.payload;
      state.profileData.isAddExperienceLoading = false;
      state.profileData.isAddExperienceSuccessfully = true;
    });
    builder.addCase(addExperience.rejected, (state, action) => {
      state.profileData.isAddExperienceLoading = false;
      state.profileData.addExperienceError = action?.payload as string;
      state.profileData.isAddExperienceSuccessfully = false;
    });

    builder.addCase(deleteBio.pending, (state, action) => {
      state.profileData.isBioLoading = true;
    });
    builder.addCase(deleteBio.fulfilled, (state, action) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
      state.profileData.isBioSuccessfully = true;
      state.profileData.isBioLoading = false;
    });
    builder.addCase(deleteBio.rejected, (state, action) => {
      state.profileData.isBioLoading = false;
      state.profileData.isBioSuccessfully = false;
      state.profileData.bioError = action.payload as string;
    });
  },
});

export const {
  clearLoginStatus,
  clearSignupStatus,
  updatePhoneNumber,
  updatePersonalInformation,
  updateProfilePicture,
  updateCertificate,
  updateEducation,
  updateExperience,
  storeOTPChannelValue,
  storeOtpCode,
  clearOTPCode,
  clearEmailPhoneOtpVerificationStatus,
  updateSkills,
  clearCompleteProfileStatus,
  clearResendOtpStatus,
  clearChangePasswordError,
  resetAddExperienceSuccess,
  removeExperienceItemActionLocal,
  removeEducationItemActionLocal,
  clearBioErrors,
} = sessionSlice.actions;

export default sessionSlice.reducer;
