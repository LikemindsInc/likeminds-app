import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import useDimension from "../../hooks/useDimension";
import { AntDesign, Feather, Foundation, FontAwesome, Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import { StatusBar } from "react-native";
import { Box, Pressable, useColorModeValue } from "native-base";
import LiveFeedList from "../Home/components/LiveFeedList";
import { APP_SCREEN_LIST } from "../../constants";

const SpaceProfile = () => {
  const height = useDimension().height;
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View
      style={[
        GlobalStyles.container,
        { paddingHorizontal: 0, paddingVertical: 0 },
      ]}
    >
      <View>
        <ImageBackground
          resizeMode="cover"
          source={require("../../../assets/image11.png")}
          style={[
            styles.imageBg,
            height * 0.4 > 240 ? { height: 240 } : { height: height * 0.4 },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.imageHeaderWrapper]}
          >
            <AntDesign name="arrowleft" size={24} color={colors.white} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <ScrollView style={styles.contentWrapper}>
        <View
          style={[
            GlobalStyles.flewRow,
            GlobalStyles.mb10,
            { justifyContent: "space-between" },
          ]}
        >
          <View>
            <Text
              style={[
                GlobalStyles.fontWeight700,
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.textNavyBlue,
              ]}
            >
              Jacob Dominic
            </Text>
          </View>
          <TouchableOpacity>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize15,
              GlobalStyles.textGrey,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            UX Hub is known for creating and sharing the most modern and trend
            setting UIs. We never let the experience down but we always up the
            Design game
          </Text>
        </View>
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <View style={styles.boxSummary}>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize15,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight700,
                GlobalStyles.textNavyBlue,
              ]}
            >
              593
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.textGrey,
              ]}
            >
              Followers
            </Text>
          </View>
          <View style={styles.boxSummary}>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize15,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight700,
                GlobalStyles.textNavyBlue,
              ]}
            >
              17
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.textGrey,
              ]}
            >
              Posts
            </Text>
          </View>
          <View style={styles.boxSummary}>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize15,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight700,
                GlobalStyles.textNavyBlue,
              ]}
            >
              34
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize10,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.textGrey,
              ]}
            >
              Events
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <Button containerStyle={{ flex: 1 }} title="Go Live" />
          <Button type="cancel" containerStyle={{ flex: 1 }} title="Edit" />
        </View>
        <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
          <LiveFeedList />
        </View>
        <TabViewExample />
      </ScrollView>
      <View style={[GlobalStyles.flewRow, {justifyContent:"space-between", paddingTop: 8}]}>
      <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN_LIST.SPACE_SEARCH_SCREEN)}><FontAwesome name="fighter-jet" size={24} color={colors.grey} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN_LIST.HOME_SCREEN)}><AntDesign name="plus" size={24} color={colors.grey} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN_LIST.CHAT_ICON_TAB)}><Ionicons name="chatbubbles-outline" size={24} color={colors.grey} /></TouchableOpacity>
      </View>
    </View>
  );
};

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  posts: FirstRoute,
  videos: SecondRoute,
  events: FirstRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState<any>([
    {
      key: "posts",
      title: <AntDesign name="appstore-o" size={24} color="black" />,
    },
    {
      key: "videos",
      title: <Foundation name="play-video" size={24} color="black" />,
    },
    {
      key: "events",
      title: <AntDesign name="calendar" size={24} color="black" />,
    },
  ]);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "#284453"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: 240,
    minHeight: 300,
  },
  imageHeaderWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  contentWrapper: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 25,
    flexGrow: 1,
  },
  boxSummary: {
    flex: 1,
    backgroundColor: "#F3F5F7",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default SpaceProfile;
