import { Text, View, useToast } from "native-base";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { StyleSheet } from "react-native";
import Button from "../../components/Button/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState } from "../../reducers/session";
import { useEffect, useState } from "react";
import { changePasswordAction } from "../../actions/auth";

const CreatePassword = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;
  const handleOnNextPress = () => {
    if (password.trim() === "")
      return toast.show({
        description: "Password can not be empty",
        variant: "contained",
      });
    if (password !== confirmPassword)
      return toast.show({ description: "Passwords do not match" });
    const key = session.otpChannelValue.split("_")[0];
    dispatch(
      changePasswordAction({
        [key]: session.otpChannelValue.split("_")[1],
        newPassword: password,
        code: session.otpCode,
      })
    );
  };

  useEffect(() => {
    if (session.changePasswordOTpStatus === "completed") {
      toast.show({
        description: "Password changed successfully. Please login with your",
        variant: "contained",
      });
      navigation.navigate(APP_SCREEN_LIST.LOGIN_SCREEN);
    } else if (session.changePasswordOTpStatus === "failed") {
      toast.show({
        description: session.changePasswordOTpError,
        variant: "contained",
      });
    }

    return () => {};
  }, [session.changePasswordOTpStatus]);

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
            Create Password
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
            Please create a new password to access your account.
          </Text>
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Create password"
            autoCorrect={false}
            autoCapitalize={"none"}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Confirm password"
            autoCorrect={false}
            autoCapitalize={"none"}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>
      </View>
      <View style={[GlobalStyles.mb10]}>
        <Button
          loading={session.changePasswordOTpStatus === "loading"}
          onPress={handleOnNextPress}
          title="Change Password"
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

export default CreatePassword;
