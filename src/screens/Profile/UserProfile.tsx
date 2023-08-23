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
import colors, { addOpacity } from "../../theme/colors";
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
import UserPostFeed from "./components/UserPostFeed";
import UserExperience from "./components/UserExperience";
import { useUser } from "../../hooks/userUser";
import ReadMore from "react-native-read-more-text";
import moment from "moment";

const UserProfile = () => {
  const height = useDimension().height;
  const navigation = useNavigation<NavigationProp<any>>();

  const [user] = useUser();

  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
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
          GlobalStyles.fontSize10,
          GlobalStyles.fontWeight400,
          { color: colors.navyBlue, marginTop: 5 },
        ]}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };
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
            height * 0.4 > 240
              ? { height: 240 }
              : { height: height * 0.4, position: "relative" },
          ]}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          ></View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.imageHeaderWrapper]}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowRadius: 10,
                  textShadowOffset: { width: 2, height: 2 },
                  color: colors.white,
                }}
                // color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
      >
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
          {state.userInfo?.experience[0]?.jobTitle && (
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize15,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.mb10,
              ]}
            >
              {state.userInfo?.experience[0]?.jobTitle}
            </Text>
          )}

          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.textPrimary,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            From {state.userInfo?.city}, {state.userInfo?.country}. Lives in{" "}
            {state.userInfo?.countryOfOrigin}
          </Text>
          <ReadMore
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}
            numberOfLines={3}
          >
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textGrey,
                GlobalStyles.fontWeight400,
                GlobalStyles.mb10,
              ]}
            >
              {state.userInfo?.bio}
            </Text>
          </ReadMore>
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
              {state.userInfo?.followingCount || 0}
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
              {state.userInfo?.postCount}
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
        {/* <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <Button containerStyle={{ flex: 1 }} title="Connect" />
          <Button type="cancel" containerStyle={{ flex: 1 }} title="Chat" />
        </View> */}
        <View style={{ height: 600 }}>
          <TabViewExample />
        </View>
      </ScrollView>
    </View>
  );
};

const FirstRoute = () => {
  const [user] = useUser();
  console.log("user> ", user?.certificates);
  const filterExperience = () => {
    return (
      user?.experience
        .filter(
          (item) =>
            item.companyName !== "" &&
            item.responsibilities?.trim() !== "" &&
            item.jobTitle?.trim() !== ""
        )
        .map((item) => ({
          title: (
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text
                style={[
                  GlobalStyles.fontInterBlack,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                {item.companyName}
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textGrey,
                  GlobalStyles.fontWeight700,
                ]}
              >
                {item.stillWorkHere ? (
                  `${moment(item.startDate).format("MMM YYYY")} - PRESENT`
                ) : (
                  <Text>
                    {moment(item.startDate).format("MMM YYYY")} -{" "}
                    {moment(item.endDate).format("MMM YYYY")}
                  </Text>
                )}
              </Text>
            </View>
          ),
          description: (
            <View style={[{ marginTop: -5 }]}>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textPrimary,
                  GlobalStyles.mb10,
                  GlobalStyles.mt10,
                ]}
              >
                {item.jobTitle}
              </Text>

              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textGrey,
                  GlobalStyles.mb10,
                ]}
              >
                {item.responsibilities}
              </Text>
            </View>
          ),
        })) || []
    );
  };

  const filterEducatio = () => {
    return (
      user?.education.map((item) => ({
        title: (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize13,
                GlobalStyles.textNavyBlue,
              ]}
            >
              Education
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textGrey,
                GlobalStyles.fontWeight700,
              ]}
            >
              <Text>
                {moment(item.startDate).format("MMM YYYY")} -{" "}
                {moment(item.endDate).format("MMM YYYY")}
              </Text>
            </Text>
          </View>
        ),
        description: (
          <View style={[{ marginTop: -5 }]}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textPrimary,
                GlobalStyles.mb10,
                GlobalStyles.mt10,
              ]}
            >
              {item.degree}
            </Text>

            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textGrey,
                GlobalStyles.mb10,
              ]}
            >
              {item.school}
            </Text>
          </View>
        ),
      })) || []
    );
  };

  const filterCertificates = () => {
    return (
      user?.certificates.map((item) => ({
        title: (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          ></View>
        ),
        description: (
          <View style={[{ marginTop: -5 }]}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textGrey,
                GlobalStyles.mb10,
                GlobalStyles.mt10,
              ]}
            >
              {item.name}
            </Text>
          </View>
        ),
      })) || []
    );
  };
  return (
    <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
      <UserExperience
        data={[
          ...filterExperience(),
          ...filterEducatio(),
          {
            title: "Skills",
            description: user?.skills.join(","),
          },

          {
            title: "Certificates",
            description: (
              <View>
                {filterCertificates().map((item) => (
                  <View>{item.description}</View>
                ))}
              </View>
            ),
          },
        ]}
      />
    </View>
  );
};

const SecondRoute = () => {
  return (
    <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
      <UserPostFeed />
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
