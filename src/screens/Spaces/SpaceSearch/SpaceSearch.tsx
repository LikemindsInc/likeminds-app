import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import Input from "../../../components/Input/Input";
import { Feather, AntDesign } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { TabView, SceneMap } from "react-native-tab-view";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, useColorModeValue } from "native-base";
import { StatusBar } from "react-native";
import Spaces from "./Spaces/Spaces";
import PeopleList from "./PeopleList/PeopleList";
import _ from "underscore";
import Util from "../../../utils";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { getUsers } from "../../../actions/connection";
import { clearSearchedUsers } from "../../../reducers/connection";

const SpaceSearch = () => {
  const ref = useRef<TextInput>(null) as MutableRefObject<TextInput>;

  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();

  const handleTextChange = Util.debounce((text) => {
    // Do other processing with the debounced value here

    if (searchText.trim() === "") return dispatch(clearSearchedUsers());

    dispatch(getUsers({ search: searchText, page: 1, size: 10000 }));
  }, 300);

  useEffect(() => {
    handleTextChange();
  }, [searchText]);

  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.flewRow]}>
        <View style={[GlobalStyles.flexOne]}>
          <Input
            inputRef={ref}
            contentContainerStyle={{ marginBottom: 0 }}
            prefixIcon={
              <AntDesign name="search1" size={24} color={colors.primary} />
            }
            placeholder="search"
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
          />
        </View>
        {/* <TouchableOpacity style={styles.searchButton}>
          <Feather name="sliders" size={24} color={colors.grey} />
        </TouchableOpacity> */}
      </View>
      <View style={[GlobalStyles.mt20, { flex: 1 }]}>
        <SpacePeopleTabView />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  space: Spaces,
  people: PeopleList,
});

function SpacePeopleTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "space", title: "Spaces" },
    { key: "people", title: "People" },
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

export default SpaceSearch;
