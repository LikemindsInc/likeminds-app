import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { addOpacity } from "../../theme/colors";
import useDimension from "../../hooks/useDimension";
import { Text } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import font from "../../theme/font";

interface IProps {
  item: {
    id: number;
    title: string;
    description: string;
    time: string;
  };
}

const IntroListItem: FC<IProps> = ({ item }) => {
  const width = useDimension().width;
  return (
    <TouchableOpacity style={[styles.container, { width: 0.6 * width }]}>
      <View>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontWeight700,
            { fontSize: font.size.font15 },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontWeight400,
            GlobalStyles.textGrey,
            GlobalStyles.mt5,
            { fontSize: font.size.font13 },
          ]}
        >
          {item.description}
        </Text>
      </View>
      <View>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontWeight700,
            GlobalStyles.textPrimary,
            { fontSize: font.size.font15, textAlign: "right" },
          ]}
        >
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009AEE" + addOpacity(10),
    maxWidth: 260,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default IntroListItem;
