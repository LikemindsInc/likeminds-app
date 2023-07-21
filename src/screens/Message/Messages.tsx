import {
    Animated,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
  } from "react-native";
  import { GlobalStyles } from "../../theme/GlobalStyles";
  import Input from "../../components/Input/Input";
  import { Feather, AntDesign } from "@expo/vector-icons";
  import colors from "../../theme/colors";
  import { TabView, SceneMap } from "react-native-tab-view";
  import { useState } from "react";
  import { Box, useColorModeValue } from "native-base";
  import { StatusBar } from "react-native";
  import Spaces from "../Spaces/SpaceSearch/Spaces/Spaces";
  import IndividualList from "./IndividualList";

export default function Messages() {
  return (
    <View style={[GlobalStyles.container]}>
        <View style={{marginBottom: 8}}>
            <Text style={[GlobalStyles.title, {fontWeight: "800"}]}> Messages </Text>
        </View>
      <View>
          <Input
            contentContainerStyle={{ marginBottom: 0 }}
            prefixIcon={
              <AntDesign name="search1" size={24} color={colors.primary} />
            }
            placeholder="search"
          />
      </View>
      <View style={[GlobalStyles.mt20, { flex: 1 }]}>
        <SpaceIndividualTabView />
      </View>
    </View>
  )
}

const renderScene = SceneMap({
    space: Spaces,
    individual: IndividualList,
  });

function SpaceIndividualTabView() {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: "individual", title: "Individual" },
      { key: "space", title: "Spaces" },
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
    searchButton: {
      backgroundColor: "#F3F5F7",
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
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