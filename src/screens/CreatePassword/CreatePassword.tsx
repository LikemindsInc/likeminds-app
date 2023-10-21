import { Text, View, useToast } from 'native-base';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Input from '../../components/Input/Input';
import TextLink from '../../components/TextLink/TextLink';
import { StyleSheet } from 'react-native';
import Button from '../../components/Button/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  APP_SCREEN_LIST,
  CONTAINS_DIGIT_PASSWORD_REGEX,
  CONTAINS_LOWERCASE_PASSWORD_REGEX,
  CONTAINS_UPPERCASE_PASSWORD_REGEX,
  CONTAINS_WORD_PASSWORD_REGEX,
  MINIMUM_PASSWORD_LENGTH_REGEX,
  PASSWORD_REGEX,
} from '../../constants';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
  ISessionState,
  clearChangePasswordError,
} from '../../reducers/userProfileSession';
import { useEffect, useState } from 'react';
import { changePasswordAction } from '../../actions/auth';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../theme/colors';

const CreatePassword = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAllPasswordCriteriaMet, setAllPasswordCriteriaMet] = useState(false);
  const [containsLowercase, setContainsLowerCase] = useState(false);
  const [containsUppercase, setContainsUpperCase] = useState(false);
  const [containsDigit, setContainsDigit] = useState(false);
  const [containsMiniumuLength, setContainsMiniumuLength] = useState(false);
  const [containsCharacter, setContainsCharacter] = useState(false);
  const [errors, setErrors] = useState<{
    confirmPassword: null | string;
    password: null | string;
  }>({ confirmPassword: null, password: null });

  useEffect(() => {
    setErrors({ confirmPassword: null, password: null });
  }, []);

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;
  const isPasswordValid = () => {
    if (PASSWORD_REGEX.test(password)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (isPasswordValid()) {
      setAllPasswordCriteriaMet(true);
    } else {
      setAllPasswordCriteriaMet(false);
    }
    setErrors({ confirmPassword: null, password: null });
    dispatch(clearChangePasswordError());
  }, [password]);

  useEffect(() => {
    if (CONTAINS_LOWERCASE_PASSWORD_REGEX.test(password)) {
      setContainsLowerCase(true);
    } else {
      setContainsLowerCase(false);
    }
  }, [password]);
  useEffect(() => {
    if (CONTAINS_UPPERCASE_PASSWORD_REGEX.test(password)) {
      setContainsUpperCase(true);
    } else {
      setContainsUpperCase(false);
    }
  }, [password]);

  useEffect(() => {
    if (CONTAINS_DIGIT_PASSWORD_REGEX.test(password)) {
      setContainsDigit(true);
    } else {
      setContainsDigit(false);
    }
  }, [password]);

  useEffect(() => {
    if (CONTAINS_WORD_PASSWORD_REGEX.test(password)) {
      setContainsCharacter(true);
    } else {
      setContainsCharacter(false);
    }
  }, [password]);
  useEffect(() => {
    if (MINIMUM_PASSWORD_LENGTH_REGEX.test(password)) {
      setContainsMiniumuLength(true);
    } else {
      setContainsMiniumuLength(false);
    }
  }, [password]);

  useEffect(() => {
    if (password.trim() === confirmPassword.trim()) {
      setErrors({ confirmPassword: null, password: null });
    }
  }, [confirmPassword]);

  const handleOnNextPress = () => {
    if (!isPasswordValid()) {
      setErrors((state) => ({
        ...state,
        confirmPassword: 'Password do not meet the requirements',
      }));

      return;
    }
    if (password !== confirmPassword)
      return setErrors((state) => ({
        ...state,
        confirmPassword: 'Password and Confirm Password do not match',
      }));
    const key = session.otpChannelValue.split('_')[0];
    dispatch(
      changePasswordAction({
        [key]: session.otpChannelValue.split('_')[1],
        newPassword: password.trim(),
        code: session.otpCode,
      }),
    );
  };

  useEffect(() => {
    if (session.changePasswordOTpStatus === 'completed') {
      navigation.navigate(APP_SCREEN_LIST.LOGIN_SCREEN);
    } else if (session.changePasswordOTpStatus === 'failed') {
    }

    return () => {};
  }, [session.changePasswordOTpStatus]);

  useEffect(() => {
    setErrors((state) => ({
      ...state,
      confirmPassword: session.changePasswordOTpError as string,
    }));
  }, [session.changePasswordOTpError]);

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
            autoCapitalize={'none'}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View style={[]}>
          <Input
            placeholder="Confirm password"
            autoCorrect={false}
            autoCapitalize={'none'}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            errorMessage={errors.confirmPassword}
          />
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              { color: '#88969D' },
              GlobalStyles.fontSize15,
              GlobalStyles.fontWeight400,
            ]}
          >
            A strong password must contain
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.mb10,
            { flexDirection: 'row', gap: 8, alignItems: 'center' },
          ]}
        >
          <AntDesign
            name="check"
            size={20}
            color={
              isAllPasswordCriteriaMet || containsMiniumuLength
                ? colors.primary
                : colors.grey
            }
          />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              {
                color:
                  isAllPasswordCriteriaMet || containsMiniumuLength
                    ? colors.navyBlue
                    : colors.grey,
              },
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            Minimum 8 characters
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.mb10,
            { flexDirection: 'row', gap: 8, alignItems: 'center' },
          ]}
        >
          <AntDesign
            name="check"
            size={20}
            color={
              isAllPasswordCriteriaMet || containsUppercase
                ? colors.primary
                : colors.grey
            }
          />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              {
                color:
                  isAllPasswordCriteriaMet || containsUppercase
                    ? colors.navyBlue
                    : colors.grey,
              },
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            At least 1 upper case letter
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.mb10,
            { flexDirection: 'row', gap: 8, alignItems: 'center' },
          ]}
        >
          <AntDesign
            name="check"
            size={20}
            color={
              isAllPasswordCriteriaMet || containsLowercase
                ? colors.primary
                : colors.grey
            }
          />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              {
                color:
                  isAllPasswordCriteriaMet || containsLowercase
                    ? colors.navyBlue
                    : colors.grey,
              },
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            At least 1 lower case letter
          </Text>
        </View>

        <View
          style={[
            GlobalStyles.mb10,
            { flexDirection: 'row', gap: 8, alignItems: 'center' },
          ]}
        >
          <AntDesign
            name="check"
            size={20}
            color={
              isAllPasswordCriteriaMet || containsDigit
                ? colors.primary
                : colors.grey
            }
          />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              {
                color:
                  isAllPasswordCriteriaMet || containsDigit
                    ? colors.navyBlue
                    : colors.grey,
              },
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            At least 1 numeric character
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.mb10,
            { flexDirection: 'row', gap: 8, alignItems: 'center' },
          ]}
        >
          <AntDesign
            name="check"
            size={20}
            color={
              isAllPasswordCriteriaMet || containsCharacter
                ? colors.primary
                : colors.grey
            }
          />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              {
                color:
                  isAllPasswordCriteriaMet || containsCharacter
                    ? colors.navyBlue
                    : colors.grey,
              },
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            At least 1 special character ( , $ # @ . * )
          </Text>
        </View>
      </View>
      <View style={[GlobalStyles.mb10]}>
        <Button
          loading={session.changePasswordOTpStatus === 'loading'}
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
