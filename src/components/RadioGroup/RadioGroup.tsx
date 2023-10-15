import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import RadioButton from './RadioButton';
import { RadioGroupProps } from './types';

export const RadioGroup = ({
  containerStyle,
  layout = 'column',
  onPress,
  radioButtons,
  selectedId,
  testID,
  color,
  width,
  descriptionStyle,
  onChange,
  items,
  isMultiple,
}: any) => {
  const [selectedItems, setSelectedItem] = useState<string[]>(items || []);

  function handlePress(id: string) {
    let newState = [...selectedItems];
    if (isMultiple) {
      const index = newState.findIndex((item) => item === id);
      if (index !== -1) {
        newState.splice(index, 1);
      } else {
        newState.push(id);
      }
    } else {
      newState = [id];
    }

    setSelectedItem(newState);

    onChange && onChange(newState);
  }

  return (
    <View
      style={[styles.container, { flexDirection: layout }, containerStyle]}
      testID={testID}
    >
      {radioButtons.map((button: any) => (
        <View style={[descriptionStyle]} key={button.id}>
          <RadioButton
            {...button}
            key={button.id}
            selected={selectedItems.includes(button.id)}
            onPress={() => handlePress(button.id)}
            color={color}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
