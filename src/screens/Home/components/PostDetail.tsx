import { FC, useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { IPostFeed, IPostReaction } from '@app-model';

import {
  commentOnPostAction,
  getCommentsOnPostAction,
  getPostFeedAction,
  getPostFeedByIdAction,
  getPostReactions,
  likePostAction,
  unlikePostAction,
} from '../../../actions/post';
import ReadMore from 'react-native-read-more-text';
import { Spinner, useToast } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {
  IPostState,
  clearCreateCommentOnPostState,
  openReactionList,
} from '../../../reducers/post_reducer';
import Input from '../../../components/Input/Input';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { ISettingState } from '../../../reducers/settings';
import useAppSelector from '../../../hooks/useAppSelector';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import colors from '../../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CommentRowItem from './CommentRowItem';
import FbGrid from 'react-native-fb-image-grid';
import ReactionIcon from '../../../components/ReactionIcon/ReactionIcon';
import { Video, ResizeMode } from 'expo-av';
import EventDismisser from '../../../components/EventDismisser/EventDismisser';
import FullScreenImageCarousel from '../../../components/FullScreenImageCarousel/FullScreenImageCarousel';

interface IProps {
  item: IPostFeed;
}

const PostDetail = () => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const state = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<any>>();

  const [comment, setComment] = useState('');

  const postState = useAppSelector(
    (state: any) => state.postReducer,
  ) as IPostState;

  const item = postState.postDetail as IPostFeed;

  const [isPostLiked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(true);

  const isPostLikedByUser = useCallback(() => {
    const isLiked = item.likedBy.includes(state?.userInfo?.id as string);

    setLiked(isLiked);
  }, [postState.postDetail]);

  const onPress = (url: any, index: any, event: any) => {
    // url and index of the image you have clicked alongwith onPress event.
    setShowImageZoom(true);
  };

  const toast = useToast();

  useEffect(() => {
    isPostLikedByUser();
  }, [isPostLikedByUser]);

  useEffect(() => {
    if (showComments) dispatch(getCommentsOnPostAction(item.id));
  }, [showComments]);

  useEffect(() => {
    if (postState.commentOnPostStatus === 'failed') {
      toast.show({ description: postState.commentOnPostError });
    } else if (postState.commentOnPostStatus === 'completed') {
      setComment('');
      dispatch(clearCreateCommentOnPostState());
      dispatch(getCommentsOnPostAction(item.id));
      dispatch(getPostFeedAction());
    }
  }, [postState.commentOnPostStatus]);

  useEffect(() => {
    if (
      postState.likePostStatus === 'completed' ||
      postState.unlikePostStatus === 'completed'
    ) {
      dispatch(getPostFeedByIdAction(item.id));
    }
  }, [postState.likePostStatus, postState.unlikePostStatus]);

  useEffect(() => {
    if (postState.getCommentOnPostStatus === 'failed') {
      toast.show({ description: postState.commentOnPostError });
    }
  }, [postState.getCommentOnPostStatus]);

  const handleLikeReactionOnPost = () => {
    if (isPostLiked) {
      dispatch(unlikePostAction(item.id));
      // setLiked(false);
    } else {
      dispatch(likePostAction(item.id));
      // setLiked(true);
    }
  };

  const renderProfilePicture = (item: IPostReaction) => {
    if (item.user.profilePicture && item.user.profilePicture.trim() !== '') {
      return { uri: item.user.profilePicture };
    }
    return require('../../../../assets/imageAvatar.jpeg');
  };

  const handleLoadComments = () => {};

  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize13,
          GlobalStyles.fontWeight400,
          { color: colors.navyBlue, marginTop: 5 },
        ]}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize13,
          GlobalStyles.fontWeight400,
          { color: colors.navyBlue, marginTop: 5 },
        ]}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  const handlePostComment = () => {
    if (comment.trim() === '') return;

    dispatch(commentOnPostAction({ postId: item.id, comment }));
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

  const renderComments = () => {
    if (!showComments) return null;

    return (
      <View style={styles.commentWrapper}>
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontWeight700,
              GlobalStyles.fontSize13,
              { lineHeight: 16 },
            ]}
          >
            Comments
          </Text>
          <View>
            {postState.getCommentOnPostStatus === 'loading' && (
              <Spinner
                accessibilityLabel="Loading comments"
                color="emerald.500"
              />
            )}
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: 20 }}>
          {postState.postComments.map((comment) => (
            <CommentRowItem key={comment.id} item={comment} />
          ))}
        </View>
      </View>
    );
  };

  const handleGetPostReactions = (postId: string) => {
    dispatch(getPostReactions(postId));
    dispatch(openReactionList(true));
  };

  return (
    <EventDismisser>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
        // keyboardShouldPersistTaps={"always"}
      >
        <ScrollView
          style={[GlobalStyles.container]}
          // contentContainerStyle={[{ flexGrow: 1 }]}
        >
          <TouchableOpacity
            style={[GlobalStyles.mb20]}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color={colors.primary} />
          </TouchableOpacity>
          <View>
            <View style={styles.storyHeader}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View>
                  <Image
                    source={{ uri: item.user.profilePicture as string }}
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
                    GlobalStyles.mb20,
                  ]}
                >
                  {item?.user?.firstName} {item?.user?.lastName}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ justifyContent: 'center' }}>
                <Feather name="more-horizontal" size={24} color={colors.grey} />
              </TouchableOpacity>
            </View>
            <View>
              {item.content && item.content.trim() !== '' ? (
                <Text
                  style={[
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize13,
                  ]}
                >
                  {item.content}
                </Text>
              ) : null}
              {item.images && item.images.length > 0 ? (
                <View style={{ width: '100%', height: 300 }}>
                  <FbGrid images={item.images} onPress={onPress} />
                </View>
              ) : null}
              {item.videos && item.videos.length > 0
                ? item.videos.map((item) => (
                    <View
                      style={[
                        GlobalStyles.mb20,
                        { width: '100%', height: 300 },
                      ]}
                    >
                      <Video
                        style={{ width: '100%', height: 300 }}
                        source={{
                          uri: item,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        shouldPlay={false}
                      />
                    </View>
                  ))
                : null}
            </View>
          </View>
          <View
            style={[
              GlobalStyles.flewRow,
              GlobalStyles.mt10,
              GlobalStyles.mb10,
              { alignItems: 'center' },
            ]}
          >
            <View
              style={[GlobalStyles.flewRow, { gap: 12, alignItems: 'center' }]}
            >
              <TouchableOpacity onPress={() => handleGetPostReactions(item.id)}>
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight700,
                  ]}
                >
                  {item.reactionCount} Reactions
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize10,
                  GlobalStyles.fontWeight700,
                ]}
              >
                {item.commentCount} comments
              </Text>
            </View>
            <View
              style={[
                GlobalStyles.flewRow,
                { gap: 20, justifyContent: 'flex-end', flex: 1 },
              ]}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={24}
                  color={colors.navyBlue}
                />
              </TouchableOpacity>
              <ReactionIcon
                post={item}
                isLiked={isPostLiked}
                handleLikeReactionOnPost={handleLikeReactionOnPost}
                handleOnReactionActivate={() => {}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleLoadComments} style={{}}>
            <ReadMore
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
              numberOfLines={3}
            >
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontWeight400,
                ]}
              >
                {item.content}
              </Text>
            </ReadMore>
          </TouchableOpacity>
          <View style={{ paddingBottom: 200 }}>{renderComments()}</View>
        </ScrollView>

        <View style={styles.bottomInputStyle}>
          <Input
            inputViewStyle={styles.commentInputViewStyle}
            placeholder="Comment"
            multiline
            suffixElement={renderSendButton()}
            onChangeText={(value) => setComment(value)}
            value={comment}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
          />
        </View>

        {showImageZoom && (
          <FullScreenImageCarousel
            images={(item.images || []).map((item) => ({ uri: item }))}
            isVisible={showImageZoom}
            onRequestClose={() => setShowImageZoom(false)}
          />
        )}
      </KeyboardAvoidingView>
    </EventDismisser>
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
    justifyContent: 'center',
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
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 300,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default PostDetail;
