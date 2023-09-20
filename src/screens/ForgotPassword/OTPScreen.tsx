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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearEmailPhoneOtpVerificationStatus,
  clearResendOtpStatus,
  storeOtpCode,
} from "../../reducers/session";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  resendOTPAction,
  verifyOTPActionAction,
  verifyOTPOnChangePasswordAction,
} from "../../actions/auth";
import { PURGE } from "redux-persist";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import { useToast } from "react-native-toast-notifications";

const OTPEmailScreen = () => {
  let otpInput = useRef(null) as React.RefObject<any>;

  const toast = useToast();

  const dispatch = useAppDispatch();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const navigation = useNavigation<NavigationProp<any>>();

  const [otp, setOTP] = useState("");

  const handleOnVerify = () => {
    if (otp.length < 4)
      return toast.show("Incomplete OTP", {
        type: "variant",
        animationType: "slide-in",
      });
    dispatch(clearEmailPhoneOtpVerificationStatus());
    dispatch(storeOtpCode(otp));
    dispatch(
      verifyOTPOnChangePasswordAction({
        email: session.otpChannelValue.split("_")[1],
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
      toast.show(session.verifyPhoneEmailOTPError as string, {
        type: "variant",
        animationType: "slide-in",
      });
    }

    return () => {};
  }, [session.verifyPhoneEmailOTPStatus]);

  useEffect(() => {
    if (session.resendOtpStatus === "completed") {
      toast.show("OTP sent successfully");
      dispatch(clearResendOtpStatus());
    } else if (session.resendOtpStatus === "failed") {
      toast.show(session.resendOtpError as string, {
        type: "error",
        animationType: "slide-in",
      });
      dispatch(clearResendOtpStatus());
    }
  }, [session.resendOtpStatus]);

  return (
    <KeyboardDismisser style={{ flex: 1 }}>
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
              Enter the 4 digit code sent to your email to verify it’s really
              you.
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
            <TextLink
              title="Resend Code"
              onPress={() =>
                dispatch(
                  resendOTPAction({
                    phone: session.otpChannelValue.split("_")[1],
                    type: "FORGOT_PASSWORD",
                  })
                )
              }
            />
          </View>
        </View>
        <Button
          loading={
            session.verifyPhoneEmailOTPStatus === "loading" ||
            session.resendOtpStatus === "loading"
          }
          title="Verify Email"
          onPress={handleOnVerify}
        />
      </View>
    </KeyboardDismisser>
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

export default OTPEmailScreen;
