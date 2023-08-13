import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import DropZone from "../../components/DropZone/DropZone";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ISessionState, updateCertificate } from "../../reducers/session";
import useAppSelector from "../../hooks/useAppSelector";
import { completeUserProfileAction } from "../../actions/auth";
import { useToast } from "native-base";
import BackButton from "../../components/Navigation/BackButton/BackButton";

const SignupCertificate = () => {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const toast = useToast();

  const [uploods, setUploads] = useState([{}]);

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const [file, setFile] = useState<
    DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult | null
  >(null);
  const handleOnFileSelect = (
    file: DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult
  ) => {
    setFile(file);
    return null;
  };
  const handleOnNextPress = () => {
    dispatch(updateCertificate(file as DocumentPicker.DocumentResult));
    // navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN)
    dispatch(completeUserProfileAction(session.profileData));
  };

  useEffect(() => {
    if (session.completeProfileStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
    } else if (session.completeProfileStatus === "failed") {
      toast.show({
        description:
          session.completeProfileError?.trim() === ""
            ? "Unable to complete request. Please try again later"
            : session.completeProfileError,
        variant: "contained",
      });
    }
  }, [session.completeProfileStatus]);

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
        <View style={[GlobalStyles.mb10]}>
          <Input editable={false} placeholder="Certificate, Award, Volunteer" />
        </View>
        <View>
          {uploods.map((item) => (
            <DropZone
              type="all"
              style={{ height: 60 }}
              onSelect={handleOnFileSelect}
              emptyIcon={
                <Text
                  style={[
                    GlobalStyles.textPrimary,
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize15,
                    GlobalStyles.fontWeight400,
                  ]}
                >
                  Upload a Document
                </Text>
              }
            />
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
            onPress={() => navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN)}
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
