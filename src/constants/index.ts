/*
 ****************************************************************
 ******************    ALL APP CONSTANTS   **********************
 ****************************************************************
 */

import { NavigationProp } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * extending app local storage
 * @constant USER_FIRST_LAUNCH default value
 */
export const USER_FIRST_LAUNCH: string = '@FIRST_TIME_LAUNCH';

export const DRAWER_WIDTH = 260;

/**
 * extending app global constants for page loading
 * @constant DEFAULT_PAGINATION default value
 * @constant LANGUAGE_DEFAULT default value
 */
export const DEFAULT_PAGINATION: number = 10;
export const LANGUAGE_DEFAULT: string = 'en';

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
export const __ROOT_REDUX_STATE_KEY__: string = '@REDUX_LOCAL_PERSISTANCE_KEY';

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

export const APP_BASE_URL =
  process.env.APP_BASE_URL ||
  'http://likemind-api.eu-north-1.elasticbeanstalk.com';

export const WEB_SOCKET_URL = process.env.WEB_SOCKET_URL || '';

export const SERVER_PUBLIC_TOKEN = 'fixam--hq0.!@a1';

/**
 * extending app global constants
 * @constant APP_SCREEN_LIST default value
 */
export enum APP_SCREEN_LIST {
  MAIN_SCREEN = 'MAIN_SCREEN',
  HOME_SCREEN = 'Home',
  LOGIN_SCREEN = 'Login',
  AUTH_SCREEN = 'AUTH_SCREEN',
  POST_ICON_TAB = 'POST_ICON_TAB',
  TOOLBOX_ICON_TAB = 'TOOLBOX_ICON_TAB',
  CHAT_ICON_TAB = 'CHAT_ICON_TAB',
  OTP_VERIFICATION_SCREEN = 'OTP_VERIFICATION_SCREEN',
  PERSONAL_INFORAMTION_SCREEN = 'PERSONAL_INFORAMTION_SCREEN',
  SIGNUP_PROFILE_PICTURE = 'SIGNUP_PROFILE_PICTURE',
  SIGNUP_EXPERIENCE_SCREEN = 'SIGNUP_EXPERIENCE_SCREEN',
  SIGNUP_EDUCATION_SCREEN = 'SIGNUP_EDUCATION_SCREEN',
  SIGNUP_SKILLS_SCREEN = 'SIGNUP_SKILLS_SCREEN',
  SIGNUP_CERTIFICATE_SCREEN = 'SIGNUP_CERTIFICATE_SCREEN',
  SIGNUP_COMPLETE_SCREEN = 'SIGNUP_COMPLETE_SCREEN',
  USER_SIGNUP_SCREEN = 'USER_SIGNUP_SCREEN',
  SETTINGS_SCREEN = 'Settings',
  REQUESTS_SCREEN = 'Requests',
  SERVICE_CATGORIES_PAGE = 'Service Categories',
  NOT_FOUND_SCREEN = 'NOT_FOUND_SCREEN',
  ONBOARDING_SCREEN = 'ONBOARDING_SCREEN',
  FIND_ARTISAN_SCREEN = 'FIND_ARTISAN_SCREEN',
  FORGOT_PASSWORD_SCREEN = 'FORGOT_PASSWORD_SCREEN',
  FORGOT_PHONE_SCREEN = 'FORGOT_PHONE_SCREEN',
  FORGOT_EMAIL_OTP_SCREEN = 'FORGOT_EMAIL_OTP_SCREEN',
  FORGOT_PHONE_OTP_SCREEN = 'FORGOT_PHONE_OTP_SCREEN',
  CREATE_PASSWORD_SCREEN = 'CREATE_PASSWORD_SCREEN',
  CREATE_SPACE_SCREEN = 'CREATE_SPACE_SCREEN',
  CREATE_SPACE_ADD_PICTURE = 'CREATE_SPACE_ADD_PICTURE',
  USER_PROFILE_SCREEN = 'USER_PROFILE_SCREEN',
  POST_JOB_SCREEN = 'POST_JOB_SCREEN',
  SPACE_SEARCH_SCREEN = 'SPACE_SEARCH_SCREEN',
  SPACE_PROFILE_SCREEN = 'SPACE_PROFILE_SCREEN',
  CONNECTION_PROFILE_SCREEN = 'CONNECTION_PROFILE_SCREEN',
  NOTIFICATION_SCREEN = 'NOTIFICATION_SCREEN',
  JOB_FILTER_SCREEN = 'JOB_FILTER_SCREEN',

  POST_DETAIL = 'POST_DETAIL',
}

export const APP_KEY = {
  FIXAM_USER_DATA: 'FIXAM_USER_DATA',
};

export const WEB_SOCKET_ROOMS = {
  SUBSCRIBE_JOB_AROUND_CLIENT: 'topic:subscribe:ArtisansAroundClient',
  UNSUBSCRIBE_JOB_AROUND_CLIENT: 'topic:unsubscribe:ArtisansAroundClient',
  SUBSCRIBE_JOB_AROUND_ARTISAN: 'topic:subscribe:JobRequestsAroundArtisan',
  UNSUBSCRIBE_JOB_AROUND_ARTISAN: 'topic:unsubscribe:JobRequestsAroundArtisan',
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

export const INDUSTRIES = [
  'Retail',
  'Manufacturing',
  'Construction',
  'Internet Technology',
  'Food',
  'Space',
  'Defense',
  'Agriculture',
  'Chemical',
];

export const JOB_TYPES = [
  { label: 'Part Time', value: 'part-time' },
  { label: 'Full Time', value: 'full-time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Contract', value: 'contract' },
];

export const SUGGESTIONS = [
  'App Design',
  'User Experience',
  'UX/UI',
  'Figma',
  'Adobe',
  'Sketch',
  'Wireframes',
];

export const JOB_EXPERIENCE = [
  { label: 'Student', value: 'student' },
  { label: 'Entry Level', value: 'entry-level' },
  { label: 'Mid Level', value: 'mid-level' },
  { label: 'Senior Level', value: 'senior-level' },
  { label: 'Director', value: 'director' },
  { label: 'Executive', value: 'executive' },
];

export const JOB_LOCATION = [
  { label: 'On Site', value: 'on-Site' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
];

export const JOB_DATE = [
  { label: 'Any Time', value: 'anytime' },
  { label: 'One Day Ago', value: 'oneday' },
  { label: 'One Week Ago', value: 'week' },
  { label: 'One Month Ago', value: 'month' },
];

export const TAILOR_JOBS = [
  { label: 'Sponsoring Companies', value: 'Sponsoring Companies' },
  { label: 'DI&E Hires', value: 'DI&E Hires' },
  { label: 'Disability Hires', value: 'Disability Hires' },
  { label: 'Work Life Balance', value: 'Work Life Balance' },
];

export const PENDING_OTP_MESSAGE =
  'Phone is yet to be veried, Kindly verify your number with the OTP sent to your phone';

export const SENTRY_DNS =
  'https://3f39a318ea28f52d3e77b88aaed35422@o4505852414787584.ingest.sentry.io/4505858577465344';

export const SCHOOL_DEGREES = [
  'Bsc',
  'Msc',
  'Phd',
  'Hnd',
  'Ond',
  'A-Levels',
  'Diploma',
  'Etc',
  'Others',
];

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MINIMUM_PASSWORD_LENGTH_REGEX = /^.{8}$/;
export const CONTAINS_UPPERCASE_PASSWORD_REGEX = /^.*[A-Z].*$/;
export const CONTAINS_LOWERCASE_PASSWORD_REGEX = /^.*[a-z].*$/;
export const CONTAINS_DIGIT_PASSWORD_REGEX = /.*\d.*/;
export const CONTAINS_WORD_PASSWORD_REGEX = /^.*[\W_].*$/;

export const PHONE_NUMBER_REGEX = /[0-9]/;

export const UNHANDLED_GLOBAL_ERRORS = [
  'AxiosError: Request failed with status code 401',
];

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_PERSISTENCE_KEY_V1';
