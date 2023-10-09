import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { useFormik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import { APP_SCREEN_LIST } from "../../constants";
import reportError from "../../utils/reportError";
// import { err } from "react-native-svg/lib/typescript/xml";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  ISessionState,
  clearSignupStatus,
  updatePhoneNumber,
} from "../../reducers/userProfileSession";
import { signupUserActionAction } from "../../actions/auth";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import { initialSignupValues, signupValidator } from "./validator";
import Util from "../../utils";

const Signup = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;
  const errorReducer = useAppSelector((state) => state.errorReducer);

  const handleSubmitAccount = () => {
    if (!values.countryCode) {
      setFieldError("phone", "Country code is required");
      return;
    }
    try {
      dispatch(
        signupUserActionAction({
          email: values.email.trim(),
          password: values.password.trim(),
          confirmPassword: values.confirmPassword.trim(),
          phone: `${values.countryCode}${values.phone}`.trim(),
        }),
      );
    } catch (error: any) {
      reportError(error);
    }
  };

  const {
    errors,
    isValid,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    handleBlur,
    setFieldError,
  } = useFormik({
    initialValues: initialSignupValues,
    validationSchema: signupValidator,
    onSubmit: handleSubmitAccount,
  });

  const handleNextNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);
  };

  useEffect(() => {
    if (
      session.signingUpStatus === "completed" &&
      session.signingUpSuccess !== ""
    ) {
      dispatch(updatePhoneNumber(`${values.countryCode}${values.phone}`));
      handleNextNavigation();
      dispatch(clearSignupStatus());
      // 12;
    }
  }, [session.signingUpStatus]);

  const navigation = useNavigation<NavigationProp<any>>();

  // handle numbers only no text
  const handlePhoneTextChange = (newText: string) => {
    const numericText = Util.getNumber(newText);
    setFieldValue("phone", numericText);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Create Account" />
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
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="email-address"
          value={values.email}
          onBlur={handleBlur("email")}
          onChangeText={handleChange("email")}
          returnKeyType="done"
          errorMessage={touched.email ? errors.email : null}
        />
        <Input
          placeholder="8163113450"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="numeric"
          maxLength={10}
          value={values.phone}
          onBlur={handleBlur("phone")}
          onChangeText={(value) => handlePhoneTextChange(value)}
          returnKeyType="done"
          mode="phone-pad"
          errorMessage={touched.phone ? errors.phone : null}
          onCountryCodeSelect={(value) => setFieldValue("countryCode", value)}
        />
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          secureTextEntry
          value={values.password}
          onBlur={handleBlur("password")}
          errorMessage={touched.password ? errors.password : null}
          onChangeText={handleChange("password")}
          returnKeyType="done"
        />
        <Input
          placeholder="Confirm Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
          secureTextEntry
          value={values.confirmPassword}
          onBlur={handleBlur("confirmPassword")}
          errorMessage={touched.confirmPassword ? errors.confirmPassword : null}
          onChangeText={handleChange("confirmPassword")}
          returnKeyType="done"
        />
      </View>
      <Button
        title="Create Account"
        loading={session.signingUpStatus === "loading"}
        onPress={() => handleSubmit()}
        disabled={!isValid}
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
