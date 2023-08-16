import { FlatList, useToast } from "native-base";
import StoryFeedItem from "../../../components/StoryFeedItem/StoryFeedItem";
import { useCallback, useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  getCurrentUserFeedAction,
  getPostFeedAction,
} from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";
import { IPostState } from "../../../reducers/post_reducer";

const UserPostFeed = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;
  const [isRefreshing, setRefresh] = useState(false);
  const getPostFeeds = useCallback(() => {
    dispatch(getCurrentUserFeedAction());
  }, []);

  const toast = useToast();

  useEffect(() => {
    getPostFeeds();
  }, []);

  useEffect(() => {
    if (state.getCurrentUserPostStatus === "failed") {
      console.log("error:", state.getPostFeedError);
    }
  }, [state.getCurrentUserPostStatus]);

  useEffect(() => {
    if (state.createPostStatus === "completed") {
      getPostFeeds();
    }
  }, [state.createPostStatus]);

  useEffect(() => {
    if (state.getCurrentUserPostStatus === "completed") {
      setRefresh(false);
    }
  }, [state.getCurrentUserPostStatus]);

  const handleOnRefresh = () => {
    setRefresh(true);
    getPostFeeds();
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      renderItem={(props) => <StoryFeedItem item={props.item} />}
      data={state.currentUserPostFeeds}
      keyExtractor={(item) => `${item.id}`}
      style={{ flexGrow: 1 }}
      refreshing={isRefreshing}
      onRefresh={handleOnRefresh}
    />
  );
};

export default UserPostFeed;
