import { Text, View } from "native-base";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { StyleSheet } from "react-native";
import Button from "../../components/Button/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  storeOTPChannelValue,
} from "../../reducers/userProfileSession";
import { requestOTPPhoneAction } from "../../actions/auth";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import Util from "../../utils";
import { clearNetworkError } from "../../reducers/errorHanlder";

const RecoverWithPhone = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [phone, setPhone] = useState("");
  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;
  const dispatch = useAppDispatch();
  const [countryCode, setCountryCode] = useState("");

  const errorReducer = useAppSelector((state) => state.errorReducer);

  const handleOnNextPress = () => {
    let formattedPhone = "";
    dispatch(clearNetworkError());
    if (!countryCode.trim()) return setErrorMessage("Please select country");

    if (phone.trim() === "")
      return setErrorMessage("Please provide your phone number");

    setErrorMessage(null);

    dispatch(storeOTPChannelValue(`phone_${countryCode}${formattedPhone}`));
    dispatch(requestOTPPhoneAction({ phone: `${countryCode}${phone}` }));
  };

  useEffect(() => {
    if (session.requestOTPPhoneStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.FORGOT_PHONE_OTP_SCREEN);
    } else if (
      session.requestOTPPhoneStatus === "failed" &&
      session.requestOTPEmailError?.trim() !== ""
    ) {
      // toast.show(session.requestOTPEmailError as string, { type: "normal" });
    }
  }, [session.requestOTPPhoneStatus]);

  const handleChange = (text: string) => {
    if (text.length > 10) return;
    const newNumberText = Util.getNumber(text);
    setPhone(newNumberText);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <BackButton title="Forgot Password" />
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
            Enter your registered phone number to reset your password
          </Text>
        </View>
        {errorReducer.message ? (
          <View style={[GlobalStyles.mb20]}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textRed,
              ]}
            >
              {errorReducer.message}
            </Text>
          </View>
        ) : null}
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Phone Number"
            autoCorrect={false}
            autoCapitalize={"none"}
            keyboardType="default"
            value={phone}
            mode="phone-pad"
            onChangeText={(value) => handleChange(value)}
            onCountryCodeSelect={(value) => setCountryCode(value)}
            errorMessage={errorMessage}
          />
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
            Or
          </Text>
        </View>
        <View style={[GlobalStyles.mb40]}>
          <TextLink
            onPress={() =>
              navigation.navigate(APP_SCREEN_LIST.FORGOT_PASSWORD_SCREEN)
            }
            title="Verify With Email"
          />
        </View>
      </View>
      <View style={[GlobalStyles.mb10]}>
        <Button
          loading={session.requestOTPPhoneStatus === "loading"}
          onPress={handleOnNextPress}
          title="Send Code"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecoverWithPhone;
