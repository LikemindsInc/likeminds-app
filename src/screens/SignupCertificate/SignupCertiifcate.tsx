import * as ImagePicker from 'expo-image-picker';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import Button from '../../components/Button/Button';
import colors from '../../theme/colors';
import DropZone from '../../components/DropZone/DropZone';
import Input from '../../components/Input/Input';
import React, { useEffect, useState } from 'react';
import TextLink from '../../components/TextLink/TextLink';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { APP_SCREEN_LIST } from '../../constants';
import { CertificateUploadEmptyIcon } from '../Profile/components/CertificateForm';
import {
  completeUserProfileAction,
  updateCertificateProfileAction,
} from '../../actions/auth';
import { FilePickerFormat } from '@app-model';
import { FileUploadEmptyIcon } from '../personal_inforamtion/PersonalInformation';
import { GlobalStyles } from '../../theme/GlobalStyles';
import {
  ISessionState,
  updateCertificate,
} from '../../reducers/userProfileSession';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import CertificateFormField from '../../components/CertificateFormField/CertificateFormField';

const SignupCertificate = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const [certifcateForms, setCertifcateForm] = useState<
    { file: FilePickerFormat | null; fileName: string }[]
  >([{ fileName: '', file: null }]);

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  const handleOnNextPress = () => {
    const files = certifcateForms
      .filter((item) => item.file !== null)
      .map((item) => ({
        name: item.fileName.trim() === '' ? 'Certificate' : item.fileName,
        file: item.file,
      }));

    dispatch(updateCertificate(files));

    dispatch(updateCertificateProfileAction(session.profileData));
  };

  useEffect(() => {
    if (session.updateUserCertificatesStatus === 'completed') {
      navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
    }
  }, [session.updateUserCertificatesStatus]);

  const handleOnSkip = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
  };

  const handleOnCertificateFormRemove = (index: number) => {
    const newState = [...certifcateForms];
    newState.splice(index, 1);
    setCertifcateForm(newState);
  };

  const handleOnCertificateFormFileNameChange = (
    index: number,
    value: string,
  ) => {
    const newState = [...certifcateForms];
    newState[index].fileName = value;
    setCertifcateForm(newState);
  };

  const handleOnCertificateFormFileChange = (index: number, value: any) => {
    const newState = [...certifcateForms];
    newState[index].file = value;
    setCertifcateForm(newState);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Certificate" />
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
          Add all your certificates, awards and volunteer work
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {certifcateForms.map((item, i) => (
          <CertificateFormField
            key={`${i}`}
            onRemoveHandler={() => handleOnCertificateFormRemove(i)}
            fileName={item.fileName}
            onFileNameChange={(value) =>
              handleOnCertificateFormFileNameChange(i, value)
            }
            onFileSelect={(value) => {
              handleOnCertificateFormFileChange(i, value);
              return null;
            }}
            isFirst={i === 0}
          />
        ))}

        <View>
          <Button
            type="outline-primary"
            title="Add Another"
            onPress={() =>
              setCertifcateForm((state) => [
                ...state,
                { file: null, fileName: '' },
              ])
            }
          />
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink
            onPress={handleOnSkip}
            title="Skip For Now"
            color={colors.black}
          />
        </View>
        <Button
          loading={session.updateUserCertificatesStatus === 'loading'}
          title="Continue"
          onPress={handleOnNextPress}
        />
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
    flex: 1,
  },
});

export default SignupCertificate;
