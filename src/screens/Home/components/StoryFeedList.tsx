import { FlatList, useToast } from "native-base";
import StoryFeedItem from "../../../components/StoryFeedItem/StoryFeedItem";
import { useCallback, useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getPostFeedAction } from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";
import { IPostState } from "../../../reducers/post_reducer";

const DATA = [
  {
    id: 1,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 2,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 3,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 4,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 5,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 6,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
];

const StoryFeedList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;
  const getPostFeeds = useCallback(() => {
    dispatch(getPostFeedAction());
  }, []);

  const toast = useToast();

  useEffect(() => {
    getPostFeeds();
  }, []);

  useEffect(() => {
    if (state.getPostFeedStatus === "failed") {
      console.log("error:", state.getPostFeedError);
      toast.show({
        description:
          state.getPostFeedError || "unable to fetch posts. Please try again",
        variant: "success",
      });
    }
  }, [state.getPostFeedStatus]);

  useEffect(() => {
    if (state.createPostStatus === "completed") {
      getPostFeeds();
    }
  }, [state.createPostStatus]);

  const handleOnRefres = () => {
    getPostFeeds();
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      renderItem={(props) => <StoryFeedItem item={props.item} />}
      data={state.postFeeds}
      keyExtractor={(item) => `${item.id}`}
      style={{ flex: 1, flexGrow: 1 }}
      onRefresh={handleOnRefres}
    />
  );
};

export default StoryFeedList;
