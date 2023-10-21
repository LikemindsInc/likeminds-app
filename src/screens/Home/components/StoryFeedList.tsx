import { FlatList, useToast } from 'native-base';
import StoryFeedItem from '../../../components/StoryFeedItem/StoryFeedItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { getPostFeedAction } from '../../../actions/post';
import useAppSelector from '../../../hooks/useAppSelector';
import { IPostState } from '../../../reducers/post_reducer';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useDimension from '../../../hooks/useDimension';
import colors, { addOpacity } from '../../../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { APP_SCREEN_LIST } from '../../../constants';
// import SkeletonContent from 'react-native-skeleton-content';

const StoryFeedList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: any) => state.postReducer) as IPostState;
  const [isRefreshing, setRefresh] = useState(false);

  const flatLisRef = useRef() as any;

  const getPostFeeds = useCallback(() => {
    dispatch(getPostFeedAction());
  }, []);

  const toast = useToast();

  useEffect(() => {
    getPostFeeds();
  }, []);

  useEffect(() => {
    if (state.getPostFeedStatus === 'failed') {
      console.log('error:', state.getPostFeedError);
    }
  }, [state.getPostFeedStatus]);

  useEffect(() => {
    if (state.createPostStatus === 'completed') {
      getPostFeeds();
    }
  }, [state.createPostStatus]);

  useEffect(() => {
    if (state.getPostFeedStatus === 'completed') {
      if (flatLisRef.current)
        flatLisRef.current.scrollToOffset({ animated: true, offset: 0 });
      setRefresh(false);
    }
  }, [state.getPostFeedStatus]);

  const handleOnRefresh = () => {
    setRefresh(true);
    getPostFeeds();
  };

  if (state.getPostFeedStatus === 'loading' && state.postFeeds.length === 0)
    return null;

  if (state.getPostFeedStatus === 'completed' && state.postFeeds.length === 0)
    return (
      <View style={{ flex: 1, paddingLeft: 16, backgroundColor: colors.white }}>
        <EmptyPostContent />
      </View>
    );

  return (
    <View
      style={[
        GlobalStyles.container,
        { flex: 1, flexGrow: 1, paddingHorizontal: 16 },
      ]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={(props) => <StoryFeedItem item={props.item} />}
        data={state.postFeeds}
        keyExtractor={(item) => `${item.id}`}
        style={{ flexGrow: 1 }}
        ref={flatLisRef}
        // refreshing={isRefreshing}
      />
    </View>
  );
};

const EmptyPostContent = () => {
  const { height } = useDimension();
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ flex: 1, height: 0.8 * height }}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={[
            GlobalStyles.fontSize16,
            GlobalStyles.fontWeight400,
            GlobalStyles.textGrey,
            GlobalStyles.fontInterRegular,
            { textAlign: 'center', color: `#000` },
          ]}
        >
          No content yet. Get started by posting something.
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={[
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
            GlobalStyles.textBlack,
            GlobalStyles.fontInterMedium,
          ]}
        >
          Get Started
        </Text>
        <ScrollView
          style={{ marginTop: 20, paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <View
            style={[
              {
                width: 220,
                backgroundColor: colors.white,
                borderRadius: 16,
                marginRight: 20,
              },
              styles.card,
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: '#F1F3FC',
                  paddingVertical: 20,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Image
                source={require('../../../../assets/25.png')}
                style={{ width: 68, height: 64 }}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#F6F6F6',
                    paddingVertical: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 132,
                    borderRadius: 20,
                    paddingHorizontal: 8,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(APP_SCREEN_LIST.POST_ICON_TAB)
                }
              >
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.textPrimary,
                    GlobalStyles.fontSize13,
                  ]}
                >
                  Post Content
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                width: 220,
                backgroundColor: colors.white,
                borderRadius: 16,
                marginRight: 20,
              },
              styles.card,
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: '#F1F3FC',
                  paddingVertical: 20,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Image
                source={require('../../../../assets/27.png')}
                style={{ width: 68, height: 64 }}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#F6F6F6',
                    paddingVertical: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 132,
                    borderRadius: 20,
                    paddingHorizontal: 8,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(APP_SCREEN_LIST.SPACE_SEARCH_SCREEN)
                }
              >
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.textPrimary,
                    GlobalStyles.fontSize13,
                  ]}
                >
                  Find People
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                width: 220,
                backgroundColor: colors.white,
                borderRadius: 16,
                marginRight: 20,
              },
              styles.card,
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: '#F1F3FC',
                  paddingVertical: 20,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Image
                source={require('../../../../assets/26.png')}
                style={{ width: 68, height: 64 }}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#F6F6F6',
                    paddingVertical: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 132,
                    borderRadius: 20,
                    paddingHorizontal: 8,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(APP_SCREEN_LIST.SPACE_SEARCH_SCREEN)
                }
              >
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.textPrimary,
                    GlobalStyles.fontSize13,
                  ]}
                >
                  Find Space
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'gray', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android elevation (simulates shadow)
    height: 182,
  },
});

export default StoryFeedList;
