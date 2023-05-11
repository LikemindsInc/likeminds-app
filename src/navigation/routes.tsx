import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { APP_SCREEN_LIST } from "../constants";
import Login from "../screens/Login/Login";
import OnBoarding from "../screens/onboarding/OnBoarding";
import Signup from "../screens/Signup/Signup";
import OTPVerification from "../screens/otp_verification/OTPVerification";
import PersonalInformation from "../screens/personal_inforamtion/PersonalInformation";
import SignupProfilePicture from "../screens/SignupProfilePicture/SignupProfilePicture";

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={APP_SCREEN_LIST.ONBOARDING_SCREEN}
    >
      <Stack.Screen
        name={APP_SCREEN_LIST.ONBOARDING_SCREEN}
        component={OnBoarding}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.USER_SIGNUP_SCREEN}
        component={Signup}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN}
        component={OTPVerification}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.PERSONAL_INFORAMTION_SCREEN}
        component={PersonalInformation}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_PROFILE_PICTURE}
        component={SignupProfilePicture}
      />

      <Stack.Screen name={APP_SCREEN_LIST.LOGIN_SCREEN} component={Login} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
