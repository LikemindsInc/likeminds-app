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
import { ISessionState } from "../../reducers/session";
import useAppDispatch from "../../hooks/useAppDispatch";
import { verifyOTPActionAction } from "../../actions/auth";
import { PURGE } from "redux-persist";
import KeyboardDismisser from "../../components/KeyboardDismisser/KeyboardDismisser";
import { useToast } from "react-native-toast-notifications";

const OTPVerification = () => {
  let otpInput = useRef(null) as React.RefObject<any>;

  const toast = useToast();

  const dispatch = useAppDispatch();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const ref1 = React.createRef<TextInput>();
  const ref2 = React.createRef<TextInput>();
  const ref3 = React.createRef<TextInput>();
  const ref4 = React.createRef<TextInput>();

  const navigation = useNavigation<any>();

  const [otp, setOTP] = useState("");

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    input: string
  ) => {
    if (["Backspace"].includes(e.nativeEvent.key)) {
      console.log("key? ", e.nativeEvent.key);
      switch (input) {
        case "input2":
          return ref1.current?.focus();

        case "input3":
          return ref2.current?.focus();
        case "input4":
          return ref3.current?.focus();
      }
      return;
    }
    if (
      !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        e.nativeEvent.key
      )
    )
      e.preventDefault();
  };

  const handleOnChange = (value: string, input: string) => {
    if (value.trim() !== "" && input === "input1") {
      ref2.current?.focus();
    }

    if (value.trim() !== "" && input === "input2") {
      ref3.current?.focus();
    }

    if (value.trim() !== "" && input === "input3") {
      ref4.current?.focus();
    }
  };

  const handleOnVerify = () => {
    if (otp.length < 4) return toast.show("Incomplete OTP", { type: "normal" });

    dispatch(
      verifyOTPActionAction({
        phone: session.profileData.phoneNumber,
        code: otp,
      })
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
              Enter the 4 digit verification code sent to your phone number
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
          {/* <View style={[styles.inputWrapper]}>
          <Input
            textAlign="center"
            onKeyPress={(e) => onKeyPress(e, "input1")}
            inputRef={ref1}
            style={styles.input}
            onChangeText={(text) => handleOnChange(text, "input1")}
          />
          <Input
            onKeyPress={(e) => onKeyPress(e, "input2")}
            textAlign="center"
            inputRef={ref2}
            style={styles.input}
            onChangeText={(text) => handleOnChange(text, "input2")}
          />
          <Input
            onKeyPress={(e) => onKeyPress(e, "input3")}
            textAlign="center"
            inputRef={ref3}
            onChangeText={(text) => handleOnChange(text, "input3")}
            style={styles.input}
          />
          <Input
            onKeyPress={(e) => onKeyPress(e, "input4")}
            textAlign="center"
            inputRef={ref4}
            onChangeText={(text) => handleOnChange(text, "input4")}
            style={styles.input}
          />
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
              Not received code yet?
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <TextLink title="Resend Code" />
          </View>
        </View>
        <Button
          loading={session.otpVerificationStatus === "loading"}
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
