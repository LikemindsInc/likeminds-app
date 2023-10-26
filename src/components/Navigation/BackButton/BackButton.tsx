import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../../theme/GlobalStyles';

interface IProps extends ButtonProps {
  iconColor?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}

const BackButton: FC<IProps> = (props) => {
  const { icon, title, iconColor, disabled = false } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      {!disabled ? (
        icon ? (
          icon
        ) : (
          <AntDesign name="arrowleft" size={24} color={iconColor || 'black'} />
        )
      ) : null}
      <Text
        style={[
          GlobalStyles.fontInterMedium,
          GlobalStyles.fontSize20,
          GlobalStyles.fontWeight700,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
});

export default BackButton;
