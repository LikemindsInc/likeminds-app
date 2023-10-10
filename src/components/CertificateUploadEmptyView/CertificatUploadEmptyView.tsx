import colors from '../../theme/colors';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { Text, View } from 'react-native';

export const CertificateUploadEmptyView = () => {
  return (
    <View style={{ height: 60 }}>
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
          Certificates
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
