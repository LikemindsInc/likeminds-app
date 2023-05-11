import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import { FC } from "react";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import font from "../../theme/font";

export interface ITextLinkProps extends ButtonProps {
  linkTo?: string;
  color?: string;
}

const TextLink: FC<ITextLinkProps> = (props) => {
  const navigation = useNavigation<any>();
  const hanldeOnLinkPress = (e: any) => {
    if (props.linkTo) return navigation.navigate(props.linkTo);

    return props.onPress && props.onPress(e);
  };
  return (
    <TouchableOpacity onPress={hanldeOnLinkPress}>
      <Text
        style={[styles.linkText, props.color ? { color: props.color } : {}]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: colors.primary,
    fontSize: font.size.font16,
    fontWeight: "700",
    fontFamily: "Inter-Medium",
    textDecorationLine: "underline",
  },
});

export default TextLink;
