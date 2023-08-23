import { Keyboard, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Text } from "react-native";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST } from "../../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import reportError from "../../utils/reportError";
import { err } from "react-native-svg/lib/typescript/xml";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearSignupStatus,
  updatePhoneNumber,
} from "../../reducers/session";
import { signupUserActionAction } from "../../actions/auth";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import { useToast } from "react-native-toast-notifications";

const Signup = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [errors, setErrors] = useState<{
    email: null | string;
    password: null | string;
    phone: null | string;
    confirmPassword: null | string;
  }>({ email: null, password: null, confirmPassword: null, phone: null });

  useEffect(() => {
    setErrors({
      email: null,
      password: null,
      confirmPassword: null,
      phone: null,
    });
  }, []);

  useEffect(() => {
    if (email.trim() !== "") setErrors((state) => ({ ...state, email: null }));
    // else setErrors((state) => ({ ...state, email: "Email is required" }));
  }, [email]);

  useEffect(() => {
    if (password.trim() !== "")
      setErrors((state) => ({ ...state, password: null }));
    // else setErrors((state) => ({ ...state, password: "Password is required" }));
  }, [password]);

  useEffect(() => {
    if (phone.trim() !== "") setErrors((state) => ({ ...state, phone: null }));
    // else setErrors((state) => ({ ...state, phone: "Phone is required" }));
  }, [phone]);

  useEffect(() => {
    if (countryCode.trim() !== "" && countryCode.trim() !== "+000")
      setErrors((state) => ({ ...state, phone: null }));
    // else setErrors((state) => ({ ...state, phone: "Phone is required" }));
  }, [phone]);

  useEffect(() => {
    if (confirmPassword.trim() !== "")
      setErrors((state) => ({ ...state, confirmPassword: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     confirmPassword: "Confirm Password is required",
    //   }));
  }, [confirmPassword]);

  const handleSubmitAccount = () => {
    try {
      //handleSubmitAccount

      let formattedPhone = "";

      if (email.trim() === "")
        return setErrors((state) => ({ ...state, email: "Email is required" }));

      if (countryCode.startsWith("+000") || countryCode.trim() === "")
        return setErrors((state) => ({
          ...state,
          phone: "Please select country code",
        }));
      if (phone.trim() === "")
        return setErrors((state) => ({
          ...state,
          phone: "Phone number is required",
        }));

      if (password.trim() === "")
        return setErrors((state) => ({
          ...state,
          password: "Password is required",
        }));

      if (password !== confirmPassword)
        return setErrors((state) => ({
          ...state,
          confirmPassword: "Confirm password and Password do not match",
        }));

      if (phone.startsWith("0")) formattedPhone = phone.slice(1);
      else if (phone.startsWith("+2340")) formattedPhone = phone.slice(5);
      else if (phone.startsWith("+234")) formattedPhone = phone.slice(4);
      else formattedPhone = phone;

      dispatch(
        signupUserActionAction({
          email,
          password,
          confirmPassword,
          phone: `${countryCode}${formattedPhone}`,
        })
      );
    } catch (error: any) {
      reportError(error);
    }
  };
  const handleNextNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);
  };
  useEffect(() => {
    if (
      session.signingUpStatus === "completed" &&
      session.signingUpSuccess !== ""
    ) {
      dispatch(updatePhoneNumber(`${countryCode}${phone}`));
      toast.show(session.signingUpSuccess, { type: "normal" });
      handleNextNavigation();
      dispatch(clearSignupStatus());
      12;
    }
  }, [session.signingUpStatus]);

  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Create Account" />
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
          Enter the following information to create a new account
        </Text>
      </View>
      <View style={[GlobalStyles.mb20]}>
        <Input
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          returnKeyType="done"
          errorMessage={errors.email}
        />
        <Input
          placeholder="8163113450"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          returnKeyType="done"
          mode="phone-pad"
          errorMessage={errors.phone}
          onCountryCodeSelect={(value) => setCountryCode(value)}
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          secureTextEntry
          value={password}
          errorMessage={errors.password}
          onChangeText={(text) => setPassword(text)}
          returnKeyType="done"
        />
        <Input
          placeholder="Confirm Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          secureTextEntry
          value={confirmPassword}
          errorMessage={errors.confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          returnKeyType="done"
        />
      </View>
      <Button
        title="Create Account"
        loading={session.signingUpStatus === "loading"}
        onPress={handleSubmitAccount}
      />
      <View style={[GlobalStyles.mt20, GlobalStyles.mb20]}>
        <Text
          style={[
            GlobalStyles.textGrey,
            GlobalStyles.fontSize15,
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontWeight400,
          ]}
        >
          Already have an account?
        </Text>
      </View>
      <TextLink title="Login" linkTo={APP_SCREEN_LIST.LOGIN_SCREEN} />
    </View>
  );
};

export default Signup;
