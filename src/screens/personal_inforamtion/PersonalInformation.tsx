import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../theme/colors';
import DropZone from '../../components/DropZone/DropZone';
import { APP_SCREEN_LIST } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { ISettingState } from '../../reducers/settings';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getCountriesAction } from '../../actions/settings';
import { PURGE } from 'redux-persist';
import {
  ISessionState,
  updatePersonalInformation,
} from '../../reducers/userProfileSession';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { FilePickerFormat } from '@app-model';
import { useToast } from 'react-native-toast-notifications';
import Sanitizer from '../../utils/sanitizer';
import { useFormik } from 'formik';
import {
  initialPersonalInformationValue,
  personalInformationValidationSchema,
} from './validator';

const PersonalInformation = () => {
  const settings = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;
  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;
  const dispatch = useAppDispatch();
  const getCountries = useCallback(() => {
    if (settings.getCountriesStatus === 'idle') {
      dispatch(getCountriesAction('d'));
    }
  }, [settings.getCountriesStatus]);

  const [country, setCountry] = useState(
    (session.profileData?.personalInformation?.country as string) || '',
  );
  const [countryOfOrigin, setCountryOfOrigin] = useState(
    session.profileData?.personalInformation?.countryOfOrigin,
  );

  const navigation = useNavigation<any>();

  const handleBackPress = () => {
    return true;
  };

  const handleBackNavigation = (e: any) => {
    e.preventDefault();
    // return false; // Allow navigation
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    navigation.addListener('beforeRemove', handleBackNavigation);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      navigation.removeListener('beforeRemove', handleBackNavigation);
    };
  }, [navigation]);
  const [resume, setResume] = useState<
    FilePickerFormat | ImagePicker.ImagePickerResult | null
  >();

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleFileSelect = (
    file: FilePickerFormat | ImagePicker.ImagePickerResult,
  ) => {
    setResume(file);
    return null;
  };

  const handleOnNextPress = (values: any) => {
    const { firstName, lastName, city, bio, resume } = values;
    console.log({
      firstName,
      lastName,
      city,
      bio,
      country,
      countryOfOrigin,
      resume,
    });
    dispatch(
      updatePersonalInformation(
        Sanitizer.sanitize({
          firstName,
          lastName,
          city,
          bio,
          country,
          countryOfOrigin,
          resume,
        }),
      ),
    );
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_PROFILE_PICTURE);
  };

  const {
    errors,
    isValid,
    values,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: initialPersonalInformationValue,
    validationSchema: personalInformationValidationSchema,
    onSubmit: handleOnNextPress,
  });

  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt10, GlobalStyles.mb30]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Personal Information
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            style={styles.inputFlex}
            placeholder="First Name"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            errorMessage={touched.firstName ? errors.firstName : null}
            autoCorrect={false}
            inputViewStyle={{ flex: 1 }}
          />
          <Input
            style={styles.inputFlex}
            placeholder="Last Name"
            autoCorrect={false}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            errorMessage={touched.lastName ? errors.lastName : null}
            inputViewStyle={{ flex: 1 }}
          />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <SelectList
            boxStyles={{
              borderWidth: 0,
              backgroundColor: colors.white,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 4,
            }}
            save="key"
            setSelected={(val: string) => setCountry(val)}
            data={(settings.countries || []).map((item) => ({
              key: item.name,
              value: item.name,
            }))}
            placeholder="Country you live in"
            fontFamily="Inter-Regular"
            arrowicon={
              <AntDesign name="caretdown" size={20} color={colors.primary} />
            }
          />
        </View>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            style={styles.inputFlex}
            placeholder="City"
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
            errorMessage={touched.city ? errors.city : null}
            autoCorrect={false}
          />
        </View>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            multiline
            inputContainer={{ height: 100, paddingVertical: 8 }}
            placeholder="Bio"
            textAlignVertical="top"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handleChange('bio')}
            onBlur={handleBlur('bio')}
            value={values.bio}
            errorMessage={touched.bio ? errors.bio : null}
          />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <SelectList
            boxStyles={{
              borderWidth: 0,
              paddingVertical: 21,
              backgroundColor: colors.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 4,
            }}
            save="key"
            fontFamily="Inter-Regular"
            setSelected={(val: string) => setCountryOfOrigin(val)}
            data={(settings.countries || []).map((item) => ({
              key: item.name,
              value: item.name,
            }))}
            placeholder="Country you are from"
            arrowicon={
              <AntDesign name="caretdown" size={20} color={colors.primary} />
            }
          />
        </View>
        <DropZone
          onSelect={handleFileSelect}
          type="all"
          style={{ height: 100 }}
          emptyIcon={<FileUploadEmptyIcon />}
        />
      </ScrollView>
      <Button
        disabled={!isValid}
        title="Continue"
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

export const FileUploadEmptyIcon = () => {
  return (
    <View>
      <View style={[GlobalStyles.displayRowCenter]}>
        <AntDesign name="clouduploado" size={24} color={colors.primary} />
      </View>
      <View style={[GlobalStyles.displayRow]}>
        <Text
          style={[
            GlobalStyles.fontSize13,
            GlobalStyles.fontInterRegular,
            GlobalStyles.textNavyBlue,
            GlobalStyles.fontWeight400,
          ]}
        >
          Resume
        </Text>
        <Text
          style={[
            GlobalStyles.fontSize13,
            GlobalStyles.fontInterRegular,
            GlobalStyles.textGrey,
            GlobalStyles.fontWeight400,
          ]}
        >
          (Optional)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputDouble: {
    flexDirection: 'row',
    gap: 20,
  },
  inputFlex: {
    // flex: 1,
  },
});

export default PersonalInformation;
