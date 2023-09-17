import React from "react";
import { StyleSheet, View } from "react-native";

import RadioButton from "./RadioButton";
import { RadioGroupProps } from "./types";

export const RadioGroup = ({
  containerStyle,
  layout = "column",
  onPress,
  radioButtons,
  selectedId,
  testID,
  color,
  width,
  descriptionStyle,
}: any) => {
  function handlePress(id: string) {
    if (id !== selectedId && onPress) {
      onPress(id);
    }
  }

  return (
    <View
      style={[styles.container, { flexDirection: layout }, containerStyle]}
      testID={testID}
    >
      {radioButtons.map((button) => (
        <View style={[descriptionStyle]}>
          <RadioButton
            {...button}
            key={button.id}
            selected={button.id === selectedId}
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
    alignItems: "center",
  },
});
