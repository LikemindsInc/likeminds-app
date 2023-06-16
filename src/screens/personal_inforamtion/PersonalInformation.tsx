import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { CheckIcon, Select } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import DropZone from "../../components/DropZone/DropZone";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { ISettingState } from "../../reducers/settings";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getCountriesAction } from "../../actions/settings";
import { PURGE } from "redux-persist";
import {
  ISessionState,
  updatePersonalInformation,
} from "../../reducers/session";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";

const PersonalInformation = () => {
  const settings = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;
  const dispatch = useAppDispatch();
  const getCountries = useCallback(() => {
    if (settings.getCountriesStatus === "idle") {
      dispatch(getCountriesAction("d"));
    }
  }, [settings.getCountriesStatus]);

  const [firstName, setFirstName] = useState(
    session.profileData?.personalInformation?.firstName
  );
  const [lastName, setLastName] = useState(
    session.profileData?.personalInformation?.lastName
  );
  const [city, setCity] = useState(
    session.profileData?.personalInformation?.city
  );
  const [bio, setBio] = useState(session.profileData?.personalInformation?.bio);
  const [country, setCountry] = useState(
    (session.profileData?.personalInformation?.country as string) || ""
  );
  const [countryOfOrigin, setCountryOfOrigin] = useState(
    session.profileData?.personalInformation?.countryOfOrigin
  );

  const [resume, setResume] = useState<
    DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult | null
  >(session.profileData?.personalInformation?.resume);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleFileSelect = (
    file: DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult
  ) => {
    setResume(file);
    return null;
  };

  // console.log("user>", settings.userInfo);

  const navigation = useNavigation<any>();

  const handleOnNextPress = () => {
    dispatch(
      updatePersonalInformation({
        firstName,
        lastName,
        city,
        bio,
        country,
        countryOfOrigin,
        resume,
      })
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
          Personal Information
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            onChangeText={(text) => setFirstName(text)}
            style={styles.inputFlex}
            placeholder="First Name"
            value={firstName}
            autoCorrect={false}
          />
          <Input
            onChangeText={(text) => setLastName(text)}
            style={styles.inputFlex}
            placeholder="Last Name"
            value={lastName}
            autoCorrect={false}
          />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <SelectList
            boxStyles={{
              borderWidth: 0,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 20,
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
            value={city}
            autoCorrect={false}
          />
        </View>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            multiline
            style={[styles.inputFlex, { height: 100, paddingVertical: 8 }]}
            placeholder="Bio"
            textAlignVertical="top"
            autoCorrect={false}
            onChangeText={(text) => setBio(text)}
            autoCapitalize="none"
            value={bio}
          />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <SelectList
            boxStyles={{
              borderWidth: 0,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 20,
            }}
            save="key"
            fontFamily="Inter-Regular"
            setSelected={(val: string) => setCountry(val)}
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
          type="document"
          emptyIcon={<FileUploadEmptyIcon />}
        />
      </ScrollView>
      <Button title="Continue" onPress={handleOnNextPress} />
    </View>
  );
};

const FileUploadEmptyIcon = () => {
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
    flexDirection: "row",
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default PersonalInformation;