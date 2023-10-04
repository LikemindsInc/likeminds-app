import {
  StyleSheet,
  View,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import { Text } from "react-native";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST, __ROOT_REDUX_STATE_KEY__ } from "../../constants";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
  verifyOTPOnChangePasswordAction,
} from "../../actions/auth";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import { clearNetworkError } from "../../reducers/errorHanlder";

const OTPScreen = () => {
const [information, setInformation] = useState('')

  const dispatch = useAppDispatch();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const navigation = useNavigation<any>();

  const [otp, setOTP] = useState("");

  const error = useAppSelector((state) => state.errorReducer);

  const handleOnVerify = () => {
    setInformation('')
    console.log("handleOnVerify")
    if (otp.length < 4) return setInformation("Incomplete OTP");

    dispatch(clearEmailPhoneOtpVerificationStatus());

    dispatch(storeOtpCode(otp));
    dispatch(
      verifyOTPOnChangePasswordAction({
        phone: session.otpChannelValue.split("_")[1],
        code: `${otp}`,
      })
    );
  };

  const handleTextChange = (text: string) => {
    setOTP(text);
  };

  useEffect(() => {
    setInformation('')
    if (session.resendOtpStatus === "completed") {
      // toast.show("OTP sent successfully");
      dispatch(clearResendOtpStatus());
      dispatch(clearNetworkError());
    } else if (session.resendOtpStatus === "failed") {
      // toast.show(session.resendOtpError as string, {
      //   type: "error",
      //   animationType: "slide-in",
      // });
      setTimeout(() => {
        dispatch(clearResendOtpStatus());
        dispatch(clearNetworkError());
      }, 2500);
    }
  }, [session.resendOtpStatus]);

  useEffect(() => {
    if (session.verifyPhoneEmailOTPStatus === "completed") {
      dispatch(clearEmailPhoneOtpVerificationStatus());
      dispatch(clearNetworkError());
      navigation.navigate(APP_SCREEN_LIST.CREATE_PASSWORD_SCREEN);
    } else if (session.verifyPhoneEmailOTPStatus === "failed") {
      setTimeout(() => {
        dispatch(clearEmailPhoneOtpVerificationStatus());
        dispatch(clearNetworkError());
      }, 2500);
    }
  }, [session.verifyPhoneEmailOTPStatus]);

  const phone  = session && session?.otpChannelValue ? session?.otpChannelValue.split('_')[1] : `your phone number to verify it’s
  really you.`

  return (
    <KeyboardDismisser style={[GlobalStyles.flexOne]}>
      <View style={[GlobalStyles.container]}>
        <View style={[styles.container]}>
          <BackButton title="Verification" iconColor={colors.primary} />
          <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
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
              Enter the 4 digit code sent to <Text style={[
                GlobalStyles.fontWeight700,
                GlobalStyles.textBlack
              ]}>{phone}</Text>
            </Text>
          </View>
          {
            error.message || session.verifyPhoneEmailOTPError ? ( <View style={[
              GlobalStyles.mb20
            ]}>
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
          </View>) : null
          }
          {information ? (
						<View style={[GlobalStyles.mb20, GlobalStyles.mt10]}>
							<Text style={[
                {color: colors.primary},
                GlobalStyles.fontSize13,
                GlobalStyles.fontWeight600
              ]}>{information}</Text>
						</View>
          ): null }
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
          title="Verify Phone"
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

export default OTPScreen;
