import { Text, View, useToast } from "native-base";
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

const RecoverWithPhone = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [phone, setPhone] = useState("");
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleOnNextPress = () => {
    if (phone.trim() === "")
      return toast.show({
        description: "Please provide your phone number",
        variant: "contained",
      });
    dispatch(storeOTPChannelValue(`phone_${phone}`));
    dispatch(requestOTPPhoneAction({ phone }));
  };
  useEffect(() => {
    if (session.requestOTPPhoneStatus === "completed") {
      toast.show({ description: session.requestOTPEmailSuccess });
      setTimeout(() => {
        navigation.navigate(APP_SCREEN_LIST.FORGOT_PHONE_OTP_SCREEN);
      }, 200);
    } else if (session.requestOTPPhoneStatus === "failed") {
      toast.show({ description: session.requestOTPEmailError });
    }
  }, [session.requestOTPPhoneStatus]);
  return (
    <View style={[GlobalStyles.container]}>
      <View style={styles.container}>
        <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize20,
              GlobalStyles.fontWeight700,
              { lineHeight: 30 },
            ]}
          >
            Forgot Password
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
            Enter your registered phone number to reset your password
          </Text>
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Phone Number"
            autoCorrect={false}
            autoCapitalize={"none"}
            keyboardType="number-pad"
            value={phone}
            onChangeText={(value) => setPhone(value)}
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
