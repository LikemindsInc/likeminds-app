import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import HomeHeader from '../../components/Header/HomeHeader/HomeHeader';
import LiveFeedList from './components/LiveFeedList';
import IntroList from './components/IntroList';
import StoryFeedList from './components/StoryFeedList';
import useDimension from '../../hooks/useDimension';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getPostFeedAction } from '../../actions/post';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { IPostReaction } from '@app-model';
import moment from 'moment';
import { openReactionList } from '../../reducers/post_reducer';
import colors from '../../theme/colors';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import EventDismisser from '../../components/EventDismisser/EventDismisser';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getProfile } from '../../reducers/connection';
import { APP_SCREEN_LIST } from '../../constants';
import ReactionsViewModal from '../../components/ReactionsViewModal/ReactionsViewModal';

const DATA: { type: 'LIVE_FEED' | 'INTRO_FEED' | 'STORY_FEED'; data: any[] }[] =
  [
    {
      type: 'LIVE_FEED',
      data: [
        {
          id: 90,
          isUserProfile: true,
          image: require('../../../assets/imageAvatar.jpeg'),
          isLive: false,
          userName: 'My Story',
        },
        {
          id: 1,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image6.png'),
          isLive: true,
        },
        {
          id: 2,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image5.png'),
          isLive: false,
        },
        {
          id: 3,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image7.png'),
          isLive: false,
        },
        {
          id: 4,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/imageAvatar.jpeg'),
          isLive: false,
        },
        {
          id: 5,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image5.png'),
          isLive: false,
        },
        {
          id: 6,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image7.png'),
          isLive: false,
        },
        {
          id: 7,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image6.png'),
          isLive: false,
        },
        {
          id: 8,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image5.png'),
          isLive: false,
        },
        {
          id: 9,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/image7.png'),
          isLive: false,
        },
        {
          id: 10,
          userName: 'Avesta UX Hub',
          image: require('../../../assets/imageAvatar.jpeg'),
          isLive: false,
        },
      ],
    },
    {
      type: 'INTRO_FEED',
      data: [
        {
          id: 1,
          title: 'Premiering',
          description: 'Beginners Guide',
          time: '02:45:13',
        },
        {
          id: 2,
          title: 'Premiering',
          description: 'Beginners Guide',
          time: '02:45:13',
        },
        {
          id: 3,
          title: 'Premiering',
          description: 'Beginners Guide',
          time: '02:45:13',
        },
      ],
    },
    { type: 'STORY_FEED', data: [] },
  ];

const Home = () => {
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '60%'], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const [isRefreshing, setRefresh] = useState(false);

  const renderProfilePicture = (item: IPostReaction) => {
    if (item.user.profilePicture && item.user.profilePicture.trim() !== '') {
      return { uri: item.user.profilePicture };
    }
    return require('../../../assets/imageAvatar.jpeg');
  };

  const renderItems = ({
    item,
  }: {
    item: { type: 'LIVE_FEED' | 'INTRO_FEED' | 'STORY_FEED'; data: any[] };
  }) => {
    switch (item.type) {
      case 'LIVE_FEED':
        return (
          <View
            style={[
              {
                paddingTop: 4,
                paddingBottom: 2,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: colors.white,
                marginBottom: 0,
                marginTop: 0,
              },
            ]}
          >
            <LiveFeedList />
          </View>
        );

      case 'STORY_FEED':
        return (
          <View>
            <StoryFeedList />
          </View>
        );
    }
  };
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.postReducer);

  const session = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    if (state.showReactionList && state.postReaction.length > 0) {
      bottomSheetRef2.current?.expand();
    }
  }, [state.postReaction, state.showReactionList]);
  useEffect(() => {
    if (state.getPostFeedStatus === 'completed') {
      setRefresh(false);
    }
  }, [state.getPostFeedStatus]);
  const getPostFeeds = useCallback(() => {
    dispatch(getPostFeedAction());
  }, []);
  const handleOnRefresh = () => {
    setRefresh(true);
    getPostFeeds();
  };
  const navigation = useNavigation<NavigationProp<any>>();
  const handleNavigationToProfileScreen = (profileId: string) => {
    bottomSheetRef2.current?.close();
    dispatch(openReactionList(false));
    if (profileId === session?.userInfo?.id) {
      return navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN);
    }

    dispatch(getProfile(profileId));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };
  return (
    <View style={[GlobalStyles.flexOne]}>
      <HomeHeader />
      <EventDismisser>
        <IOScrollView
          // contentContainerStyle={{ flex: 1 }}
          style={[
            {
              marginRight: 0,
              flex: 1,
              paddingTop: 16,
              paddingLeft: 0,
              backgroundColor: colors.white,
            },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleOnRefresh}
              colors={[colors.primary]} // for android
              tintColor={colors.primary} // for ios
            />
          }
          rootMargin={{ top: 0 }}
        >
          {DATA.map((item) => renderItems({ item }))}
        </IOScrollView>
      </EventDismisser>
    </View>
  );
};

export default Home;
