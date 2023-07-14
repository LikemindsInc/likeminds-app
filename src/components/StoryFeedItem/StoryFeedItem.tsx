import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import { FC, useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { IPostFeed } from "@app-model";
import useAppSelector from "../../hooks/useAppSelector";
import { ISettingState } from "../../reducers/settings";

interface IProps {
  item: IPostFeed;
}

const StoryFeedItem: FC<IProps> = ({ item }) => {
  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const [isPostLiked, setLiked] = useState(false);

  const isPostLikedByUser = useCallback(() => {
    const isLiked = item.likedBy.includes(state?.userInfo?.id as string);
    setLiked(isLiked);
  }, [item.likedBy]);

  useEffect(() => {
    isPostLikedByUser();
  }, [isPostLikedByUser]);

  const handleLikeReactionOnPost = () => {
    if (isPostLiked) return setLiked(false);
    // dispatch unLikePost

    setLiked(true);
    // dispatch likePost
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.storyHeader}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Image
                source={
                  item.user?.profilePicture
                    ? { uri: item.user.profilePicture }
                    : require("../../../assets/image3.png")
                }
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
              {item?.user?.firstName} {item?.user?.firstName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Feather name="more-horizontal" size={24} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          {item.images && item.images.length > 0 ? (
            <Image
              source={{ uri: item.images[0] }}
              style={styles.image}
              resizeMethod="auto"
              resizeMode="cover"
            />
          ) : null}
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
          <TouchableOpacity onPress={() => handleLikeReactionOnPost()}>
            <AntDesign
              name={isPostLiked ? "heart" : "hearto"}
              size={24}
              color={isPostLiked ? colors.red : colors.navyBlue}
            />
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
          {item.content}
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
    height: 300,
  },
});

export default StoryFeedItem;
