import { FlatList, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import HomeHeader from "../../components/Header/HomeHeader/HomeHeader";
import LiveFeedList from "./components/LiveFeedList";
import IntroList from "./components/IntroList";
import StoryFeedList from "./components/StoryFeedList";
import useDimension from "../../hooks/useDimension";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getPostFeedAction } from "../../actions/post";
import { useCallback, useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";

const DATA: { type: "LIVE_FEED" | "INTRO_FEED" | "STORY_FEED"; data: any[] }[] =
  [
    {
      type: "LIVE_FEED",
      data: [
        {
          id: 90,
          isUserProfile: true,
          image: require("../../../assets/image3.png"),
          isLive: false,
          userName: "My Story",
        },
        {
          id: 1,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image6.png"),
          isLive: true,
        },
        {
          id: 2,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image5.png"),
          isLive: false,
        },
        {
          id: 3,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image7.png"),
          isLive: false,
        },
        {
          id: 4,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image3.png"),
          isLive: false,
        },
        {
          id: 5,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image5.png"),
          isLive: false,
        },
        {
          id: 6,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image7.png"),
          isLive: false,
        },
        {
          id: 7,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image6.png"),
          isLive: false,
        },
        {
          id: 8,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image5.png"),
          isLive: false,
        },
        {
          id: 9,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image7.png"),
          isLive: false,
        },
        {
          id: 10,
          userName: "Avesta UX Hub",
          image: require("../../../assets/image3.png"),
          isLive: false,
        },
      ],
    },
    {
      type: "INTRO_FEED",
      data: [
        {
          id: 1,
          title: "Premiering",
          description: "Beginners Guide",
          time: "02:45:13",
        },
        {
          id: 2,
          title: "Premiering",
          description: "Beginners Guide",
          time: "02:45:13",
        },
        {
          id: 3,
          title: "Premiering",
          description: "Beginners Guide",
          time: "02:45:13",
        },
      ],
    },
    { type: "STORY_FEED", data: [] },
  ];

const Home = () => {
  const height = useDimension().height;

  const renderItems = ({
    item,
  }: {
    item: { type: "LIVE_FEED" | "INTRO_FEED" | "STORY_FEED"; data: any[] };
  }) => {
    switch (item.type) {
      case "LIVE_FEED":
        return <LiveFeedList />;
      case "INTRO_FEED":
        return (
          <View style={[GlobalStyles.mt20, GlobalStyles.mb20]}>
            <IntroList />
          </View>
        );
      case "STORY_FEED":
        return (
          <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
            <StoryFeedList />
          </View>
        );
    }
  };
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.postReducer);

  // useEffect(() => {
  //   if (state.getPostFeedStatus === "completed") {
  //     setRefresh(false);
  //     getPostFeeds();
  //   }
  // }, [state.getPostFeedStatus]);

  // const [isRefreshing, setRefresh] = useState(false);
  // const getPostFeeds = useCallback(() => {
  //   dispatch(getPostFeedAction());
  // }, []);
  // const handleOnRefresh = () => {
  //   setRefresh(true);
  //   getPostFeeds();
  // };
  return (
    <View style={[GlobalStyles.flexOne]}>
      <HomeHeader />
      <View style={[GlobalStyles.container, { marginRight: 0, flex: 1 }]}>
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderItems}
        />
      </View>
    </View>
  );
};

export default Home;
