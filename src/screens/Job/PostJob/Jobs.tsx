import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { Feather, AntDesign } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import {
  Tailor,
  Industry,
  Location,
  Type,
  Company,
  ExperienceLevel,
  Salary,
  PostDate,
} from "../../../components/Dropdown/Dropdown";
import JobItem from "../../../components/JobItem/JobItem";
import { useCallback, useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getJobsAction } from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";

export default function Jobs() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.postReducer);
  const [isRefreshing, setRefresh] = useState(false);
  const getJobs = useCallback(() => {
    dispatch(getJobsAction());
  }, []);

  useEffect(() => {
    if (state.getJobsStatus === "completed") {
      setRefresh(false);
    }
  }, [state.getJobsStatus]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);
  // const _handleRefresh = () => {
  //   setRefresh(true);
  //   getJobs();
  // };
  return (
    <View style={[GlobalStyles.container, { width: "100%" }]}>
      <View style={[GlobalStyles.flewRow, { marginBottom: 8 }]}>
        <View style={[GlobalStyles.flexOne]}>
          <Text
            style={[
              GlobalStyles.title,
              GlobalStyles.fontInterRegular,
              { fontWeight: "800" },
            ]}
          >
            {" "}
            Jobs{" "}
          </Text>
        </View>
        <TouchableOpacity style={styles.filter}>
          <Feather name="sliders" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.search}>
          <AntDesign name="search1" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 80 }}>
        <ScrollView
          style={{ marginTop: 8, marginBottom: 8 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[GlobalStyles.flewRow]}>
            <Tailor />
            <PostDate />
            <Location />
            <ExperienceLevel />
            <Type />
            <Company />
            <Salary />
          </View>
        </ScrollView>
      </View>
      <FlatList
        // refreshing={isRefreshing}
        style={{ flex: 1, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={state.jobs}
        renderItem={({ item }) => <JobItem item={item} />}
        keyExtractor={(item) => item.id}
        // onRefresh={_handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
