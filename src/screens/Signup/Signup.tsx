import { View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Text } from "react-native";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Create Account
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
          Enter the following information to create a new account
        </Text>
      </View>
      <View style={[GlobalStyles.mb20]}>
        <Input
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="email-address"
        />
        <Input
          placeholder="Phone number"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
        />
        <Input
          placeholder="Phone number"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
        />
      </View>
      <Button
        title="Create Account"
        onPress={() =>
          navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN)
        }
      />
      <View style={[GlobalStyles.mt20, GlobalStyles.mb20]}>
        <Text
          style={[
            GlobalStyles.textGrey,
            GlobalStyles.fontSize15,
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontWeight400,
          ]}
        >
          Already have an account?
        </Text>
      </View>
      <TextLink title="Login" linkTo={APP_SCREEN_LIST.LOGIN_SCREEN} />
    </View>
  );
};

export default Signup;
