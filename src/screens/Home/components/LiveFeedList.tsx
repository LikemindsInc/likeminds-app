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
];

const LiveFeedList = () => {
  const width = useDimension().width;

  return (
    <View
      style={[
        {
          marginBottom: 0,

          height: 80,
          justifyContent: "center",
        },
      ]}
    >
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
