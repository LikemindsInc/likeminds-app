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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAppDispatch from "../../hooks/useAppDispatch";
import { updateProfilePicture } from "../../reducers/userProfileSession";
import {
  ISpaceState,
  clearCreateSpaceStatus,
  storeSpacePhoto,
} from "../../reducers/space_reducer";
import useAppSelector from "../../hooks/useAppSelector";
import { createSpaceAction } from "../../actions/space";
import { useToast } from "native-base";

const CreateSpaceAddPicture = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isDisabled, setDisabled] = useState(true);
  const space = useAppSelector(
    (state: any) => state.spaceReducer
  ) as ISpaceState;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [file, setFile] = useState<
    DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult | null
  >(null);
  const handleOnFileSelect = (
    file: DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult
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
    dispatch(storeSpacePhoto(file));
    dispatch(
      createSpaceAction({
        title: space.createSpaceDTO.title,
        description: space.createSpaceDTO.description,
        photo: file,
      })
    );
  };

  useEffect(() => {
    if (space.createSpaceStatus === "completed") {
      navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN);
      dispatch(clearCreateSpaceStatus());
    } else if (space.createSpaceStatus === "failed") {
      toast.show({ description: space.createSpaceError, variant: "contained" });
    }
  }, [space.createSpaceStatus]);
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <BackButton title="Add a Photo" iconColor={colors.primary} />
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
          Add a descriptive photo for your space
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <DropZone style={{ height: "60%" }} onSelect={handleOnFileSelect} />
      </View>
      <Button
        disabled={isDisabled}
        loading={space.createSpaceStatus === "loading"}
        title="Complete Setup"
        onPress={handleOnNextPress}
      />
    </View>
  );
};

export default CreateSpaceAddPicture;
