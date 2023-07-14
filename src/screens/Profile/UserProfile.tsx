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

const UserProfile = () => {
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
          source={require("../../../assets/image9.png")}
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
              GlobalStyles.textPrimary,
              GlobalStyles.fontWeight400,
              GlobalStyles.mb10,
            ]}
          >
            UI/UX Designer
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
            From Lagos, Nigeria. Lives in LA, California.
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
            I enjoy creating products that improve the user experience.
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
              Post
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <Button containerStyle={{ flex: 1 }} title="Connect" />
          <Button type="cancel" containerStyle={{ flex: 1 }} title="Chat" />
        </View>
        <TabViewExample />
      </ScrollView>
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

export default UserProfile;
