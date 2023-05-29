import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import { Text } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST, __ROOT_REDUX_STATE_KEY__ } from "../../constants";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearEmailPhoneOtpVerificationStatus,
  storeOtpCode,
} from "../../reducers/session";
import { useToast } from "native-base";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  verifyOTPActionAction,
  verifyOTPOnChangePasswordAction,
} from "../../actions/auth";
import { PURGE } from "redux-persist";

const OTPScreen = () => {
  let otpInput = useRef(null) as React.RefObject<any>;

  const toast = useToast();

  const dispatch = useAppDispatch();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const navigation = useNavigation<any>();

  const [otp, setOTP] = useState("");

  const handleOnVerify = () => {
    if (otp.length < 4)
      return toast.show({ description: "Incomplete OTP", variant: "solid" });

    console.log("otp> ", otp);

    dispatch(clearEmailPhoneOtpVerificationStatus());

    dispatch(storeOtpCode(otp));
    dispatch(
      verifyOTPOnChangePasswordAction({
        phone: session.otpChannelValue.split("_")[1],
        code: otp,
      })
    );
  };

  const handleTextChange = (text: string) => {
    setOTP(text);
  };

  useEffect(() => {
    if (session.verifyPhoneEmailOTPStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.CREATE_PASSWORD_SCREEN);
    } else if (session.verifyPhoneEmailOTPStatus === "failed") {
      toast.show({
        description: session.verifyPhoneEmailOTPError,
        variant: "contained",
      });
    }

    return () => {};
  }, [session.verifyPhoneEmailOTPStatus]);

  return (
    <View style={[GlobalStyles.container]}>
      <View style={[styles.container]}>
        <BackButton title="Verification" iconColor={colors.primary} />
        <View style={[GlobalStyles.mb40, GlobalStyles.mt30]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textGrey,
            ]}
          >
            Enter the 4 digit code sent to your phone number to verify it’s
            really you.
          </Text>
        </View>
        <View>
          <OTPTextInput
            textInputStyle={{
              borderWidth: 4,
              borderRadius: 8,
              backgroundColor: "#F3F5F7",
              borderColor: "#F3F5F7",
            }}
            ref={(e: any) => (otpInput = e)}
            autoFocus
            tintColor={colors.primary}
            handleTextChange={handleTextChange}
          />
        </View>

        <View style={[GlobalStyles.mt20]}>
          <Text
            style={[
              GlobalStyles.textGrey,
              GlobalStyles.fontSize15,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontWeight400,
            ]}
          >
            Didn’t receive any code?
          </Text>
        </View>
        <View style={[GlobalStyles.mt10]}>
          <TextLink title="Resend Code" />
        </View>
      </View>
      <Button
        loading={session.verifyPhoneEmailOTPStatus === "loading"}
        title="Verify Phone"
        onPress={handleOnVerify}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 60,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
});

export default OTPScreen;
