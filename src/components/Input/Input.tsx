import { FC } from "react";
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";

interface ITextInputProps extends TextInputProps {
  inputRef?: React.Ref<TextInput> | undefined;
  contentContainerStyle?: ViewStyle;
  showSearchIcon?: boolean;
  onClear?: () => void;
  isLoading?: boolean;
  label?: string;
  showUpdateButton?: boolean;
  onUpdate?: () => void;
}

const Input: FC<ITextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={[GlobalStyles.inputStyle, styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default Input;
