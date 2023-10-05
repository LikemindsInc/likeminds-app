import {
  Animated,
  ImageBackground,
  Linking,
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
import { Profiler, useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Box, Pressable, useColorModeValue } from "native-base";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState } from "../../reducers/session";
import { ISettingState } from "../../reducers/settings";
import StoryFeedList from "../Home/components/StoryFeedList";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  getRequestConnectionStatus,
  getSingleUserAction,
  requestConnection,
  undoConnectionRequest,
} from "../../actions/connection";
import { useToast } from "react-native-toast-notifications";
import {
  clearConnectionProfileData,
} from "../../reducers/connection";
import UserExperience from "./components/UserExperience";
import ConnectionPostFeed from "./components/ConnectionPostFeed";
import ReadMore from "react-native-read-more-text";
import moment from "moment";
import renderExperienceTimelineView from "./components/renderExperienceTimelineView";

const ConnectionProfile = () => {
  const height = useDimension().height;
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useAppDispatch();

  const state = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const selector = useAppSelector((state) => state.connectionReducer);

  const getStatus = useCallback(() => {
    if (!selector.profile?.id) return;
    dispatch(getRequestConnectionStatus(selector.profile?.id as string));
  }, [selector.profile?.id]);

  const getUserProfile = useCallback(() => {
    if (selector.profileId.trim() === "") return;
    dispatch(getSingleUserAction(selector.profileId));
  }, [selector.profileId]);

  useEffect(() => {
    getStatus();
    getUserProfile();
  }, [getStatus]);

  const handleUndoConnectionRequest = () => {
    if (!selector.connectionRequestId) return;

    dispatch(undoConnectionRequest(selector.connectionRequestId));
  };

  const handleConnectToUser = () => {
    dispatch(requestConnection(selector.profile?.id as string));
  };

  useEffect(() => {
    if (selector.undoConnectionStatus === "completed") {
      dispatch(getRequestConnectionStatus(selector.profile?.id as string));
    }
  }, [selector.undoConnectionStatus]);

  const getButtonType = () => {
    if (!selector.connectionStatus) return "primary";

    switch (selector.connectionStatus) {
      case "approved":
        return "outline-primary";
      case "pending":
        return "tertiary";
      default:
        return "primary";
    }
  };

  const requestButtonDisabled = () => {
    if (selector.requestConnectionStatus === "loading") return true;

    if (selector.connectionStatus && selector.connectionStatus === "pending")
      return true;

    return false;
  };

  const getText = () => {
    if (!selector.connectionStatus) return "Connect";

    switch (selector.connectionStatus) {
      case "approved":
        return "Following";
      case "pending":
        return "Pending";
      default:
        return "Connect";
    }
  };

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

  useEffect(() => {
    if (selector.requestConnectionStatus === "completed") {
      dispatch(getRequestConnectionStatus(selector.profile?.id as string));
    }
  }, [selector.requestConnectionStatus]);

  const renderConnectionButton = () => {
    if (selector.requestConnectionStatus === "loading")
      return (
        <Button
          loading={selector.requestConnectionStatus === "loading"}
          disabled={requestButtonDisabled()}
          containerStyle={{ flex: 1 }}
          type={getButtonType()}
          title={getText()}
        />
      );
    if (selector.connectionStatus === "pending") {
      return (
        <Button
          onPress={handleUndoConnectionRequest}
          containerStyle={{ flex: 1 }}
          type={"tertiary"}
          title={getText()}
          loading={selector.undoConnectionStatus === "loading"}
        />
      );
    }
    return (
      <Button
        onPress={handleConnectToUser}
        containerStyle={{ flex: 1 }}
        type={getButtonType()}
        title={getText()}
        loading={selector.getConnectionStatus === "loading"}
      />
    );
  };

  const handleBackNavigation = () => {
    dispatch(clearConnectionProfileData());
    navigation.goBack();
  };

  const initials = state?.userInfo?.email
  ? `${state?.userInfo?.email[0]}${state?.userInfo?.email[1]}`.toLocaleUpperCase()
  : "IN";

  return (
    <View
      style={[
        GlobalStyles.container,
        { paddingHorizontal: 0, paddingVertical: 0 },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={styles.contentWrapper}
      >
        <View>
          {selector.profile?.profilePicture ? (<ImageBackground
            resizeMode="cover"
            source={
              selector.profile?.profilePicture &&
              selector.profile.profilePicture.trim() !== ""
                ? { uri: selector.profile.profilePicture }
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
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            ></View>
            <TouchableOpacity
              onPress={handleBackNavigation}
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
              />
            </TouchableOpacity>
          </ImageBackground>): initials ? (
						<View
							style={[
								styles.imageBg,
								height * 0.4 > 240
									? { height: 240 }
									: { height: height * 0.4, position: "relative" },
								{
									flex: 1,
									width: "100%",
									justifyContent: "center",
									alignItems: "center",
									position: "relative",
									backgroundColor: "#daf3ff",
									top: -50,
								},
							]}
						>
							<View
								style={{
									position: "absolute",
									alignSelf: "flex-start",
									top: 50,
								}}
							>
								<TouchableOpacity
									onPress={() => navigation.goBack()}
									style={[styles.imageHeaderWrapper]}
								>
									<AntDesign
										name="arrowleft"
										size={24}
										style={{
											textShadowColor: "#fff",
											textShadowRadius: 10,
											textShadowOffset: { width: 2, height: 2 },
											color: "#000",
										}}
									/>
								</TouchableOpacity>
							</View>

							<View
								style={[
									{
										width: 100,
										height: 100,
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 500,
										backgroundColor: "#f1f3f9",
									},
								]}
							>
								<Text
									style={[
										GlobalStyles.fontWeight600,
										GlobalStyles.textNavyBlue,
										{
											fontSize: 40,
										},
									]}
								>
									{initials}
								</Text>
							</View>
						</View>
					) : null}
          
        </View>
        <View style={styles.contentWrapper}>
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
                {selector.profile?.firstName}
                {selector.profile?.lastName}
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
                GlobalStyles.fontSize13,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.mb10,
              ]}
            >
              {selector.profile?.experience[0]?.jobTitle}
            </Text>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.mb10,
              ]}
            >
              From {selector.profile?.city}
              {selector.profile?.country}
              {selector.profile?.countryOfOrigin}.
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
                {selector.profile?.bio}
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
                {state.userInfo?.postCount || 0}
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
            {renderConnectionButton()}
            <Button type="cancel" containerStyle={{ flex: 1 }} title="Chat" />
          </View>
          <View style={{ height: 600 }}>
            <TabViewExample />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const FirstRoute = () => {
  const selector = useAppSelector((state) => state.connectionReducer);
  const dispatch = useAppDispatch();
  const getUserProfile = useCallback(() => {
    dispatch(getSingleUserAction(selector.profileId));
  }, [selector.profileId]);

  const width = useDimension().width;

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const filterExperience = () => {
    const timeline =
      selector.profile?.experience
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
                  GlobalStyles.fontInterMedium,
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
                  {
                    maxWidth: 0.45 * width,
                  },
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
        })) ||
      renderExperienceTimelineView({
        showExperienceModal: null,
        title: "Experience",
        actionTitle: "Add Experience",
      });

    return [
      {
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
                GlobalStyles.mb10,
              ]}
            >
              Experience
            </Text>
          </View>
        ),

        description: [
          ...timeline.map((item) => (
            <View style={{ marginBottom: 10 }}>
              {item.title}
              {item.description}
            </View>
          )),
        ],
      },
    ];
  };

  const filterEducatio = () => {
    const timeline =
      selector.profile?.education.map((item) => ({
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
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize13,
                GlobalStyles.textNavyBlue,
              ]}
            ></Text>
          </View>
        ),
        description: (
          <View style={[{ marginTop: -5 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textPrimary,
                  {
                    maxWidth: 0.45 * width,
                  },
                ]}
              >
                {item.degree}
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
      })) ||
      renderExperienceTimelineView({
        showExperienceModal: null,
        title: "Education",
        actionTitle: "Add Education",
      });

    return [
      {
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
                GlobalStyles.mb10,
              ]}
            >
              Education
            </Text>
          </View>
        ),

        description: timeline.map((item) => (
          <View style={{ marginBottom: 10 }}>{item.description}</View>
        )),
      },
    ];
  };

  const handleFileDownload = async (url: string) => {
    try {
      if (!(url.startsWith("https") || url.startsWith("http"))) return;

      url = url.startsWith("https://") ? url : `https://${url}`;

      url = url.trim();

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log("Error opening Link", error);
    }
  };

  const filterCertificates = () => {
    const timeline =
      selector.profile?.certificates.map((item) => ({
        title: (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
              marginBottom: 10,
            }}
          ></View>
        ),
        description: (
          <View style={[{ marginBottom: 10 }]}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row", gap: 12 }}
              onPress={() => handleFileDownload(item.url)}
            >
              <View
                style={{
                  backgroundColor: colors.navyBlue,
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  paddingHorizontal: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    GlobalStyles.fontInterBlack,
                    GlobalStyles.fontSize10,
                    { color: colors.white },
                  ]}
                >
                  PDF
                </Text>
              </View>
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
            </TouchableOpacity>
          </View>
        ),
      })) || [];

    return [
      {
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
                GlobalStyles.mb10,
              ]}
            >
              Certificate
            </Text>
          </View>
        ),

        description: timeline.map((item) => (
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            {item.description}
          </View>
        )),
      },
    ];
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      {filterExperience().length > 0 && (
        <UserExperience
          data={[
            ...filterExperience(),

            ...filterEducatio(),
            {
              title: "Skills",
              description: (
                <View style={{ marginBottom: 20, paddingTop: 20 }}>
                  <Text
                    style={[
                      GlobalStyles.fontInterRegular,
                      GlobalStyles.fontSize13,
                      GlobalStyles.textNavyBlue,
                    ]}
                  >
                    {selector.profile?.skills.join(",")}
                  </Text>
                </View>
              ),
            },

            ...filterCertificates(),
          ]}
        />
      )}
    </View>
  );
};

const SecondRoute = () => {
  return (
    <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
      <ConnectionPostFeed />
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

export default ConnectionProfile;
