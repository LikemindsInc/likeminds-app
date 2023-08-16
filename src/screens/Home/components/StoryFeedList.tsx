import { FlatList, useToast } from "native-base";
import StoryFeedItem from "../../../components/StoryFeedItem/StoryFeedItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getPostFeedAction } from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";
import { IPostState } from "../../../reducers/post_reducer";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { Text, View } from "react-native";

const StoryFeedList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;
  const [isRefreshing, setRefresh] = useState(false);

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
    }
  }, [state.getPostFeedStatus]);

  useEffect(() => {
    if (state.createPostStatus === "completed") {
      getPostFeeds();
    }
  }, [state.createPostStatus]);

  useEffect(() => {
    if (state.getPostFeedStatus === "completed") {
      setRefresh(false);
    }
  }, [state.getPostFeedStatus]);

  const handleOnRefresh = () => {
    setRefresh(true);
    getPostFeeds();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={(props) => <StoryFeedItem item={props.item} />}
        data={state.postFeeds}
        keyExtractor={(item) => `${item.id}`}
        style={{ flexGrow: 1 }}
        refreshing={isRefreshing}
        onRefresh={handleOnRefresh}
      />
    </View>
  );
};

export default StoryFeedList;
