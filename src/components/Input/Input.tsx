import { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
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
}

const Input: FC<ITextInputProps> = (props) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <TextInput
        {...props}
        ref={props.inputRef}
        style={[GlobalStyles.inputStyle, styles.input, props.inputStyle]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default Input;
