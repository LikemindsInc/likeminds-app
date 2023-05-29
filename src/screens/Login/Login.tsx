import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { FC, useEffect, useState } from "react";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST } from "../../constants";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState } from "../../reducers/session";
import useAppDispatch from "../../hooks/useAppDispatch";
import { loginUserActionAction } from "../../actions/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const IconButton: FC<{ image: any }> = ({ image }) => {
  return (
    <TouchableOpacity style={[styles.iconButtonStyle]}>
      <Image
        style={{ width: 30 }}
        source={image}
        resizeMethod="auto"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<any>>();

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const dispatch = useAppDispatch();

  const handleOnLogin = () => {
    dispatch(loginUserActionAction({ email, password }));
  };

  useEffect(() => {
    if (session.signingInStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN);
    }
  }, [session.signingInStatus]);

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
          Login
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
          Enter your email address and password to login to your account
        </Text>
      </View>
      <View style={[GlobalStyles.mb20]}>
        <Input
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize={"none"}
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(APP_SCREEN_LIST.FORGOT_PASSWORD_SCREEN)
        }
        style={[GlobalStyles.mb40]}
      >
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight700,
            GlobalStyles.textPrimary,
          ]}
        >
          Forgot Your Password?
        </Text>
      </TouchableOpacity>
      <Button
        loading={session.signingInStatus === "loading"}
        onPress={handleOnLogin}
        title="Login"
      />
      <View style={[GlobalStyles.mt40]}>
        <Text
          style={[
            GlobalStyles.textGrey,
            GlobalStyles.fontSize15,
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontWeight400,
          ]}
        >
          Or continue with
        </Text>
      </View>
      <View style={[GlobalStyles.mt20, GlobalStyles.flewRow]}>
        <IconButton image={require("../../../assets/linkedln.png")} />
        <IconButton image={require("../../../assets/facebook.png")} />
        <IconButton image={require("../../../assets/instagram.png")} />
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
      <View style={[GlobalStyles.mt20]}>
        <TextLink
          linkTo={APP_SCREEN_LIST.USER_SIGNUP_SCREEN}
          title="Create Account"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonStyle: {
    backgroundColor: "#F3F5F7",
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
