import { View } from "react-native";
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

  const handleSubmitAccount = () => {
    try {
      //handleSubmitAccount
      dispatch(
        signupUserActionAction({ email, password, confirmPassword, phone })
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
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Create Account
        </Text>
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
        />
        <Input
          placeholder="Phone number"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="number-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
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
