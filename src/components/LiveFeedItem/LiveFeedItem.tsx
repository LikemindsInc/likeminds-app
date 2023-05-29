import { FC } from "react";
import {
  ListRenderItem,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../theme/colors";
import { Text } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import font from "../../theme/font";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  item: {
    id: number;
    image: any;
    isLive: boolean;
    userName: string;
    isUserProfile?: boolean | undefined;
  };
}

const LiveFeedItem: FC<IProps> = ({ item }) => {
  if (item.isUserProfile) {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            source={item.image}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
          <LinearGradient
            style={[styles.plusIcon]}
            colors={["#00CDFE", "#009AEE"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <AntDesign name="plus" size={12} color={colors.white} />
          </LinearGradient>
        </View>
        <Text
          style={[
            GlobalStyles.fontInterRegular,

            GlobalStyles.textNavyBlue,
            GlobalStyles.fontWeight400,
            GlobalStyles.mt5,
            { fontSize: font.size.font8 },
          ]}
        >
          My Story
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.innerCircle]}>
        <Image
          source={item.image}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>
      <Text
        style={[
          GlobalStyles.fontInterRegular,

          GlobalStyles.textNavyBlue,
          GlobalStyles.fontWeight400,
          GlobalStyles.mt5,
          { fontSize: font.size.font8 },
        ]}
      >
        {item.userName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    position: "relative",
  },
  plusIcon: {
    position: "absolute",
    right: 0,
    bottom: 5,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  container: {
    alignItems: "center",
    marginRight: 6,
  },
  innerCircle: {
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default LiveFeedItem;
