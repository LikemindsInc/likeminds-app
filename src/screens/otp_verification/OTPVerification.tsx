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
// import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST, __ROOT_REDUX_STATE_KEY__ } from "../../constants";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearResendOtpStatus,
} from "../../reducers/userProfileSession";
import useAppDispatch from "../../hooks/useAppDispatch";
import { resendOTPAction, verifyOTPActionAction } from "../../actions/auth";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import { clearNetworkError } from "../../reducers/errorHanlder";

const OTPVerification = () => {
  const errorReducer = useAppSelector((state) => state.errorReducer);
  const [information, setInformation] = useState("");

  const dispatch = useAppDispatch();

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  // const ref1 = React.createRef<TextInput>();
  // const ref2 = React.createRef<TextInput>();
  // const ref3 = React.createRef<TextInput>();

  const navigation = useNavigation<any>();
  const [otp, setOTP] = useState("");

  const handleOnVerify = () => {
    setInformation("");
    dispatch(clearNetworkError());
    if (otp.length < 4) return setInformation("Incomplete OTP");

    dispatch(
      verifyOTPActionAction({
        phone: session.profileData.phoneNumber,
        code: otp,
      }),
    );
  };

  const handleTextChange = (text: string) => {
    setOTP(text);
  };

  useEffect(() => {
    if (session.otpVerificationStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.PERSONAL_INFORAMTION_SCREEN);
    }

    return () => {};
  }, [session.otpVerificationStatus]);

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

  const phone =
    session && session?.profileData?.phoneNumber
      ? session?.profileData?.phoneNumber
      : "your phone number";

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
              Enter the 4 digit verification code sent to{" "}
              <Text
                style={[GlobalStyles.fontWeight700, GlobalStyles.textBlack]}
              >
                {phone}
              </Text>
            </Text>
          </View>
          {errorReducer?.message ? (
            <View style={[GlobalStyles.mb20, GlobalStyles.mt10]}>
              <Text
                style={[
                  GlobalStyles.textRed,
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontWeight600,
                ]}
              >
                {errorReducer.message}
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
              Not received code yet??
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <TextLink
              title="Resend Code"
              onPress={() =>
                dispatch(
                  resendOTPAction({
                    phone: session.profileData.phoneNumber,
                    type: "SIGNUP",
                  }),
                )
              }
            />
          </View>
        </View>
        <Button
          loading={
            session.otpVerificationStatus === "loading" ||
            session.resendOtpStatus === "loading"
          }
          title="Verify"
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

export default OTPVerification;
