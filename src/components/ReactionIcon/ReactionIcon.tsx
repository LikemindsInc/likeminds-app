import { IPostFeed } from "@app-model";
import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  IPostState,
  clearPostRactionStatus,
  showReactionView,
} from "../../reducers/post_reducer";
import { GlobalStyles } from "../../theme/GlobalStyles";
import {
  getPostFeedAction,
  getPostReactions,
  reactToPostAction,
} from "../../actions/post";
import { useToast } from "native-base";

interface Props {
  post: IPostFeed;
  handleLikeReactionOnPost: (post: IPostFeed) => void;
  handleOnReactionActivate: (post: IPostFeed) => void;
  isLiked: boolean;
}

const ReactionIcon: FC<Props> = ({
  post,
  handleLikeReactionOnPost,
  handleOnReactionActivate,
  isLiked,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;

  const [likedIcon, setLikeIcon] = useState<any>(null);

  const handleShowReactionView = () => {
    dispatch(showReactionView({ show: true, post }));
  };

  const REACTIONS = useMemo(() => ["💡", "👏", "😄", "💝", "❤️"], []);

  useEffect(() => {
    dispatch(getPostReactions(post.id));
  }, []);

  const toast = useToast();

  const data = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    if (state.postReaction.length > 0) {
      const item = state.postReaction.findLast(
        (item) => item.user.id === data.userInfo?.id && item.postId === post.id
      );

      if (item) {
        // console.log(item.reaction);
        setLikeIcon(item.reaction);
      }
    }
  }, [state.postReaction]);

  useEffect(() => {
    if (state.reactToPostStatus === "completed") {
    } else if (state.reactToPostStatus === "failed") {
      toast.show({
        description: state.reactToPostError,
        variant: "contained",
      });
    }
    dispatch(clearPostRactionStatus());
  }, [state.reactToPostStatus]);

  const handleReactions = (reaction: string) => {
    setLikeIcon(reaction);
    dispatch(reactToPostAction({ postId: post.id, reaction }));
    dispatch(getPostFeedAction());

    dispatch(showReactionView({ show: false, post: null }));
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        // onLongPress={handleShowReactionView}
        onPress={() => {
          if (state.showReactionView)
            dispatch(showReactionView({ show: false, post: null }));
          else {
            handleShowReactionView();
            // handleLikeReactionOnPost(post);
          }
        }}
      >
        {likedIcon ? (
          <Text style={{ fontSize: 22 }}>{likedIcon}</Text>
        ) : (
          <AntDesign name={"hearto"} size={24} color={colors.navyBlue} />
        )}
      </TouchableOpacity>
      {state.showReactionView && state.postReacted?.id === post.id && (
        <View style={[GlobalStyles.shadowBox, styles.reactionWrapper]}>
          {REACTIONS.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => handleReactions(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    position: "relative",
  },

  reactionWrapper: {
    position: "absolute",
    width: 200,
    top: -48,
    left: -175,
    height: 40,
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReactionIcon;
