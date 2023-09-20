import { IPostCommentFeed } from "@app-model";
import { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { View, useToast } from "native-base";
import colors from "../../../theme/colors";
import DateFormatter from "../../../utils/date-formatter";
import Input from "../../../components/Input/Input";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { commentOnCommentAction } from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";
import { IPostState } from "../../../reducers/post_reducer";
import ReactionIcon from "../../../components/ReactionIcon/ReactionIcon";
import CommentReactionIcon from "../../../components/ReactionIcon/CommentReactionIcon";

interface Props {
  item: IPostCommentFeed;
}

const CommentRowItem: FC<Props> = ({ item }) => {
  const [shouldCommentOnComment, setShowCommentInput] = useState(false);

  const [commentOnComment, setCommentOnComment] = useState("");

  const postState = useAppSelector(
    (state: any) => state.postReducer
  ) as IPostState;

  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    if (postState.commentOnCommentStatus === "failed") {
      toast.show({ description: postState.commentOnCommentError });
    } else if (postState.commentOnCommentStatus === "completed") {
      setCommentOnComment("");
    }
  }, [postState.commentOnCommentStatus]);

  const handlePostComment = () => {
    if (commentOnComment.trim() == "") return;

    dispatch(
      commentOnCommentAction({
        commentId: item.id,
        postId: item.postId,
        comment: commentOnComment,
      })
    );
  };

  const handleCommentOnComment = () => {
    setShowCommentInput((state) => !state);
  };
  const renderSendButton = (styles?: TextStyle) => {
    return (
      <TouchableOpacity onPress={handlePostComment}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontWeight700,
            GlobalStyles.fontSize13,
            GlobalStyles.textPrimary,
            styles,
          ]}
        >
          SEND
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[GlobalStyles.mb20]}>
      <View style={[{ flexDirection: "row", gap: 12 }]}>
        <View style={[styles.storyHeader]}>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={
                  item.user?.profilePicture
                    ? { uri: item.user.profilePicture }
                    : require("../../../../assets/imageAvatar.jpeg")
                }
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={[GlobalStyles.flexOne]}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight700,
              ]}
            >
              {item.user.firstName} {item.user.lastName}
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight400,
              ]}
            >
              {item.comment}
            </Text>
            <View
              style={[
                GlobalStyles.mt5,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "60%",
                },
              ]}
            >
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.fontSize10,
                  { color: "#284453" },
                ]}
              >
                {DateFormatter.getTimeAgo(item.createdAt)}
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.fontSize10,
                  { color: "#284453" },
                ]}
              >
                {item.reactionCount}{" "}
                {item.reactionCount > 1 ? "reactions" : "reaction"}
              </Text>
              {/* <TouchableOpacity onPress={handleCommentOnComment}>
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontWeight700,
                    GlobalStyles.fontSize10,
                    { color: "#284453" },
                  ]}
                >
                  Reply
                </Text>
              </TouchableOpacity> */}
            </View>
            {shouldCommentOnComment && (
              <Input
                inputViewStyle={{ height: 30, marginTop: 10 }}
                placeholder="Comment"
                suffixElement={renderSendButton({ fontSize: 10 })}
                onChangeText={(value) => setCommentOnComment(value)}
                value={commentOnComment}
                inputStyle={{ fontSize: 10 }}
              />
            )}
          </View>
          <CommentReactionIcon post={item} />
          {/* <TouchableOpacity>
            <AntDesign name={"hearto"} size={14} color={colors.navyBlue} />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputViewStyle: {
    height: 44,
  },
  bottomInputStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingTop: 16,
    justifyContent: "center",
  },
  commentWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
    marginTop: 20,
    paddingTop: 20,
    height: 250,
  },
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

export default CommentRowItem;
