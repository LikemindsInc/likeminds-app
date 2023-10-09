import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import { Text } from "react-native";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST, __ROOT_REDUX_STATE_KEY__ } from "../../constants";
import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearEmailPhoneOtpVerificationStatus,
  clearResendOtpStatus,
  storeOtpCode,
} from "../../reducers/userProfileSession";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  resendOTPAction,
  verifyOTPOnChangePasswordAction,
} from "../../actions/auth";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import { clearNetworkError } from "../../reducers/errorHanlder";
import Util from "../../utils";

const OTPEmailScreen = () => {
  const dispatch = useAppDispatch();
  const [information, setInformation] = useState("");

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  const error = useAppSelector((state) => state.errorReducer);

  const navigation = useNavigation<NavigationProp<any>>();

  const [otp, setOTP] = useState("");

  const handleOnVerify = () => {
    setInformation("");

    if (otp.length < 4) return setInformation("Incomplete OTP");
    dispatch(clearNetworkError());
    dispatch(clearEmailPhoneOtpVerificationStatus());
    dispatch(storeOtpCode(otp));
    dispatch(
      verifyOTPOnChangePasswordAction({
        email: session.otpChannelValue.split("_")[1],
        code: otp,
      }),
    );
  };

  const handleTextChange = (text: string) => {
    const numericText = Util.getNumber(text);
    setOTP(numericText);
  };

  useEffect(() => {
    if (session.verifyPhoneEmailOTPStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.CREATE_PASSWORD_SCREEN);
      dispatch(clearNetworkError());
      dispatch(clearEmailPhoneOtpVerificationStatus());
    } else if (session.verifyPhoneEmailOTPStatus === "failed") {
      setTimeout(() => {
        dispatch(clearEmailPhoneOtpVerificationStatus());
        dispatch(clearNetworkError());
      }, 2500);
    }

    return () => {};
  }, [session.verifyPhoneEmailOTPStatus]);

  useEffect(() => {
    setInformation("");
    if (session.resendOtpStatus === "completed") {
      setInformation("OTP sent successfully");
      dispatch(clearResendOtpStatus());
    } else if (session.resendOtpStatus === "failed") {
      setInformation("");
      dispatch(clearResendOtpStatus());
    }
  }, [session.resendOtpStatus]);

  const email =
    session && Object.keys(session).length > 0
      ? session?.otpChannelValue.split("_")[1]
      : "your email";

  return (
    <KeyboardDismisser style={{ flex: 1 }}>
      <View style={[GlobalStyles.container]}>
        <View style={[styles.container]}>
          <BackButton title="Verification" iconColor={colors.primary} />
          <View style={[GlobalStyles.mb20, GlobalStyles.mt20]} />
          <View style={[GlobalStyles.mb40]}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.fontWeight700,
                GlobalStyles.textGrey,
              ]}
            >
              Enter the 4 digit code sent to{" "}
              <Text
                style={[GlobalStyles.fontWeight700, GlobalStyles.textBlack]}
              >
                {email}
              </Text>
            </Text>
          </View>
          {error.message ? (
            <View style={[GlobalStyles.mb20, GlobalStyles.mt10]}>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.textGrey,
                  GlobalStyles.textRed,
                ]}
              >
                {session.verifyPhoneEmailOTPError || error.message}
              </Text>
            </View>
          ) : null}

          {information ? (
            <View style={[GlobalStyles.mb20, GlobalStyles.mt10]}>
              <Text
                style={[
                  { color: colors.primary },
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontWeight600,
                ]}
              >
                {information}
              </Text>
            </View>
          ) : null}

          <View>
            <OTPTextInput
              textInputStyle={{
                borderWidth: 4,
                borderRadius: 8,
                backgroundColor: "#F3F5F7",
                borderColor: "#F3F5F7",
              }}
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
                  }),
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
