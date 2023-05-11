/*
 ****************************************************************
 ******************    ALL APP CONSTANTS   **********************
 ****************************************************************
 */

import { NavigationProp } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

/**
 * extending app local storage
 * @constant USER_FIRST_LAUNCH default value
 */
export const USER_FIRST_LAUNCH: string = "@FIRST_TIME_LAUNCH";

/**
 * extending app global constants for page loading
 * @constant DEFAULT_PAGINATION default value
 * @constant LANGUAGE_DEFAULT default value
 */
export const DEFAULT_PAGINATION: number = 10;
export const LANGUAGE_DEFAULT: string = "en";

/**
 * extending app global custom header style object
 * @constant GLOBAL_HEADER_STYLE default value
 */
export const GLOBAL_HEADER_STYLE: object = {
  elevation: 0,
  shadowRadius: 0,
  shadowOpacity: 0,
  shadowOffset: { height: 0, width: 0 },
};

/**
 * extending app global constants
 * @constant CACHE_TIME default value
 */
export const CACHE_TIME: number = 1000 * 60; // 1 minute for testing; please change this to the desired cache time

/**
 * extending app global constants
 * @constant CACHE_VERSION default value
 */
export const CACHE_VERSION: number = 1; // version 1

/**
 * extending app global constants
 * @constant CACHE_KEY default value
 */
export const __ROOT_REDUX_STATE_KEY__: string = "@REDUX_LOCAL_PERSISTANCE_KEY";

/**
 * extending app global constants
 * @constant TABLET_DIMENSION default value
 */
export const TABLET_DIMENSION: number = 450;

/**
 * extending app global constants
 * @constant DEVICE_FULL_HEIGHT default value
 * @constant DEVICE_FULL_WIDTH default value
 */
export const DEVICE_FULL_WIDTH: number = width;
export const DEVICE_FULL_HEIGHT: number = height;

export const APP_BASE_URL = "https://backend-alpha.staging.fixam.co";

export const WEB_SOCKET_URL = "https://backend-alpha.staging.fixam.co";

export const SERVER_PUBLIC_TOKEN = "fixam--hq0.!@a1";

/**
 * extending app global constants
 * @constant APP_SCREEN_LIST default value
 */
export enum APP_SCREEN_LIST {
  MAIN_SCREEN = "MAIN_SCREEN",
  HOME_SCREEN = "Home",
  LOGIN_SCREEN = "Login",
  AUTH_SCREEN = "AUTH_SCREEN",
  OTP_VERIFICATION_SCREEN = "OTP_VERIFICATION_SCREEN",
  PERSONAL_INFORAMTION_SCREEN = "PERSONAL_INFORAMTION_SCREEN",
  SIGNUP_PROFILE_PICTURE = "SIGNUP_PROFILE_PICTURE",
  SIGNUP_EXPERIENCE_SCREEN = "SIGNUP_EXPERIENCE_SCREEN",
  SIGNUP_EDUCATION_SCREEN = "SIGNUP_EDUCATION_SCREEN",
  SIGNUP_SKILLS_SCREEN = "SIGNUP_SKILLS_SCREEN",
  SIGNUP_CERTIFICATE_SCREEN = "SIGNUP_CERTIFICATE_SCREEN",
  SIGNUP_COMPLETE_SCREEN = "SIGNUP_COMPLETE_SCREEN",
  USER_SIGNUP_SCREEN = "USER_SIGNUP_SCREEN",
  SETTINGS_SCREEN = "Settings",
  REQUESTS_SCREEN = "Requests",
  SERVICE_CATGORIES_PAGE = "Service Categories",
  NOT_FOUND_SCREEN = "NOT_FOUND_SCREEN",
  ONBOARDING_SCREEN = "ONBOARDING_SCREEN",
  FIND_ARTISAN_SCREEN = "FIND_ARTISAN_SCREEN",
  FORGOT_PASSWORD_SCREEN = "FORGOT_PASSWORD_SCREEN",
  ACCOUNT_SELECTOR_SCREEN = "ACCOUNT_SELECTOR_SCREEN",
  ARTESAN_SEARCH_SCREEN = "ARTESEAN SEARCH",
  ARTESAN_FOUND_LIST = "ARTESEAN LIST",
  ARTSEAN_PROFILE_SCREEN = "ARTSEAN_PROFILE_SCREEN",
  REQUEST_SCREEN_LIST = "REQUEST_SCREEN_LIST",
  ARTSEAN_LOGIN_SCREEN = "ARTSEAN_LOGIN_SCREEN",
  ARTSEAN_SIGNUP_SCREEN = "ARTSEAN_SIGNUP_SCREEN",
  ARTSEAN_HOME_SCREEN = "ARTSEAN_HOME_SCREEN",
  ARISAN_SKILL_PICKER = "ARISAN_SKILL_PICKER",
  ARTISAN_PROFILE_SETUP = "ARTISAN_PROFILE_SETUP",
  ARTISAN_UPLOAD_ID = "ARTISAN_UPLOAD_ID",
  ARTISAN_HOME = "ARTISAN_HOME",
  ARTISAN_HOME_HOME = "ARTISAN_HOME_HOME",
  ARTISAN_REQUEST_SCREEN = "ARTISAN_REQUEST_SCREEN",
  ARTISAN_MORE_SCREEN = "ARTISAN_MORE_SCREEN",
  ARTISAN_JOB_REQUEST_DETAIL_SCREEN = "ARTISAN_JOB_REQUEST_DETAIL_SCREEN",
  ARTISAN_CREDIT_SCREEN = "ARTISAN_CREDIT_SCREEN",
}

export const APP_KEY = {
  FIXAM_USER_DATA: "FIXAM_USER_DATA",
};

export const WEB_SOCKET_ROOMS = {
  SUBSCRIBE_JOB_AROUND_CLIENT: "topic:subscribe:ArtisansAroundClient",
  UNSUBSCRIBE_JOB_AROUND_CLIENT: "topic:unsubscribe:ArtisansAroundClient",
  SUBSCRIBE_JOB_AROUND_ARTISAN: "topic:subscribe:JobRequestsAroundArtisan",
  UNSUBSCRIBE_JOB_AROUND_ARTISAN: "topic:unsubscribe:JobRequestsAroundArtisan",
};

export type INavigationProps = NavigationProp<
  ReactNavigation.RootParamList,
  never,
  undefined,
  Readonly<{
    key: string;
    index: number;
    routeNames: never[];
    history?: unknown[] | undefined;
    routes: any[];
    type: string;
    stale: false;
  }>,
  {},
  {}
>;
