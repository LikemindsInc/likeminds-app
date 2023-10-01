import { View } from "native-base";
import { FC } from "react";
import {
  ModalProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import TextLink from "../TextLink/TextLink";
// import  from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { GlobalStyles } from "../../theme/GlobalStyles";

interface IProps {
  children?: JSX.Element;
  visible?: boolean;
  title?: string;
  onBackDropPress?: () => void;
}

const AppModal: FC<IProps> = (props) => {
  return (
    <Modal
      {...props}
      visible={props.visible}
      presentationStyle="pageSheet"
      transparent={false}
      style={{ padding: 0, margin: 0 }}
      onRequestClose={props.onBackDropPress}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  },
                ]}
                onPress={props.onBackDropPress}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.primary}
                />
                <Text
                  style={[
                    GlobalStyles.textPrimary,
                    GlobalStyles.fontSize13,
                    GlobalStyles.fontInterMedium,
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 30 }}>
                <Text
                  style={[
                    GlobalStyles.textNavyBlue,
                    GlobalStyles.fontSize15,
                    GlobalStyles.fontInterMedium,
                  ]}
                >
                  {props.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: colors.grey,
              }}
            ></View>
          </View>
          <View style={[{ flex: 1 }]}>{props.children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    // justifyContent: "flex-end", // Modal will be at the bottom
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});

export default AppModal;
