import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { FC, useEffect, useState } from "react";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST, PENDING_OTP_MESSAGE } from "../../constants";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState, updatePhoneNumber } from "../../reducers/session";
import useAppDispatch from "../../hooks/useAppDispatch";
import { loginUserActionAction } from "../../actions/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import { err } from "react-native-svg/lib/typescript/xml";
import { clearNetworkError } from "../../reducers/errorHanlder";

const IconButton: FC<{ image: any }> = ({ image }) => {
  return (
    <TouchableOpacity style={[styles.iconButtonStyle]}>
      <Image
        style={{ width: 30 }}
        source={image}
        resizeMethod="auto"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<any>>();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<{
    email: null | string;
    password: null | string;
  }>({ email: null, password: null });

  useEffect(() => {
    setErrors({ email: null, password: null });
  }, [email, password]);

  useEffect(() => {
    if (email.trim() !== "") setErrors((state) => ({ ...state, email: null }));
    // else setErrors((state) => ({ ...state, email: "Email is required" }));
  }, [email]);

  useEffect(() => {
    if (password.trim() !== "")
      setErrors((state) => ({ ...state, password: null }));
    // else setErrors((state) => ({ ...state, password: "Password is required" }));
  }, [password]);

  const handleOnLogin = () => {
    if (email.trim() === "")
      return setErrors((state) => ({ ...state, email: "Email is Required" }));

    if (password.trim() === "")
      return setErrors((state) => ({
        ...state,
        password: "Password is Required",
      }));

    dispatch(
      loginUserActionAction({ email: email.trim(), password: password.trim() })
    );
  };

  const setting = useAppSelector((state) => state.settingReducer);

  const errorReducer = useAppSelector((state) => state.errorReducer);

  useEffect(() => {
    dispatch(clearNetworkError());
  }, [email, password]);

  useEffect(() => {
    if (session.signingInStatus === "completed") {
      if (!setting.userInfo?.isVerified) {
        dispatch(updatePhoneNumber(setting.userInfo?.phone as string));
        navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);

        return;
      }
      navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN);
    } else if (session.signingInStatus === "failed") {
    }
  }, [session.signingInStatus]);

  useEffect(() => {
    setErrors((state) => ({ ...state, password: errorReducer.message }));
  }, [errorReducer.message]);

  useEffect(() => {
    if (errorReducer.message === PENDING_OTP_MESSAGE) return;
    // return navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);
  }, [errorReducer.message]);

  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Login" />
      </View>
      <View style={[GlobalStyles.mb40]}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight700,
            GlobalStyles.textGrey,
          ]}
        >
          Enter your email address and password to login to your account
        </Text>
      </View>

      <View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Email Address"
            autoCorrect={false}
            autoCapitalize={"none"}
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            returnKeyType="done"
            errorMessage={errors.email}
          />
          <Input
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize={"none"}
            secureTextEntry
            value={password}
            keyboardType="default"
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
            errorMessage={errors.password}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.FORGOT_PASSWORD_SCREEN)
          }
          style={[GlobalStyles.mb40]}
        >
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textPrimary,
            ]}
          >
            Forgot Your Password?
          </Text>
        </TouchableOpacity>
        <Button
          loading={session.signingInStatus === "loading"}
          onPress={handleOnLogin}
          title="Login"
        />
        {/* <View style={[GlobalStyles.mt40]}>
        <Text
          style={[
            GlobalStyles.textGrey,
            GlobalStyles.fontSize15,
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontWeight400,
          ]}
        >
          Or continue with
        </Text>
      </View>
      <View style={[GlobalStyles.mt20, GlobalStyles.flewRow]}>
        <IconButton image={require("../../../assets/linkedln.png")} />
        <IconButton image={require("../../../assets/facebook.png")} />
        <IconButton image={require("../../../assets/instagram.png")} />
      </View> */}
        <View style={[GlobalStyles.mt20]}>
          <Text
            style={[
              GlobalStyles.textGrey,
              GlobalStyles.fontSize15,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontWeight400,
            ]}
          >
            Don’t have an account yet?
          </Text>
        </View>
        <View style={[GlobalStyles.mt20]}>
          <TextLink
            linkTo={APP_SCREEN_LIST.USER_SIGNUP_SCREEN}
            title="Create Account"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonStyle: {
    backgroundColor: "#F3F5F7",
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
