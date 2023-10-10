import { View, Text } from 'react-native';
import Input from '../Input/Input';
import { GlobalStyles } from '../../theme/GlobalStyles';
import DropZone from '../DropZone/DropZone';
import { ImagePickerResult } from 'expo-image-picker';
import { FilePickerFormat } from '@app-model';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CertificateUploadEmptyView } from '../CertificateUploadEmptyView/CertificatUploadEmptyView';

interface IProps {
  onFileNameChange?: (value: string) => void;
  fileName?: string;
  onFileSelect?: (file: ImagePickerResult | FilePickerFormat | null) => null;
  onRemoveHandler?: () => void;
  isFirst?: boolean;
}

const CertificateFormField: FC<IProps> = ({
  onFileNameChange,
  onFileSelect,
  fileName,
  onRemoveHandler,
  isFirst,
}) => {
  return (
    <View style={[GlobalStyles.mb20]}>
      <View>
        <View style={[GlobalStyles.mb10]}>
          <Input
            editable={true}
            placeholder="Certificate, Award, Volunteer"
            value={fileName}
            onChangeText={onFileNameChange}
          />
        </View>
        <DropZone
          emptyIcon={<CertificateUploadEmptyView />}
          type="all"
          style={{ height: 60 }}
          onSelect={onFileSelect}
        />
      </View>
      {isFirst || (
        <View style={[GlobalStyles.mt10]}>
          <TouchableOpacity onPress={onRemoveHandler}>
            <Text
              style={[
                GlobalStyles.textRed,
                GlobalStyles.fontSize13,
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontWeight600,
                {
                  textAlign: 'right',
                  textDecorationLine: 'underline',
                  paddingVertical: 5,
                },
              ]}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CertificateFormField;
