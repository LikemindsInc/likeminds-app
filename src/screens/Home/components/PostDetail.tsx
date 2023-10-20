import colors from '../../../theme/colors';
import CommentRowItem from './CommentRowItem';
import EventDismisser from '../../../components/EventDismisser/EventDismisser';
import FbGrid from 'react-native-fb-image-grid';
import FullScreenImageCarousel from '../../../components/FullScreenImageCarousel/FullScreenImageCarousel';
import Input from '../../../components/Input/Input';
import ReactionIcon from '../../../components/ReactionIcon/ReactionIcon';
import ReadMore from 'react-native-read-more-text';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import VideoPlayer from 'expo-video-player';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { IPostFeed, IPostReaction } from '@app-model';
import { ISettingState } from '../../../reducers/settings';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ResizeMode } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner, useToast } from 'native-base';
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

import {
  commentOnPostAction,
  getCommentsOnPostAction,
  getPostFeedAction,
  getPostFeedByIdAction,
  getPostReactions,
  likePostAction,
  unlikePostAction,
} from '../../../actions/post';
import {
  IPostState,
  clearCreateCommentOnPostState,
  openReactionList,
} from '../../../reducers/post_reducer';
interface IProps {
  item: IPostFeed;
}

const PostDetail = () => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const videoRef = useRef(null) as any;

  const [inFullscreen, setInFullsreen] = useState(false);

  const state = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<any>>();

  const [comment, setComment] = useState('');

  const [imageMedia, setImageMedia] = useState<string[]>([]);
  const [videoMedia, setVideoMedia] = useState<string[]>([]);

  const postState = useAppSelector(
    (state: any) => state.postReducer,
  ) as IPostState;

  const item = postState.postDetail as IPostFeed;

  const [isPostLiked, setLiked] = useState(false);

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
    navigation.addListener('blur', clearState);
    return () => {
      navigation.removeListener('blur', clearState);
    };
  }, []);

  const clearState = () => {
    videoRef.current.setStatusAsync({
      shouldPlay: false,
    });
  };

  useEffect(() => {
    isPostLikedByUser();
  }, [isPostLikedByUser]);

  useEffect(() => {
    dispatch(getCommentsOnPostAction(item.id));
  }, []);

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

  const isCaptionOnlyPost = useCallback(() => {
    return item.images.length === 0 && item.videos?.length === 0;
  }, [item]);

  useEffect(() => {
    setImageMedia(item.images.filter((item) => !item.endsWith('.mp4')));

    setVideoMedia(
      item.images
        .filter((item) => item.endsWith('.mp4'))
        .concat(item.videos || []),
    );
  }, [item]);

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
              {!isCaptionOnlyPost() &&
              item.content &&
              item.content.trim() !== '' ? (
                <View style={{ marginBottom: 20 }}>
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
                </View>
              ) : null}
              {imageMedia.length > 0 ? (
                <View style={{ width: '100%', height: 300 }}>
                  <FbGrid images={imageMedia} onPress={onPress} />
                </View>
              ) : null}
              {videoMedia.length > 0
                ? videoMedia.map((item) => (
                    <View
                      style={[
                        GlobalStyles.mb20,
                        { width: '100%', height: 300 },
                      ]}
                    >
                      <VideoPlayer
                        videoProps={{
                          shouldPlay: false,
                          resizeMode: ResizeMode.CONTAIN,
                          source: {
                            uri: item,
                          },
                          style: {
                            width: '100%',
                            height: 300,
                            borderRadius: 16,
                          },
                          useNativeControls: true,
                          isLooping: false,
                          ref: videoRef,
                        }}
                        autoHidePlayer={false}
                        defaultControlsVisible={true}
                        style={{ height: 300 }}
                        fullscreen={{
                          visible: false,
                          enterFullscreen: async () => {
                            setInFullsreen(!inFullscreen);
                          },
                          exitFullscreen: async () => {
                            setInFullsreen(!inFullscreen);
                          },
                          inFullscreen,
                        }}
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
            {isCaptionOnlyPost() && (
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
            )}
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
