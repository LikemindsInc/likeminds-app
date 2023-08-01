import { IPostFeed } from "@app-model";
import { FC, useEffect, useMemo } from "react";
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
import { getPostFeedAction, reactToPostAction } from "../../actions/post";
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

  const handleShowReactionView = () => {
    dispatch(showReactionView({ show: true, post }));
  };

  const REACTIONS = useMemo(() => ["💡", "👏", "😄", "💝", "❤️"], []);

  const toast = useToast();

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
    dispatch(reactToPostAction({ postId: post.id, reaction }));
    dispatch(getPostFeedAction());
    dispatch(showReactionView({ show: false, post: null }));
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onLongPress={handleShowReactionView}
        onPress={() => {
          if (state.showReactionView)
            dispatch(showReactionView({ show: false, post: null }));
          else handleLikeReactionOnPost(post);
        }}
      >
        <AntDesign
          name={isLiked ? "heart" : "hearto"}
          size={24}
          color={isLiked ? colors.red : colors.navyBlue}
        />
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
