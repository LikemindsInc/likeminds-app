import { IPostCommentFeed, IPostFeed } from '@app-model';
import { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../theme/colors';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
  IPostState,
  clearPostRactionStatus,
  handleShowCommentReaction,
  showReactionView,
} from '../../reducers/post_reducer';
import { GlobalStyles } from '../../theme/GlobalStyles';
import {
  getCommentReaction,
  getCommentsOnPostAction,
  getPostFeedAction,
  reactToCommentAction,
  removeCommentReaction,
} from '../../actions/post';
import { useToast } from 'native-base';

interface Props {
  post: IPostCommentFeed;

  isLiked?: boolean;
  isComment?: boolean;
  id?: string;
}

const CommentReactionIcon: FC<Props> = ({ post, isLiked }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;

  const [likedIcon, setLikeIcon] = useState<any>(null);

  const handleShowReactionView = () => {
    dispatch(handleShowCommentReaction({ show: true, post }));
  };

  const REACTIONS = useMemo(() => ['💡', '👏', '😄', '💝', '❤️'], []);

  useEffect(() => {
    dispatch(
      getCommentReaction({
        postId: post.postId,
        commentId: post.id as string,
      }),
    );
  }, []);

  const data = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    if (state.reactionsOnComment.length > 0) {
      const item = state.reactionsOnComment.findLast(
        (item) =>
          item.user.id === data.userInfo?.id && item.commentId === post.id,
      );

      if (item) {
        setLikeIcon(item.reaction);
      }
    }
  }, [state.reactionsOnComment]);

  const handleReactions = (reaction: string) => {
    if (likedIcon === reaction) {
      setLikeIcon(null);
      dispatch(
        removeCommentReaction({
          postId: post.postId,
          commentId: post.id as string,
        }),
      );
    } else {
      setLikeIcon(reaction);

      dispatch(
        reactToCommentAction({
          postId: post.postId,
          reaction,
          commentId: post.id as string,
        }),
      );
    }
    dispatch(handleShowCommentReaction({ show: false, post: null }));

    dispatch(getPostFeedAction());
    dispatch(getCommentsOnPostAction(post.postId));
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => {
          if (state.showCommentReactionView)
            dispatch(handleShowCommentReaction({ show: false, post: null }));
          else {
            handleShowReactionView();
          }
        }}
      >
        {likedIcon ? (
          <Text style={{ fontSize: 22 }}>{likedIcon}</Text>
        ) : (
          <AntDesign name={'hearto'} size={24} color={colors.navyBlue} />
        )}
      </TouchableOpacity>
      {state.showCommentReactionView &&
        state.commentReacted?.id === post.id && (
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
    position: 'relative',
  },

  reactionWrapper: {
    position: 'absolute',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CommentReactionIcon;
