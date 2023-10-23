import { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { useFormik } from 'formik';
// import { useToast } from 'react-native-toast-notifications';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import { APP_SCREEN_LIST } from '../../constants';
// import reportError from '../../utils/reportError';
// import { err } from "react-native-svg/lib/typescript/xml";
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
// import {
//   ISessionState,
//   // clearSignupStatus,
//   // updatePhoneNumber,
// } from '../../reducers/userProfileSession';
// import { signupUserActionAction } from '../../actions/auth';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import { initialSignupValues, signupValidator } from './validator';
import Util from '../../utils';
import { clearSignUpError, signup } from '../../store/slice/signup';
import TextInputElement from '../../components/Input/TextInput';
// import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import { navigate } from '../../utils/NavigateUtil';
import { useNavigation } from '@react-navigation/native';
import { clearNetworkError } from '../../reducers/errorHanlder';
import { clearLoginError } from '../../store/slice/login';

const Signup = () => {
  const dispatch = useAppDispatch();
  const signupStateValues = useAppSelector((state) => state.signupReducer);

  const handleSubmitAccount = () => {
    if (!values.countryCode) {
      setFieldError('phone', 'Country code is required');
      return;
    }
    dispatch(
      signup({
        email: values.email.trim(),
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
        phone: `${values.countryCode}${values.phone}`.trim(),
      }),
    );
  };

  const {
    errors,
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

  useEffect(() => {
    if (signupStateValues.isSignup) {
      navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);
    }
    return () => {
      dispatch(clearSignUpError());
    };
  }, [signupStateValues.isSignup]);

  // handle numbers only no text
  const handlePhoneTextChange = (newText: string) => {
    const numericText = Util.getNumber(newText);
    setFieldValue('phone', numericText);
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('blur', clearState);
    return () => {
      navigation.removeListener('blur', clearState);
    };
  }, []);

  const clearState = () => {
    dispatch(clearNetworkError());
    dispatch(clearLoginError());
    dispatch(clearSignUpError());
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
      {signupStateValues && signupStateValues?.error ? (
        <View style={[GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.textRed,
            ]}
          >
            {signupStateValues?.error}
          </Text>
        </View>
      ) : null}

      <View style={[GlobalStyles.mb20]}>
        <TextInputElement
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize={'none'}
          keyboardType="email-address"
          value={values.email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          returnKeyType="done"
          error={touched.email ? errors.email : null}
        />
        <Input
          placeholder="8163113450"
          autoCorrect={false}
          autoCapitalize={'none'}
          inputViewStyle={{
            marginBottom: 6,
            marginVertical: 6,
          }}
          keyboardType="numeric"
          maxLength={10}
          value={values.phone}
          onBlur={handleBlur('phone')}
          onChangeText={(value) => handlePhoneTextChange(value)}
          returnKeyType="done"
          mode="phone-pad"
          errorMessage={touched.phone ? errors.phone : null}
          onCountryCodeSelect={(value) => setFieldValue('countryCode', value)}
        />
        <TextInputElement
          showHidePassword={true}
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={'none'}
          keyboardType="default"
          value={values.password}
          onBlur={handleBlur('password')}
          error={touched.password ? errors.password : null}
          onChangeText={handleChange('password')}
          returnKeyType="done"
        />
        <TextInputElement
          showHidePassword={true}
          secureTextEntry={true}
          placeholder="Confirm Password"
          autoCorrect={false}
          autoCapitalize={'none'}
          keyboardType="default"
          value={values.confirmPassword}
          onBlur={handleBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : null}
          onChangeText={handleChange('confirmPassword')}
          returnKeyType="done"
        />
      </View>
      <Button
        title="Create Account"
        loading={signupStateValues.loading}
        onPress={() => handleSubmit()}
        disabled={signupStateValues.loading}
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
