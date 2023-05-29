import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
  item: {
    id: number;
    profileImage: any;
    firstName: string;
    lastName: string;
    postImage: any;
    reactionCount: number;
    commentCount: number;
    title: string;
  };
}

const StoryFeedItem: FC<IProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.storyHeader}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Image
                source={item.profileImage}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </View>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight700,
                GlobalStyles.pl4,
              ]}
            >
              {item.firstName} {item.lastName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Feather name="more-horizontal" size={24} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={item.postImage}
            style={styles.image}
            resizeMethod="auto"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          GlobalStyles.flewRow,
          GlobalStyles.mt10,
          GlobalStyles.mb10,
          { alignItems: "center" },
        ]}
      >
        <View style={[GlobalStyles.flewRow, { gap: 12, alignItems: "center" }]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize10,
              GlobalStyles.fontWeight700,
            ]}
          >
            {item.reactionCount} Reactions
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize10,
              GlobalStyles.fontWeight700,
            ]}
          >
            {item.commentCount} comments
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize10,
              GlobalStyles.fontWeight700,
              GlobalStyles.textNavyBlue,
            ]}
          >
            {item.commentCount} shares
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.flewRow,
            { gap: 20, justifyContent: "flex-end", flex: 1 },
          ]}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color={colors.navyBlue}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="hearto" size={24} color={colors.navyBlue} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="send" size={24} color={colors.navyBlue} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{}}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight400,
          ]}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  storyHeader: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    borderRadius: 10,
  },
});

export default StoryFeedItem;
