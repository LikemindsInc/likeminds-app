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
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
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
import AppModal from "../../../components/Modal/AppModal";
import PeopleSearchForm from "../../../components/PeopleSearchForm/PeopleSearchForm";

const SpaceSearch = () => {
  const ref = useRef<TextInput>(null) as MutableRefObject<TextInput>;

  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();

  const [isModalVisible, setModal] = useState(false);

  const handleTextChange = Util.debounce((text) => {
    // Do other processing with the debounced value here

    if (searchText.trim() === "") return dispatch(clearSearchedUsers());

    dispatch(getUsers({ search: searchText, page: 1, size: 10000 }));
  }, 300);

  useEffect(() => {
    handleTextChange();
  }, [searchText]);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <View
      style={[
        GlobalStyles.container,
        { paddingHorizontal: 0, paddingBottom: 0 },
      ]}
    >
      <View style={[GlobalStyles.flewRow, { paddingHorizontal: 16, gap: 8 }]}>
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
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.searchButton}
        >
          <Feather name="sliders" size={24} color={colors.grey} />
        </TouchableOpacity>
      </View>
      <View style={[GlobalStyles.mt20, { flex: 1, paddingHorizontal: 0 }]}>
        <SpacePeopleTabView searchText={searchText} />
      </View>
      <AppModal
        onBackDropPress={closeModal}
        visible={isModalVisible}
        title="Select Categories"
        containerStyle={{ height: 400 }}
        backButton={
          <View>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </View>
        }
      >
        <PeopleSearchForm />
      </AppModal>
    </View>
  );
};

interface ISpaceSearchProps {
  searchText?: string;
}

function SpacePeopleTabView({ searchText }: ISpaceSearchProps) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "space", title: "Spaces" },
    { key: "people", title: "People" },
  ]);

  const renderScene = SceneMap({
    space: Spaces,
    people: () => (
      <View>
        <PeopleList searchText={searchText} />
      </View>
    ),
  });

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
    height: 60,
    // paddingVertical: 12,
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
