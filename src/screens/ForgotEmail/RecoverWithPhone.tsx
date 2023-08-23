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
import { ISessionState, storeOTPChannelValue } from "../../reducers/session";
import { requestOTPPhoneAction } from "../../actions/auth";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import { useToast } from "react-native-toast-notifications";

const RecoverWithPhone = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [phone, setPhone] = useState("");
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;
  const dispatch = useAppDispatch();
  const [countryCode, setCountryCode] = useState("");
  const toast = useToast();
  const handleOnNextPress = () => {
    let formattedPhone = "";
    if (countryCode.startsWith("+000") || countryCode.trim() === "")
      return toast.show("Please select country", { type: "normal" });
    if (phone.trim() === "")
      return toast.show("Please provide your phone number", { type: "normal" });

    if (phone.startsWith("0")) formattedPhone = phone.slice(1);
    else if (phone.startsWith("+2340")) formattedPhone = phone.slice(5);
    else if (phone.startsWith("+234")) formattedPhone = phone.slice(4);
    else formattedPhone = phone;

    dispatch(storeOTPChannelValue(`phone_${countryCode}${formattedPhone}`));
    dispatch(
      requestOTPPhoneAction({ phone: `${countryCode}${formattedPhone}` })
    );
  };
  useEffect(() => {
    if (session.requestOTPPhoneStatus === "completed") {
      setTimeout(() => {
        navigation.navigate(APP_SCREEN_LIST.FORGOT_PHONE_OTP_SCREEN);
      }, 200);
    } else if (
      session.requestOTPPhoneStatus === "failed" &&
      session.requestOTPEmailError?.trim() !== ""
    ) {
      toast.show(session.requestOTPEmailError as string, { type: "normal" });
    }
  }, [session.requestOTPPhoneStatus]);
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
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Phone Number"
            autoCorrect={false}
            autoCapitalize={"none"}
            keyboardType="default"
            value={phone}
            mode="phone-pad"
            onChangeText={(value) => setPhone(value)}
            onCountryCodeSelect={(value) => setCountryCode(value)}
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
