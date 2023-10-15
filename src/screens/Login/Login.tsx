import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { GlobalStyles } from '../../theme/GlobalStyles';
import TextLink from '../../components/TextLink/TextLink';
import { APP_SCREEN_LIST, PENDING_OTP_MESSAGE } from '../../constants';
import useAppSelector from '../../hooks/useAppSelector';
import {
  ISessionState,
  updatePhoneNumber,
} from '../../reducers/userProfileSession';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loginUserActionAction } from '../../actions/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import { initialLoginValue, loginValidator } from './validator';
import { clearNetworkError } from '../../reducers/errorHanlder';
import { login } from '../../store/slice/login';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  const setting = useAppSelector((state) => state.settingReducer);
  const errorReducer = useAppSelector((state) => state.errorReducer);

  const { data, error, loading, isLogin } = useAppSelector(
    (state) => state.loginReducer,
  );

  const handleOnLogin = () => {
    dispatch(
      loginUserActionAction({
        email: values.email.trim(),
        password: values.password.trim(),
      }),
    );
    dispatch(
      login({ email: values.email.trim(), password: values.password.trim() }),
    );
  };

  // formik validation amd error handling
  const {
    errors,
    isValid,
    values,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: initialLoginValue,
    validationSchema: loginValidator,
    onSubmit: handleOnLogin,
  });

  useEffect(() => {
    if (session.signingInStatus === 'completed') {
      if (!setting.userInfo?.isVerified) {
        dispatch(updatePhoneNumber(setting.userInfo?.phone as string));
        navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);

        return;
      }
      navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN);
    } else if (session.signingInStatus === 'failed') {
    }
  }, [session.signingInStatus]);

  useEffect(() => {
    if (errorReducer.message === PENDING_OTP_MESSAGE) {
      navigation.navigate(APP_SCREEN_LIST.OTP_VERIFICATION_SCREEN);
      dispatch(clearNetworkError());
    }
    // console.log("error> ", errorReducer.message);
    return () => {
      dispatch(clearNetworkError());
    };
  }, [errorReducer.message]);

  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Login" />
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

      {error ? (
        <View style={[GlobalStyles.mb20]}>
          <Text style={[GlobalStyles.textRed, GlobalStyles.fontInterRegular]}>
            {error}
          </Text>
        </View>
      ) : null}

      <View>
        <View style={[GlobalStyles.mb20]}>
          <Input
            placeholder="Email Address"
            autoCorrect={false}
            autoCapitalize={'none'}
            value={values.email}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            returnKeyType="done"
            errorMessage={touched.email ? errors.email : null}
          />
          <Input
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize={'none'}
            onBlur={handleBlur('password')}
            secureTextEntry
            value={values.password}
            keyboardType="default"
            onChangeText={handleChange('password')}
            returnKeyType="done"
            errorMessage={touched.password ? errors.password : null}
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
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textPrimary,
            ]}
          >
            Forgot Your Password?
          </Text>
        </TouchableOpacity>
        <Button
          loading={session.signingInStatus === 'loading'}
          onPress={() => handleSubmit()}
          title="Login"
          disabled={!isValid}
        />

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
    </View>
  );
};

export default Login;
