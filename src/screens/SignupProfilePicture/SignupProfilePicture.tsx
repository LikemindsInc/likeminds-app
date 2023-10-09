import { Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import DropZone from "../../components/DropZone/DropZone";
import Button from "../../components/Button/Button";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useAppDispatch from "../../hooks/useAppDispatch";
import { updateProfilePicture } from "../../reducers/userProfileSession";

const SignupProfilePicture = () => {
  const navigation = useNavigation<any>();
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<
    DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult | null
  >(null);
  const handleOnFileSelect = (
    file: DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult,
  ) => {
    setFile(file);
    return null;
  };

  useEffect(() => {
    if (file) {
      setDisabled(false);
    }
  }, [file]);

  const handleOnNextPress = () => {
    dispatch(updateProfilePicture(file));
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EXPERIENCE_SCREEN);
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <BackButton title="Profile Picture" iconColor={colors.primary} />
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
          Upload a photo of yourself.It helps others find and recognize you
          faster
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <DropZone style={{ height: "60%" }} onSelect={handleOnFileSelect} />
      </View>
      <Button
        disabled={isDisabled}
        title="Continue"
        onPress={handleOnNextPress}
      />
    </View>
  );
};

export default SignupProfilePicture;
