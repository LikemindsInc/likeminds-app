import { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { TouchableOpacity } from "react-native";

export interface ITextInputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput> | undefined;
  contentContainerStyle?: ViewStyle;
  showSearchIcon?: boolean;
  onClear?: () => void;
  isLoading?: boolean;
  label?: string;
  showUpdateButton?: boolean;
  onUpdate?: () => void;
  onPress?: () => void;
  inputStyle?: ViewStyle;
  prefixIcon?: JSX.Element;
}

const Input: FC<ITextInputProps> = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { flexDirection: "row", width: "100%", alignItems: "center" },
        props.contentContainerStyle,
      ]}
      onPress={props.onPress}
    >
      {props.prefixIcon && (
        <View style={{ paddingRight: 8 }}>{props.prefixIcon}</View>
      )}
      <TextInput
        returnKeyType="done"
        {...props}
        ref={props.inputRef}
        style={[{ width: "100%" }, GlobalStyles.inputStyle, props.inputStyle]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F3F5F7",
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputStyle: {
    width: "100%",
  },
});

export default Input;
