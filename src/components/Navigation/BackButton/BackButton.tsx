import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../theme/GlobalStyles";

interface IProps extends ButtonProps {
  iconColor?: string;
  icon?: JSX.Element;
}

const BackButton: FC<IProps> = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      {props.icon ? (
        props.icon
      ) : (
        <AntDesign
          name="arrowleft"
          size={24}
          color={props.iconColor || "black"}
        />
      )}
      <Text
        style={[
          GlobalStyles.fontInterMedium,
          GlobalStyles.fontSize20,
          GlobalStyles.fontWeight700,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
});

export default BackButton;
