import { Text, View } from "native-base";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { StyleSheet } from "react-native";
import Button from "../../components/Button/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import { useEffect, useState } from "react";
import { requestOTPEmailAction } from "../../actions/auth";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState, storeOTPChannelValue } from "../../reducers/session";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import { useToast } from "react-native-toast-notifications";
import { clearNetworkError } from "../../reducers/errorHanlder";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;
  const toast = useToast();
  const handleOnNextPress = () => {
    if (email.trim() === '') return;

    dispatch(storeOTPChannelValue(`email_${email}`));
    dispatch(requestOTPEmailAction({ email }));
  };
  useEffect(() => {
    if (session.requestOTPEmailStatus === 'completed') {
      navigation.navigate(APP_SCREEN_LIST.FORGOT_EMAIL_OTP_SCREEN);
    } else if (session.requestOTPEmailStatus === 'failed') {
    }

    return () => {
      dispatch(clearNetworkError());
    }
  }, [session.requestOTPEmailStatus]);
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
            Enter your registered email to reset your password
          </Text>
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Email Address"
            autoCorrect={false}
            autoCapitalize={'none'}
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => setEmail(value)}
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
              navigation.navigate(APP_SCREEN_LIST.FORGOT_PHONE_SCREEN)
            }
            title="Verify With Phone Number"
          />
        </View>
      </View>
      <View style={[GlobalStyles.mb10]}>
        <Button
          loading={session.requestOTPEmailStatus === 'loading'}
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

export default ForgotPassword;
