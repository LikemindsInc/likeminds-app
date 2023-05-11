import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import { Text } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST } from "../../constants";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OTPVerification = () => {
  const ref1 = React.createRef<TextInput>();
  const ref2 = React.createRef<TextInput>();
  const ref3 = React.createRef<TextInput>();
  const ref4 = React.createRef<TextInput>();

  const navigation = useNavigation<any>();

  return (
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
        <View style={[styles.inputWrapper]}>
          <Input inputRef={ref1} style={styles.input} />
          <Input inputRef={ref2} style={styles.input} />
          <Input inputRef={ref3} style={styles.input} />
          <Input inputRef={ref4} style={styles.input} />
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
            Don’t have an account yet?
          </Text>
        </View>
        <View style={[GlobalStyles.mt10]}>
          <TextLink title="Resend Code" />
        </View>
      </View>
      <Button
        title="Verify"
        onPress={() =>
          navigation.navigate(APP_SCREEN_LIST.PERSONAL_INFORAMTION_SCREEN)
        }
      />
    </View>
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
