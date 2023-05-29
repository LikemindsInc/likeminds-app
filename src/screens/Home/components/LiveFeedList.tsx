import { FlatList, Image, StyleSheet, View } from "react-native";
import LiveFeedItem from "../../../components/LiveFeedItem/LiveFeedItem";
import useDimension from "../../../hooks/useDimension";
import { Text } from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import font from "../../../theme/font";

const DATA = [
  {
    id: 90,
    isUserProfile: true,
    image: require("../../../../assets/image3.png"),
    isLive: false,
    userName: "My Story",
  },
  {
    id: 1,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image6.png"),
    isLive: true,
  },
  {
    id: 2,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image5.png"),
    isLive: false,
  },
  {
    id: 3,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image7.png"),
    isLive: false,
  },
  {
    id: 4,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image3.png"),
    isLive: false,
  },
  {
    id: 5,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image5.png"),
    isLive: false,
  },
  {
    id: 6,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image7.png"),
    isLive: false,
  },
  {
    id: 7,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image6.png"),
    isLive: false,
  },
  {
    id: 8,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image5.png"),
    isLive: false,
  },
  {
    id: 9,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image7.png"),
    isLive: false,
  },
  {
    id: 10,
    userName: "Avesta UX Hub",
    image: require("../../../../assets/image3.png"),
    isLive: false,
  },
];

const LiveFeedList = () => {
  const width = useDimension().width;
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        renderItem={(props) => <LiveFeedItem item={props.item} />}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item) => `${item.id}`}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default LiveFeedList;
