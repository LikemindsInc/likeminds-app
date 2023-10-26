import { StackActions, useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import { FC } from 'react';
import {
  ButtonProps,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import font from '../../theme/font';
import { GlobalStyles } from '../../theme/GlobalStyles';

export interface ITextLinkProps extends ButtonProps {
  linkTo?: string;
  color?: string;
  textStyle?: TextStyle;
}

const TextLink: FC<ITextLinkProps> = (props) => {
  const navigation = useNavigation<any>();
  const hanldeOnLinkPress = (e: any) => {
    if (props.linkTo)
      return navigation.dispatch(StackActions.push(props.linkTo));

    return props.onPress && props.onPress(e);
  };
  return (
    <TouchableOpacity onPress={hanldeOnLinkPress}>
      <Text
        style={[
          styles.linkText,
          props.color ? { color: props.color } : {},
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: font.size.font16,
    textDecorationLine: 'underline',
  },
});

export default TextLink;
