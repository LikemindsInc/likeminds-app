import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import OnBoarding from "../screens/onboarding/OnBoarding";
import OTPVerification from "../screens/otp_verification/OTPVerification";
import PersonalInformation from "../screens/personal_inforamtion/PersonalInformation";
import Signup from "../screens/Signup/Signup";
import SignupCertificate from "../screens/SignupCertificate/SignupCertiifcate";
import SignupComplete from "../screens/SignupComplete/SignupComplete";
import SignupEducation from "../screens/SignupEducation/SignupEducation";
import SignupExperience from "../screens/SignupExperience/SignupExperience";
import SignupProfilePicture from "../screens/SignupProfilePicture/SignupProfilePicture";
import SignupSkills from "../screens/SignupSkills/SignupSkills";
import { APP_SCREEN_LIST, DRAWER_WIDTH } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { GlobalStyles } from "../theme/GlobalStyles";
import useDimension from "../hooks/useDimension";
import Button from "../components/Button/Button";
import colors from "../theme/colors";
import { Text } from "react-native";
import { useToast } from "native-base";
import { useEffect } from "react";
import useAppSelector from "../hooks/useAppSelector";
import { IGlobalErrorState } from "../reducers/errorHanlder";
import useAppDispatch from "../hooks/useAppDispatch";
import { PURGE } from "redux-persist";
import { __ROOT_REDUX_STATE_KEY__ } from "../store/constants";
import { logoutAction } from "../actions/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ISettingState, logoutUserAction } from "../reducers/settings";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import RecoverWithPhone from "../screens/ForgotEmail/RecoverWithPhone";
import OTPScreen from "../screens/ForgotEmail/OTPScreen";
import OTPEmailScreen from "../screens/ForgotPassword/OTPScreen";
import CreatePassword from "../screens/CreatePassword/CreatePassword";
import CreateSpace from "../screens/CreateSpace/CreateSpace";
import CreateSpaceAddPicture from "../screens/CreateSpace/CreateSpaceAddPicture";
import CreatePost from "../screens/CreatePost/CreatePost";
import UserProfile from "../screens/Profile/UserProfile";
import PostJob from "../screens/Job/PostJob/PostJob";
import SpaceSearch from "../screens/Spaces/SpaceSearch/SpaceSearch";
import SpaceProfile from "../screens/Spaces/SpaceProfile";
import PostDetail from "../screens/Home/components/PostDetail";
import Jobs from "../screens/Job/PostJob/Jobs";
import Messages from "../screens/Message/Messages";
import ConnectionProfile from "../screens/Profile/ConnectionProfile";
import Notification from "../screens/Notification/Notification";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const AppHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const setting = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  useEffect(() => {
    if (!setting.userInfo)
      return navigation.navigate(APP_SCREEN_LIST.ONBOARDING_SCREEN);
  }, [setting.userInfo]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#009AEE",
        tabBarInactiveTintColor: "#88969D",
        tabBarLabelStyle: { fontFamily: "Inter-Regular", display: "none" },
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case APP_SCREEN_LIST.HOME_SCREEN:
              return <Feather name="home" size={size} color={color} />;
            case APP_SCREEN_LIST.SPACE_SEARCH_SCREEN:
              return (
                <MaterialCommunityIcons name="sort" size={size} color={color} />
              );
            case APP_SCREEN_LIST.POST_ICON_TAB:
              return <AntDesign name="plus" size={size} color={color} />;
            case APP_SCREEN_LIST.TOOLBOX_ICON_TAB:
              return (
                <MaterialCommunityIcons
                  name="toolbox-outline"
                  size={size}
                  color={color}
                />
              );
            case APP_SCREEN_LIST.CHAT_ICON_TAB:
              return (
                <Ionicons
                  name="chatbubbles-outline"
                  size={size}
                  color={color}
                />
              );
          }
        },
        headerShown: false,
      })}
      initialRouteName={APP_SCREEN_LIST.HOME_SCREEN}
    >
      <Tab.Screen name={APP_SCREEN_LIST.HOME_SCREEN} component={Home} />
      <Tab.Screen
        name={APP_SCREEN_LIST.SPACE_SEARCH_SCREEN}
        component={SpaceSearch}
      />
      <Tab.Screen name={APP_SCREEN_LIST.POST_ICON_TAB} component={CreatePost} />
      <Tab.Screen name={APP_SCREEN_LIST.TOOLBOX_ICON_TAB} component={Jobs} />
      <Tab.Screen name={APP_SCREEN_LIST.CHAT_ICON_TAB} component={Messages} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { height } = useWindowDimensions();
  const width =
    useWindowDimensions().width * 0.5 < DRAWER_WIDTH
      ? DRAWER_WIDTH
      : useWindowDimensions().width * 0.5;

  const handleNavigation = (linkTo: string) => {};

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <DrawerContentScrollView {...props}>
      <View style={[GlobalStyles.menuContainer, { width }]}>
        <View
          style={[
            GlobalStyles.menuItemsCard,
            { backgroundColor: "#284453", width: width, height: height },
            GlobalStyles.drawerContainer,
          ]}
        >
          <View style={[GlobalStyles.displayRowCenter, GlobalStyles.mb40]}>
            <Image
              source={require("../../assets/image4.png")}
              style={{ height: 30, width: 120 }}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </View>
          <View style={[GlobalStyles.mb40]}>
            <Button
              type="tertiary"
              title="Switch To Space"
              onPress={() =>
                navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN)
              }
            />
          </View>
          <View style={[GlobalStyles.flexOne, GlobalStyles.mt20]}>
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 40,
                },
              ]}
              onPress={(e) => handleNavigation("")}
            >
              <Feather Medical name="home" size={20} color={colors.primary} />
              <Text
                style={[
                  GlobalStyles.textWhite,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  { paddingLeft: 15 },
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 40,
                },
              ]}
              onPress={(e) => handleNavigation("")}
            >
              <Feather
                Medical
                name="settings"
                size={20}
                color={colors.primary}
              />
              <Text
                style={[
                  GlobalStyles.textWhite,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  { paddingLeft: 15 },
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 40,
                },
              ]}
              onPress={(e) => handleNavigation("")}
            >
              <AntDesign name="user" size={24} color={colors.primary} />
              <Text
                style={[
                  GlobalStyles.textWhite,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  { paddingLeft: 15 },
                ]}
              >
                My Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 40,
                },
              ]}
              onPress={(e) => handleNavigation("")}
            >
              <AntDesign name="calendar" size={24} color={colors.primary} />
              <Text
                style={[
                  GlobalStyles.textWhite,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  { paddingLeft: 15 },
                ]}
              >
                Saved Events
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[{ marginBottom: 110 }]}>
            <Button
              onPress={() => {
                dispatch(logoutUserAction());
                dispatch(logoutAction());
              }}
              type="tertiary"
              title="Logout"
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const AppDrawer = () => {
  const width =
    useWindowDimensions().width * 0.5 < DRAWER_WIDTH
      ? DRAWER_WIDTH
      : useWindowDimensions().width * 0.5;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width,
        },
        drawerType: useWindowDimensions().width >= 768 ? "permanent" : "front",
        overlayColor: "transparent",
      }}
      initialRouteName="DrawerHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="DrawerHome" component={AppHome} />
      <Drawer.Screen name="SpaceProfile" component={SpaceProfile} />
    </Drawer.Navigator>
  );
};

const AppRoutes = () => {
  const errorReducer = useAppSelector(
    (state: any) => state.errorReducer
  ) as IGlobalErrorState;
  const toast = useToast();
  useEffect(() => {
    if (errorReducer.message?.trim() !== "")
      toast.show({ description: errorReducer.message });
  }, [errorReducer.message]);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  const setting = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

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
        name={APP_SCREEN_LIST.SIGNUP_EXPERIENCE_SCREEN}
        component={SignupExperience}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN}
        component={SignupEducation}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_SKILLS_SCREEN}
        component={SignupSkills}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN}
        component={SignupCertificate}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN}
        component={SignupComplete}
      />

      <Stack.Screen
        name={APP_SCREEN_LIST.SIGNUP_PROFILE_PICTURE}
        component={SignupProfilePicture}
      />

      <Stack.Screen name={APP_SCREEN_LIST.MAIN_SCREEN} component={AppDrawer} />

      <Stack.Screen name={APP_SCREEN_LIST.LOGIN_SCREEN} component={Login} />
      <Stack.Screen
        name={APP_SCREEN_LIST.SPACE_PROFILE_SCREEN}
        component={SpaceProfile}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.FORGOT_PHONE_SCREEN}
        component={RecoverWithPhone}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.FORGOT_EMAIL_OTP_SCREEN}
        component={OTPEmailScreen}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.FORGOT_PHONE_OTP_SCREEN}
        component={OTPScreen}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.CREATE_PASSWORD_SCREEN}
        component={CreatePassword}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.CREATE_SPACE_SCREEN}
        component={CreateSpace}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.CREATE_SPACE_ADD_PICTURE}
        component={CreateSpaceAddPicture}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.USER_PROFILE_SCREEN}
        component={UserProfile}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.POST_JOB_SCREEN}
        component={PostJob}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN}
        component={ConnectionProfile}
      />
      <Stack.Screen
        name={APP_SCREEN_LIST.NOTIFICATION_SCREEN}
        component={Notification}
      />
      <Stack.Screen name={APP_SCREEN_LIST.POST_DETAIL} component={PostDetail} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
