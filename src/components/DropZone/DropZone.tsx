import { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

interface IProps {
  emptyIcon?: JSX.Element | undefined;
  style?: ViewStyle;
  type?: "image" | "video" | "all" | "document";
  onSelect?: (
    file: DocumentPicker.DocumentResult | ImagePicker.ImagePickerResult
  ) => null;
}

const DropZone: FC<IProps> = ({
  emptyIcon,
  style,
  type = "image",
  onSelect,
}) => {
  const [image, setImage] = useState<string | null>(null);
  //   const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  useEffect(() => {
    if (type !== "document") requestPermission();
  }, []);

  //   useEffect(() => {
  //     console.log("permission stauts> ", status);
  //   }, [status]);
  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      onSelect && onSelect(result);
    } catch (error) {}
  };

  const getMediaType = () => {
    switch (type) {
      case "image":
        return ImagePicker.MediaTypeOptions.Images;
      case "video":
        return ImagePicker.MediaTypeOptions.Videos;
      case "all":
        return ImagePicker.MediaTypeOptions.All;
    }
  };

  const handleMediaSelect = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: getMediaType(),
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);

        onSelect && onSelect(result);
      }
    } catch (error) {}
  };
  const handleDocumentSelect = async () => {
    if (type === "document") return handleFileSelect();

    return handleMediaSelect();
  };

  const renderSelectedFiles = () => {
    if (type === "image" && image) {
      return (
        <Image
          source={{ uri: `${image}` }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 1,
            borderRadius: 10,
          }}
          resizeMethod="auto"
          resizeMode="cover"
        />
      );
    }

    return (
      emptyIcon || (
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize15,
            GlobalStyles.fontWeight400,
            GlobalStyles.textNavyBlue,
          ]}
        >
          Tap To Upload
        </Text>
      )
    );
  };
  return (
    <TouchableOpacity
      onPress={handleDocumentSelect}
      style={[
        styles.contaner,
        style,
        image ? { borderWidth: 0 } : { borderWidth: 2 },
      ]}
    >
      {renderSelectedFiles()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {},
  contaner: {
    minHeight: 100,
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#88969D",
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DropZone;
