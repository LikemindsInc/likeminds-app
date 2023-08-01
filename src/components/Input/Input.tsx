import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { TouchableOpacity } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

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
  inputStyle?: ViewStyle | TextStyle;
  inputViewStyle?: ViewStyle;
  prefixIcon?: JSX.Element;
  suffixElement?: JSX.Element;
  mode?: "phone-pad";
  onCountryCodeSelect?: (value: string) => void;
}

const Input: FC<ITextInputProps> = (props) => {
  const [countryCode, setCountryCode] = useState("+000");
  const [show, setShow] = useState(false);

  if (props.mode && props.mode === "phone-pad") {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.input,
            { flexDirection: "row", width: "100%", alignItems: "center" },
            props.contentContainerStyle,
            props.inputViewStyle,
          ]}
          onPress={props.onPress}
        >
          <TouchableOpacity
            style={{
              marginRight: 10,
              height: "100%",
              justifyContent: "center",
            }}
            onPress={() => setShow(true)}
          >
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.textGrey,
                GlobalStyles.fontWeight400,
              ]}
            >
              {countryCode} {" | "}
            </Text>
          </TouchableOpacity>
          <TextInput
            returnKeyType="done"
            {...props}
            ref={props.inputRef}
            style={[
              { flex: 1, height: "100%" },
              GlobalStyles.inputStyle,
              props.inputStyle,
            ]}
          />
          {props.suffixElement && props.suffixElement}
        </TouchableOpacity>
        <CountryPicker
          lang={"en"}
          show={show}
          style={{
            modal: {
              height: 500,
            },
          }}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            props.onCountryCodeSelect &&
              props.onCountryCodeSelect(item.dial_code);
            setShow(false);
          }}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { flexDirection: "row", width: "100%", alignItems: "center" },
        props.contentContainerStyle,
        props.inputViewStyle,
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
        style={[
          { flex: 1, height: "100%" },
          GlobalStyles.inputStyle,
          props.inputStyle,
        ]}
      />
      {props.suffixElement && props.suffixElement}
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
