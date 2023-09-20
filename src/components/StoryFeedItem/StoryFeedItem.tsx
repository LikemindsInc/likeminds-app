import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import {
  FC,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../theme/colors";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { IPostCommentFeed, IPostFeed } from "@app-model";
import useAppSelector from "../../hooks/useAppSelector";
import { ISettingState } from "../../reducers/settings";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import {
  IPostState,
  clearCreateCommentOnPostState,
  openReactionList,
  savePostDetail,
} from "../../reducers/post_reducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  commentOnPostAction,
  getCommentsOnPostAction,
  getPostFeedAction,
  getPostReactions,
  likePostAction,
  unlikePostAction,
} from "../../actions/post";
import ReadMore from "react-native-read-more-text";
import Input from "../Input/Input";
import { Spinner, useToast } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import FbGrid from "react-native-fb-image-grid";
import ReactionIcon from "../ReactionIcon/ReactionIcon";
import { getProfile } from "../../reducers/connection";
import FullScreenImageCarousel from "../FullScreenImageCarousel/FullScreenImageCarousel";
import { Video, ResizeMode } from "expo-av";
import { IOScrollView, InView } from "react-native-intersection-observer";

interface IProps {
  item: IPostFeed;
}

const StoryFeedItem: FC<IProps> = ({ item }) => {
  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "60%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const dispatch = useAppDispatch();

  const [showImageZoom, setShowImageZoom] = useState(false);

  const videoRef = useRef(null) as any;

  const navigation = useNavigation<NavigationProp<any>>();

  const [comment, setComment] = useState("");

  const postState = useAppSelector(
    (state: any) => state.postReducer
  ) as IPostState;

  const [isPostLiked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const isPostLikedByUser = useCallback(() => {
    const isLiked = item.likedBy.includes(state?.userInfo?.id as string);

    setLiked(isLiked);
  }, [postState.postDetail]);

  const toast = useToast();

  useEffect(() => {
    isPostLikedByUser();
  }, [isPostLikedByUser]);

  useEffect(() => {
    if (
      postState.likePostStatus === "completed" ||
      postState.unlikePostStatus === "completed"
    ) {
      dispatch(getPostFeedAction());
    }
  }, [postState.likePostStatus, postState.unlikePostStatus]);

  useEffect(() => {
    if (showComments) dispatch(getCommentsOnPostAction(item.id));
  }, [showComments]);

  useEffect(() => {
    if (postState.commentOnPostStatus === "failed") {
      toast.show({ description: postState.commentOnPostError });
    } else if (postState.commentOnPostStatus === "completed") {
      setComment("");
      dispatch(clearCreateCommentOnPostState());
    }
  }, [postState.commentOnPostStatus]);

  useEffect(() => {
    if (postState.getCommentOnPostStatus === "failed") {
      toast.show({ description: postState.commentOnPostError });
    }
  }, [postState.getCommentOnPostStatus]);

  const handleLikeReactionOnPost = () => {
    if (isPostLiked) {
      dispatch(unlikePostAction(item.id));
      setLiked(false);
    } else {
      dispatch(likePostAction(item.id));
      setLiked(true);
    }
  };

  const handleLoadComments = () => {
    dispatch(savePostDetail(item));
    navigation.navigate(APP_SCREEN_LIST.POST_DETAIL);
  };

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

  const handleOnViewChange = (inView: boolean) => {
    // if (inView) {
    //   if (videoRef && videoRef.current) {
    //     videoRef.current.playAsync();
    //   }
    // } else {
    //   if (videoRef && videoRef.current) {
    //     videoRef.current.pauseAsync();
    //   }
    // }
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

  const renderCommentRowItem = (item: IPostCommentFeed) => {
    return (
      <View style={[GlobalStyles.mb5, { flexDirection: "row", gap: 12 }]}>
        <View style={[styles.storyHeader]}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Image
                source={
                  item.user?.profilePicture
                    ? { uri: item.user.profilePicture }
                    : require("../../../assets/imageAvatar.jpeg")
                }
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </View>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontSize13,
                GlobalStyles.fontWeight700,
                GlobalStyles.pl4,
              ]}
            >
              {item?.user?.firstName} {item?.user?.firstName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 1 }]}>
          <ReadMore
            numberOfLines={1}
            renderRevealedFooter={_renderRevealedFooter}
            renderTruncatedFooter={_renderTruncatedFooter}
          >
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight400,
              ]}
            >
              {item.comment}
            </Text>
          </ReadMore>
        </View>
        <View>
          <AntDesign name={"hearto"} size={14} color={colors.navyBlue} />
        </View>
      </View>
    );
  };

  const handlePostComment = () => {
    if (comment.trim() === "") return;

    dispatch(commentOnPostAction({ postId: item.id, comment }));
  };

  const renderSendButton = () => {
    return (
      <TouchableOpacity onPress={handlePostComment}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontWeight700,
            GlobalStyles.fontSize13,
            GlobalStyles.textPrimary,
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
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb10]}>
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
            {postState.getCommentOnPostStatus === "loading" && (
              <Spinner
                accessibilityLabel="Loading comments"
                color="emerald.500"
              />
            )}
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: 20 }}
        >
          {postState.postComments.map((comment) => (
            <View key={comment.id}>{renderCommentRowItem(comment)}</View>
          ))}
        </ScrollView>
        <Input
          inputViewStyle={styles.commentInputViewStyle}
          placeholder="Comment"
          multiline
          suffixElement={renderSendButton()}
          onChangeText={(value) => setComment(value)}
          value={comment}
        />
      </View>
    );
  };

  const onPress = (url: any, index: any, event: any) => {
    // url and index of the image you have clicked alongwith onPress event.

    setShowImageZoom(true);
  };

  const getReactionOnPost = (postId: string) => {
    dispatch(getPostReactions(postId));

    dispatch(openReactionList(true));
  };

  const handleNavigationToProfileScreen = () => {
    if (item.user.id === state?.userInfo?.id) {
      return navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN);
    }

    dispatch(getProfile(item.user.id));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.storyHeader}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={handleNavigationToProfileScreen}
          >
            <View>
              <Image
                source={
                  item.user?.profilePicture
                    ? { uri: item.user.profilePicture }
                    : require("../../../assets/imageAvatar.jpeg")
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
              {item?.user?.firstName} {item?.user?.lastName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Feather name="more-horizontal" size={24} color={colors.grey} />
          </TouchableOpacity>
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

          {renderComments()}
        </TouchableOpacity>

        {item.images && item.images.length > 0 ? (
          // <Image
          //   source={{ uri: item.images[0] }}
          //   style={styles.image}
          //   resizeMethod="auto"
          //   resizeMode="cover"
          // />
          <View style={{ width: "100%", height: 300 }}>
            <FbGrid images={item.images} onPress={onPress} />
          </View>
        ) : null}
        {item.videos && item.videos.length > 0
          ? item.videos.map((item) => (
              <InView onChange={handleOnViewChange}>
                <View style={[GlobalStyles.mt20]}>
                  <Video
                    style={{ width: "100%", height: 300 }}
                    source={{
                      uri: item,
                    }}
                    ref={videoRef}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay={false}
                  />
                </View>
              </InView>
            ))
          : null}
      </View>
      <View
        style={[
          GlobalStyles.mt10,
          GlobalStyles.mb10,
          {
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <View style={[{ gap: 12, alignItems: "center", flexDirection: "row" }]}>
          <TouchableOpacity onPress={() => getReactionOnPost(item.id)}>
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
          <TouchableOpacity onPress={handleLoadComments}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight700,
              ]}
            >
              {item.commentCount} comments
            </Text>
          </TouchableOpacity>
          {/* <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight700,
                GlobalStyles.textNavyBlue,
              ]}
            >
              {item.commentCount} shares
            </Text> */}
        </View>
        <View
          style={[
            {
              gap: 20,
              justifyContent: "flex-end",
              flex: 1,
              flexDirection: "row",
              width: "100%",
            },
          ]}
        >
          <TouchableOpacity onPress={handleLoadComments}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color={colors.navyBlue}
            />
          </TouchableOpacity>
          <ReactionIcon
            isLiked={isPostLiked}
            post={item}
            handleLikeReactionOnPost={handleLikeReactionOnPost}
            handleOnReactionActivate={() => {}}
          />
        </View>
      </View>
      <FullScreenImageCarousel
        images={(item.images || []).map((item) => ({ uri: item }))}
        isVisible={showImageZoom}
        onRequestClose={() => setShowImageZoom(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputViewStyle: {
    height: 44,
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

export default StoryFeedItem;
