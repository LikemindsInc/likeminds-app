import React, { useState } from 'react';
const { wp } = Util.responsiveWidthHeight();

import {
  View,
  StyleSheet,
  TextInputProps,
  Text,
  StyleProp,
  ViewStyle,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import Util from '../../utils';
import { GlobalStyles } from '../../theme/GlobalStyles';

interface TextInputType extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  showHidePassword?: boolean;
  error?: string | null;
}

export default function TextInputElement(props: TextInputType) {
  const {
    containerStyle,
    error,
    showHidePassword = false,
    secureTextEntry,
    ...textInputProps
  } = props;
  const [isPasswordVisible, setPasswordVisible] = useState(!showHidePassword);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.input}
            {...textInputProps}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
          />
          {showHidePassword ? (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: wp(2.7),
    backgroundColor: '#F3F5F7',
    overflow: 'hidden',
    marginVertical: wp(2.6),
  },
  input: {
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    backgroundColor: '#F3F5F7',
    flex: 1,
    fontSize: wp(4),
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(2.7),
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
});
