import { Keyboard, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const KeyboardDismisser = (props: any) => {
  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={handleCloseKeyboard}
      style={styles.container}
      accessible={false}
    >
      {props.children}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardDismisser;
