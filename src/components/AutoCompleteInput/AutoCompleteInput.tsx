import { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { GlobalStyles } from '../../theme/GlobalStyles';
import colors from '../../theme/colors';

interface IProps {
  data?: string[];
  value?: string;
  onChangeText?: (text: string) => void;
}

const AutoCompleteInput: FC<IProps> = ({ data, value, onChangeText }) => {
  const [hide, setHide] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');

  // useEffect(() => {
  //   if()
  //   setHide(false);
  // }, [data]);
  return (
    <View style={styles.autocompleteContainer}>
      <Autocomplete
        data={data || []}
        inputContainerStyle={[styles.input]}
        containerStyle={{
          backgroundColor: '#F3F5F7',
          borderRadius: 8,
          width: '100%',
        }}
        hideResults={`${value}`.trim() === '' || selectedInput === value}
        value={value}
        placeholder="Search School"
        onChangeText={onChangeText}
        flatListProps={{
          keyExtractor: (_, idx) => `${idx}`,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedInput(item);
                onChangeText && onChangeText(item);
              }}
              style={[
                {
                  marginBottom: 10,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.grey,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                },
              ]}
            >
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  input: {
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default AutoCompleteInput;
