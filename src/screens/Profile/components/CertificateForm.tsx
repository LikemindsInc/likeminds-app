import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import Input from "../../../components/Input/Input";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import TextLink from "../../../components/TextLink/TextLink";
import colors from "../../../theme/colors";
import DatePicker from "../../../components/DatePicker/DatePicker";
import DropZone from "../../../components/DropZone/DropZone";
import { APP_SCREEN_LIST } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  ISessionState,
  clearCompleteProfileStatus,
  updateCertificate,
} from "../../../reducers/userProfileSession";
import useAppSelector from "../../../hooks/useAppSelector";
import {
  completeUserProfileAction,
  updateCertificateProfileAction,
} from "../../../actions/auth";
import BackButton from "../../../components/Navigation/BackButton/BackButton";
import { useToast } from "react-native-toast-notifications";
import { FilePickerFormat } from "@app-model";
import { AntDesign } from "@expo/vector-icons";

const CertificateForm = () => {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const toast = useToast();

  const [uploods, setUploads] = useState([{}]);

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  const [file, setFile] = useState<
    FilePickerFormat | null | ImagePicker.ImagePickerResult
  >(null);
  const handleOnFileSelect = (
    file: FilePickerFormat | ImagePicker.ImagePickerResult,
  ) => {
    setFile(file);
    return null;
  };
  const handleOnNextPress = () => {
    if (file) {
      console.log("file> ", file);
      dispatch(
        updateCertificate({ file: file as FilePickerFormat, name: name }),
      );
      setTimeout(() => {
        dispatch(updateCertificateProfileAction(session.profileData));
      }, 500);
    }
  };

  // useEffect(() => {
  //   if (session.completeProfileStatus === "completed") {
  //     toast.show("Certificate added successfully", {
  //       animationType: "slide-in",
  //       placement: "top",
  //     });
  //   } else if (session.completeProfileStatus === "failed") {
  //     toast.show(
  //       session.completeProfileError ||
  //         "Unable to complete action please try again"
  //     );
  //   }
  //   dispatch(clearCompleteProfileStatus());
  // }, [session.completeProfileStatus]);

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
      </ScrollView>
      <View>
        <Button
          loading={session.completeProfileStatus === "loading"}
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
    flexDirection: "row",
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default CertificateForm;
