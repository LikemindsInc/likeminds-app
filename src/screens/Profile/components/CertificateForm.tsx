import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import colors from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {
  ISessionState,
  updateCertificate,
} from '../../../reducers/userProfileSession';
import useAppSelector from '../../../hooks/useAppSelector';
import { updateCertificateProfileAction } from '../../../actions/auth';
import BackButton from '../../../components/Navigation/BackButton/BackButton';
import { useToast } from 'react-native-toast-notifications';
import { FilePickerFormat } from '@app-model';
import { AntDesign } from '@expo/vector-icons';
import CertificateFormField from '../../../components/CertificateFormField/CertificateFormField';

const CertificateForm = () => {
  const dispatch = useAppDispatch();

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
    setTimeout(() => {
      dispatch(updateCertificateProfileAction(session.profileData));
    }, 500);
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
    <View style={[GlobalStyles.container, { paddingHorizontal: 0 }]}>
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
      </ScrollView>
      <View>
        <Button
          loading={session.completeProfileStatus === 'loading'}
          title="Continue"
          onPress={handleOnNextPress}
        />
      </View>
    </View>
  );
};

export const CertificateUploadEmptyIcon = () => {
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
          Certificate
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
    flex: 1,
  },
});

export default CertificateForm;
