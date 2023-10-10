import { FC, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../theme/colors';
import { AntDesign } from '@expo/vector-icons';
import { FilePickerFormat } from '@app-model';

interface IProps {
  emptyIcon?: JSX.Element | undefined;
  style?: ViewStyle;
  type?: 'image' | 'video' | 'all' | 'document';
  onSelect?: (file: FilePickerFormat | ImagePicker.ImagePickerResult) => null;
}

const DropZone: FC<IProps> = ({
  emptyIcon,
  style,
  type = 'image',
  onSelect,
}) => {
  const [image, setImage] = useState<string | null>(null);
  //   const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  useEffect(() => {
    if (type !== 'document') requestPermission();
  }, []);

  //   useEffect(() => {
  //     console.log("permission stauts> ", status);
  //   }, [status]);
  const [file, setFile] = useState<FilePickerFormat>();
  const handleFileSelect = async () => {
    try {
      const result = (await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      })) as FilePickerFormat;

      // console.log("result > ", result);

      setFile(result);

      onSelect && onSelect(result);
    } catch (error) {}
  };

  const getMediaType = () => {
    switch (type) {
      case 'image':
        return ImagePicker.MediaTypeOptions.Images;
      case 'video':
        return ImagePicker.MediaTypeOptions.Videos;
      case 'all':
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
    if (type === 'all') return handleFileSelect();

    return handleMediaSelect();
  };

  const renderSelectedFiles = () => {
    if (type === 'all' && file && file?.type !== 'cancel') {
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            gap: 8,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
            }}
          >
            <AntDesign name="addfile" size={32} color="white" />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                { textTransform: 'capitalize' },
              ]}
            >
              {file?.name}
            </Text>
          </View>
        </View>
      );
    }
    if (type === 'image' && image) {
      return (
        <Image
          source={{ uri: `${image}` }}
          style={{
            width: '100%',
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
        image ? { borderWidth: 0 } : { borderWidth: 2 },
        style,
      ]}
    >
      {renderSelectedFiles()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {},
  contaner: {
    paddingVertical: 34,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#88969D',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DropZone;
