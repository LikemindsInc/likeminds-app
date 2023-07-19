import { Keyboard, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import useAppDispatch from "../../hooks/useAppDispatch";
import { showReactionView } from "../../reducers/post_reducer";

const KeyboardDismisser = (props: any) => {
  const dispatch = useAppDispatch();
  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
    dispatch(showReactionView({ show: false, post: null }));
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
