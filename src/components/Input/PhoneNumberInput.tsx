import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { CountryPicker } from 'react-native-country-codes-picker';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Util from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { wp } = Util.responsiveWidthHeight();

interface TextInputType extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string | null;
  code?: string;
  onSelectCountryCode?: (value: string) => void;
}

const PhoneNumberInput = (props: TextInputType) => {
  const {
    containerStyle,
    error,
    code,
    onSelectCountryCode,
    ...textInputProps
  } = props;

  const [show, setShow] = useState(false);

  const handleInputFocus = () => {
    if (code) return;
    setShow(!show);
  };

  const toggleCountryCodeModal = () => {
    setShow(true);
  };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={toggleCountryCodeModal}
            style={styles.countryCode}
          >
            <Text>{code ? code : '+000'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            {...textInputProps}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
        </View>
        <CountryPicker
          lang={'en'}
          show={show}
          style={{
            modal: {
              height: 500,
            },
            textInput: {
              borderWidth: 0,
              borderRadius: wp(4.05),
            },
          }}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item) => {
            onSelectCountryCode && onSelectCountryCode(item.dial_code);
            // props.onCountryCodeSelect &&
            //   props.onCountryCodeSelect(item.dial_code);
            setShow(false);
          }}
          inputPlaceholder={textInputProps.placeholder}

          // onBackdropPress={() => setShow(!show)}
        />
      </View>
      {props.error ? (
        <View style={[styles.errorContainer]}>
          <EvilIcons
            name="exclamation"
            size={20}
            color={GlobalStyles.textRed.color}
          />
          <Text style={[styles.error]}>{props.error}</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(2.6),
    backgroundColor: '#F3F5F7',
    borderRadius: wp(2.7),
  },
  countryCode: {
    borderRightWidth: 1,
    borderRightColor: GlobalStyles.textGrey.color,
    paddingHorizontal: wp(2.62),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
  },
  error: {
    color: '#E13D3D',
    fontSize: wp(3),
    marginLeft: wp(0.5),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(4.5),
  },
  phoneNumber: {},
});

export default PhoneNumberInput;
