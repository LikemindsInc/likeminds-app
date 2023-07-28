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
import { AntDesign, Feather } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import { StatusBar } from "react-native";
import { Box, Pressable, useColorModeValue } from "native-base";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState } from "../../reducers/session";
import { ISettingState } from "../../reducers/settings";
import StoryFeedList from "../Home/components/StoryFeedList";

const UserProfile = () => {
  const height = useDimension().height;
  const navigation = useNavigation<NavigationProp<any>>();

  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;
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
          source={
            state.userInfo?.profilePicture &&
            state.userInfo.profilePicture.trim() !== ""
              ? { uri: state.userInfo.profilePicture }
              : require("../../../assets/image9.png")
          }
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
              {state.userInfo?.firstName || "John"}{" "}
              {state.userInfo?.lastName || "Doe"}
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
              GlobalStyles.textPrimary,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            {state.userInfo?.role}
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize15,
              GlobalStyles.textPrimary,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            From {state.userInfo?.city || "Lagos"},{" "}
            {state.userInfo?.country || "Nigeria"}. Lives in{" "}
            {state.userInfo?.countryOfOrigin || "Nigeria"}.
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize15,
              GlobalStyles.textGrey,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            {state.userInfo?.bio}
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
              0
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
              Network
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
              0
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
              Following
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
              0
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
              Post
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <Button containerStyle={{ flex: 1 }} title="Connect" />
          <Button type="cancel" containerStyle={{ flex: 1 }} title="Chat" />
        </View>
        <View style={{ height: 600 }}>
          <TabViewExample />
        </View>
      </ScrollView>
    </View>
  );
};

const FirstRoute = () => <View style={{ flex: 1 }} />;

const SecondRoute = () => {
  return (
    <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
      <StoryFeedList />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Bio" },
    { key: "second", title: "Feed" },
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
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
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

export default UserProfile;
