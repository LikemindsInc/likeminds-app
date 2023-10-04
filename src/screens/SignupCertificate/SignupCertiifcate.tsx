import * as ImagePicker from "expo-image-picker";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import Button from "../../components/Button/Button";
import colors from "../../theme/colors";
import DropZone from "../../components/DropZone/DropZone";
import Input from "../../components/Input/Input";
import React, { useEffect, useState } from "react";
import TextLink from "../../components/TextLink/TextLink";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { APP_SCREEN_LIST } from "../../constants";
import { CertificateUploadEmptyIcon } from "../Profile/components/CertificateForm";
import { completeUserProfileAction } from "../../actions/auth";
import { FilePickerFormat } from "@app-model";
import { FileUploadEmptyIcon } from "../personal_inforamtion/PersonalInformation";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { ISessionState, updateCertificate } from "../../reducers/session";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const SignupCertificate = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const navigation = useNavigation<any>();
  const [uploods, setUploads] = useState([{}]);
  const errorReducer = useAppSelector((state) => state.errorReducer);

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const [file, setFile] = useState<
    FilePickerFormat | null | ImagePicker.ImagePickerResult
  >(null);

  const handleOnFileSelect = (
    file: FilePickerFormat | ImagePicker.ImagePickerResult
  ) => {
    setFile(file);
    return null;
  };



  const handleOnNextPress = () => {
    if (file) {
      dispatch(
        updateCertificate({ name: name, file: file as FilePickerFormat })
      );
    }
    dispatch(completeUserProfileAction(session.profileData));
  };

  useEffect(() => {
    if (session.completeProfileStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
    } else if (session.completeProfileStatus === "failed") {
      toast.show(
        session.completeProfileError?.trim() === ""
          ? "Unable to complete request. Please try again later"
          : (session.completeProfileError as string),
        {
          type: "normal",
        }
      );
    }
  }, [session.completeProfileStatus]);

  const handleOnSkip = () => {
    // dispatch(completeUserProfileAction(session.profileData));
    // navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
    handleOnNextPress();
  };

  console.log(errorReducer)

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
        <View>
          {uploods.map((item) => (
            <View>
              <View style={[GlobalStyles.mb10]}>
                <Input
                  editable={true}
                  placeholder="Certificate, Award, Volunteer"
                  value={name}
                  onChangeText={(value) => setName(value)}
                />
              </View>
              <DropZone
                type="all"
                style={{ height: 60 }}
                onSelect={handleOnFileSelect}
                emptyIcon={<CertificateUploadEmptyIcon />}
              />
            </View>
          ))}
        </View>
        <View>
          <Button
            type="outline-primary"
            title="Add Another"
            onPress={() => setUploads((state) => [...state, {}])}
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
          loading={session.completeProfileStatus === "loading"}
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
    flexDirection: "row",
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default SignupCertificate;
