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
import { useToast } from "native-base";
import BackButton from "../../components/Navigation/BackButton/BackButton";

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

  const handleSubmitAccount = () => {
    try {
      //handleSubmitAccount
      if (email.trim() === "")
        return toast.show({
          description: "Email is required",
          variant: "contained",
        });

      if (countryCode.startsWith("+000") || countryCode.trim() === "")
        return toast.show({
          description: "Phone number is invalid",
          variant: "contained",
        });

      if (password.trim() === "")
        return toast.show({
          description: "Password is required",
          variant: "contained",
        });

      if (password !== confirmPassword)
        return toast.show({
          description: "Passwords do not match",
          variant: "contained",
        });
      dispatch(
        signupUserActionAction({
          email,
          password,
          confirmPassword,
          phone: `${countryCode}${phone}`,
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
      dispatch(updatePhoneNumber(phone));
      toast.show({ description: session.signingUpSuccess, variant: "subtle" });
      handleNextNavigation();
      dispatch(clearSignupStatus());
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
          onCountryCodeSelect={(value) => setCountryCode(value)}
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          secureTextEntry
          value={password}
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
