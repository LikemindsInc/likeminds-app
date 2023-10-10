import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { CheckIcon, Select } from 'native-base';
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
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { FilePickerFormat } from '@app-model';
import { useToast } from 'react-native-toast-notifications';
import Sanitizer from '../../utils/sanitizer';

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

  const [firstName, setFirstName] = useState(
    session.profileData?.personalInformation?.firstName,
  );
  const [lastName, setLastName] = useState(
    session.profileData?.personalInformation?.lastName,
  );
  const [city, setCity] = useState(
    session.profileData?.personalInformation?.city,
  );
  const [bio, setBio] = useState(session.profileData?.personalInformation?.bio);
  const [country, setCountry] = useState(
    (session.profileData?.personalInformation?.country as string) || '',
  );
  const [countryOfOrigin, setCountryOfOrigin] = useState(
    session.profileData?.personalInformation?.countryOfOrigin,
  );

  const [errors, setErrors] = useState<{
    firstName: null | string;
    lastName: null | string;
    city: string | null;
    bio: string | null;
  }>({ firstName: null, lastName: null, city: null, bio: null });

  useEffect(() => {
    setErrors({ firstName: null, lastName: null, city: null, bio: null });
  }, []);

  useEffect(() => {
    if (firstName.trim() !== '')
      setErrors((state) => ({ ...state, firstName: null }));
    // else
    //   setErrors((state) => ({ ...state, firstName: "First name is required" }));
  }, [firstName]);

  useEffect(() => {
    if (lastName.trim() !== '')
      setErrors((state) => ({ ...state, lastName: null }));
    // else
    //   setErrors((state) => ({ ...state, lastName: "Last name is required" }));
  }, [lastName]);

  useEffect(() => {
    if (bio.trim() !== '') setErrors((state) => ({ ...state, bio: null }));
    // else setErrors((state) => ({ ...state, bio: "Bio is required" }));
  }, [bio]);

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

  useEffect(() => {
    if (city.trim() !== '') setErrors((state) => ({ ...state, city: null }));
    // else setErrors((state) => ({ ...state, city: "City is required" }));
  }, [city]);

  const [resume, setResume] = useState<
    FilePickerFormat | ImagePicker.ImagePickerResult | null
  >(session.profileData?.personalInformation?.resume);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleFileSelect = (
    file: FilePickerFormat | ImagePicker.ImagePickerResult,
  ) => {
    setResume(file);
    return null;
  };

  // console.log("user>", settings.userInfo);

  const toast = useToast();

  const handleOnNextPress = () => {
    if (firstName.trim() === '')
      return setErrors((state) => ({
        ...state,
        firstName: 'First name is Required',
      }));
    if (lastName.trim() === '')
      return setErrors((state) => ({
        ...state,
        lastName: 'Last name is Required',
      }));

    if (city.trim() === '')
      return setErrors((state) => ({
        ...state,
        city: 'City is Required',
      }));

    if (bio.trim() === '')
      return setErrors((state) => ({
        ...state,
        bio: 'Bio is Required',
      }));

    if (country.trim() === '')
      return toast.show('Please provide your country of resident');

    if (countryOfOrigin.trim() === '')
      return toast.show('Please provide your country of origin');

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
          Personal Informations
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            onChangeText={(text) => setFirstName(text)}
            style={styles.inputFlex}
            placeholder="First Name"
            value={firstName}
            errorMessage={errors.firstName}
            autoCorrect={false}
            inputViewStyle={{ width: '50%' }}
          />
          <Input
            onChangeText={(text) => setLastName(text)}
            style={styles.inputFlex}
            placeholder="Last Name"
            value={lastName}
            autoCorrect={false}
            errorMessage={errors.lastName}
            inputViewStyle={{ width: '50%' }}
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
            onChangeText={(text) => setCity(text)}
            style={styles.inputFlex}
            placeholder="City"
            errorMessage={errors.city}
            value={city}
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
            onChangeText={(text) => setBio(text)}
            autoCapitalize="none"
            errorMessage={errors.bio}
            value={bio}
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
          style={{ height: 60 }}
          emptyIcon={<FileUploadEmptyIcon />}
        />
      </ScrollView>
      <Button title="Continue" onPress={handleOnNextPress} />
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
