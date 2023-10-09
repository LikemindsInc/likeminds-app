import { FlatList, useToast } from 'native-base';
import StoryFeedItem from '../../../components/StoryFeedItem/StoryFeedItem';
import { useCallback, useEffect, useState } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {
  getConnectionPostFeedAction,
  getCurrentUserFeedAction,
  getPostFeedAction,
} from '../../../actions/post';
import useAppSelector from '../../../hooks/useAppSelector';
import { IPostState } from '../../../reducers/post_reducer';

const ConnectionPostFeed = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;
  const connection = useAppSelector((state) => state.connectionReducer);
  const [isRefreshing, setRefresh] = useState(false);
  const getPostFeeds = useCallback(() => {
    dispatch(getConnectionPostFeedAction(connection.profileId));
  }, []);

  const toast = useToast();

  useEffect(() => {
    getPostFeeds();
  }, []);

  useEffect(() => {
    if (state.getConnectionPostFeedStatus === 'failed') {
      console.log('error:', state.getPostFeedError);
    }
  }, [state.getConnectionPostFeedStatus]);

  useEffect(() => {
    if (state.createPostStatus === 'completed') {
      getPostFeeds();
    }
  }, [state.createPostStatus]);

  useEffect(() => {
    if (state.getCurrentUserPostStatus === 'completed') {
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
      data={state.connectionPostFeeds}
      keyExtractor={(item) => `${item.id}`}
      style={{ flexGrow: 1 }}
      refreshing={isRefreshing}
      onRefresh={handleOnRefresh}
    />
  );
};

export default ConnectionPostFeed;
