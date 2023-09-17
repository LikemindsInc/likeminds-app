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
import Converter from "../../utils/Converters";
import { EvilIcons } from "@expo/vector-icons";

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
  inputContainer?: ViewStyle;
  mode?: "phone-pad" | "currency";
  onCountryCodeSelect?: (value: string) => void;
  errorMessage?: string | null;
}

const Input: FC<ITextInputProps> = (props) => {
  const [countryCode, setCountryCode] = useState("+000");
  const [show, setShow] = useState(false);

  if (props.mode && props.mode === "phone-pad") {
    return (
      <View style={[styles.inputWrapper, props.inputViewStyle]}>
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
        {props.errorMessage && (
          <View style={[GlobalStyles.pl4]}>
            <Text
              style={[
                GlobalStyles.textRed,
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight700,
              ]}
            >
              {props.errorMessage}
            </Text>
          </View>
        )}
      </View>
    );
  }
  if (props.mode && props.mode === "currency") {
    return (
      <View style={[styles.inputWrapper, props.inputViewStyle]}>
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
          >
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.textGrey,
                GlobalStyles.fontWeight400,
              ]}
            >
              NGN {" | "}
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
            value={Converter.thousandSeparator(
              Number(props.value?.trim() === "" ? 0 : props.value?.trim())
            )}
            onChangeText={(value) =>
              props.onChangeText &&
              props.onChangeText(value.split(",").join(""))
            }
          />
          {props.suffixElement && props.suffixElement}
        </TouchableOpacity>

        {props.errorMessage && (
          <View style={[GlobalStyles.pl4]}>
            <Text
              style={[
                GlobalStyles.textRed,
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight700,
              ]}
            >
              {props.errorMessage}
            </Text>
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={[styles.inputWrapper, props.inputViewStyle]}>
      <TouchableOpacity
        style={[
          styles.input,
          { flexDirection: "row", width: "100%", alignItems: "center" },
          props.contentContainerStyle,
          props.inputContainer,
        ]}
        onPress={props.onPress}
      >
        {props.prefixIcon && (
          <View style={{ paddingRight: 8 }}>{props.prefixIcon}</View>
        )}
        <TextInput
          returnKeyType={props.returnKeyType || "done"}
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
      {props.errorMessage && (
        <View style={[{ flexDirection: "row", gap: 4, alignItems: "center" }]}>
          <EvilIcons
            name="exclamation"
            size={20}
            color={GlobalStyles.textRed.color}
          />
          <Text
            style={[
              GlobalStyles.textRed,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize10,
              GlobalStyles.fontWeight700,
            ]}
          >
            {props.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#F3F5F7",
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    marginBottom: 6,
  },
  inputStyle: {
    width: "100%",
  },
});

export default Input;
