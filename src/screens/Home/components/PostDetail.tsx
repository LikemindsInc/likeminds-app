import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { IPostFeed, IPostReaction } from "@app-model";

import {
  commentOnPostAction,
  getCommentsOnPostAction,
  getPostFeedAction,
  getPostFeedByIdAction,
  getPostReactions,
  likePostAction,
  unlikePostAction,
} from "../../../actions/post";
import ReadMore from "react-native-read-more-text";
import { Spinner, useToast } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import {
  IPostState,
  clearCreateCommentOnPostState,
} from "../../../reducers/post_reducer";
import Input from "../../../components/Input/Input";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { ISettingState } from "../../../reducers/settings";
import useAppSelector from "../../../hooks/useAppSelector";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import colors from "../../../theme/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CommentRowItem from "./CommentRowItem";
import FbGrid from "react-native-fb-image-grid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ReactionIcon from "../../../components/ReactionIcon/ReactionIcon";
import moment from "moment";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
interface IProps {
  item: IPostFeed;
}

const PostDetail = () => {
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "60%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<any>>();

  const [comment, setComment] = useState("");

  const postState = useAppSelector(
    (state: any) => state.postReducer
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
    console.log("url> ", url);
    console.log("index> ", index);
  };

  const toast = useToast();

  useEffect(() => {
    isPostLikedByUser();
  }, [isPostLikedByUser]);

  useEffect(() => {
    if (showComments) dispatch(getCommentsOnPostAction(item.id));
  }, [showComments]);

  useEffect(() => {
    if (postState.commentOnPostStatus === "failed") {
      toast.show({ description: postState.commentOnPostError });
    } else if (postState.commentOnPostStatus === "completed") {
      setComment("");
      dispatch(clearCreateCommentOnPostState());
      dispatch(getCommentsOnPostAction(item.id));
      dispatch(getPostFeedAction());
    }
  }, [postState.commentOnPostStatus]);

  useEffect(() => {
    if (
      postState.likePostStatus === "completed" ||
      postState.unlikePostStatus === "completed"
    ) {
      dispatch(getPostFeedByIdAction(item.id));
    }
  }, [postState.likePostStatus, postState.unlikePostStatus]);

  useEffect(() => {
    if (postState.getCommentOnPostStatus === "failed") {
      toast.show({ description: postState.commentOnPostError });
    }
  }, [postState.getCommentOnPostStatus]);

  const handleLikeReactionOnPost = () => {
    if (isPostLiked) {
      console.log("unliking a post");
      dispatch(unlikePostAction(item.id));
      // setLiked(false);
    } else {
      dispatch(likePostAction(item.id));
      // setLiked(true);
    }
  };

  const renderProfilePicture = (item: IPostReaction) => {
    if (item.user.profilePicture && item.user.profilePicture.trim() !== "") {
      return { uri: item.user.profilePicture };
    }
    return require("../../../../assets/image3.png");
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
    if (comment.trim() === "") return;

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
            {postState.getCommentOnPostStatus === "loading" && (
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
  };

  useEffect(() => {
    if (postState.postReaction.length > 0) {
      bottomSheetRef2.current?.expand();
    }
  }, [postState.postReaction]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View>
                <Image
                  source={
                    item.user?.profilePicture
                      ? { uri: item.user.profilePicture }
                      : require("../../../../assets/image3.png")
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
                  GlobalStyles.mb20,
                ]}
              >
                {item?.user?.firstName} {item?.user?.lastName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: "center" }}>
              <Feather name="more-horizontal" size={24} color={colors.grey} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 300 }}>
            {item.images && item.images.length > 0 ? (
              <FbGrid images={item.images} onPress={onPress} />
            ) : (
              <Image
                source={require("../../../../assets/image8.png")}
                style={styles.image}
                resizeMethod="auto"
                resizeMode="cover"
              />
            )}
          </View>
        </View>
        <View
          style={[
            GlobalStyles.flewRow,
            GlobalStyles.mt10,
            GlobalStyles.mb10,
            { alignItems: "center" },
          ]}
        >
          <View
            style={[GlobalStyles.flewRow, { gap: 12, alignItems: "center" }]}
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
      <BottomSheet
        ref={bottomSheetRef2}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={"close"} />
        )}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 1, flex: 1 }}
          >
            <View style={[GlobalStyles.container, { backgroundColor: "#fff" }]}>
              {postState.postReaction.map((item) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    justifyContent: "space-between",
                  }}
                  key={item.id}
                >
                  <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
                    <View>
                      <Image
                        source={renderProfilePicture(item)}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                        resizeMethod="auto"
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.fontInterRegular,
                          GlobalStyles.fontSize13,
                          GlobalStyles.textNavyBlue,
                        ]}
                      >
                        {item.user?.firstName} {item.user?.lastName}
                      </Text>
                      <Text
                        style={[
                          GlobalStyles.fontInterRegular,
                          GlobalStyles.fontSize10,
                          GlobalStyles.textGrey,
                        ]}
                      >
                        {moment(item.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>{item.reaction}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
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
  contentContainer: {
    flexGrow: 1,
  },
});

export default PostDetail;
