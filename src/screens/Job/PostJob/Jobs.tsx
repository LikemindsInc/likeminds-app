import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TextStyle,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getJobsAction } from "../../../actions/post";
import useAppSelector from "../../../hooks/useAppSelector";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import {
  INDUSTRIES,
  JOB_EXPERIENCE,
  JOB_LOCATION,
  JOB_TYPES,
  TAILOR_JOBS,
} from "../../../constants";
import { IndustryItem, JobType } from "./PostJob";
import Button from "../../../components/Button/Button";
import {
  setJobFilterTailorValue,
  setJobLocationFilterValue,
} from "../../../reducers/post_reducer";
import Input from "../../../components/Input/Input";
import { Spinner } from "native-base";
import { IGetJobDTO } from "@app-model";

export default function Jobs() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.postReducer);
  const [isRefreshing, setRefresh] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const bottomSheetRef3 = useRef<BottomSheet>(null);
  const bottomSheetRef4 = useRef<BottomSheet>(null);
  const [sortBy, setSortBy] = useState<"recent" | "relevant">("recent");
  const snapPoints = useMemo(() => ["50%", "60%"], []);

  const [location, setLocation] = useState("");

  const handleOnIndustrySelect = (industry: string) => {
    dispatch(setJobFilterTailorValue(industry));
    setSelectedIndustry(industry);
  };

  const handleOnLocationSelect = (value: string) => {
    setLocation(value);
    dispatch(setJobLocationFilterValue(value));
  };

  const handleSearch = () => {
    dispatch(getJobsAction({ search: searchValue, sort: sortBy }));
  };

  const renderSearchButton = (styles?: TextStyle) => {
    return (
      <TouchableOpacity onPress={handleSearch}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontWeight700,
            GlobalStyles.fontSize13,
            GlobalStyles.textPrimary,
            styles,
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>
    );
  };

  const [searchMode, setSearchMode] = useState(false);

  const handleActivateSearch = () => {
    setSearchMode((state) => !state);
  };

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selected, setSelected] = useState("");
  const [experienceLevel, setExprienceLevel] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const getJobs = useCallback(() => {
    dispatch(
      getJobsAction(
        filterSearchQuery({
          search: searchValue,
          sort: sortBy,
          experienceLevel,
        })
      )
    );
  }, []);

  const handleOnJobTypeSelect = (text: string) => {
    setJobType(text);
  };

  const handleSetExperienceLevel = (text: string) => {
    setExprienceLevel(text);
  };

  const [jobType, setJobType] = useState("");

  useEffect(() => {
    if (!searchMode) setSearchValue("");
  }, [searchMode]);

  useEffect(() => {
    dispatch(
      getJobsAction(
        filterSearchQuery({
          search: searchValue,
          sort: sortBy,
          experienceLevel,
        })
      )
    );
  }, [sortBy]);

  const filterSearchQuery = (data: IGetJobDTO) => {
    if (data.experienceLevel?.trim().toLowerCase() === "all")
      data.experienceLevel = "";

    return data;
  };

  const handleChangeSortBy = () => {
    if (sortBy === "recent") {
      setSortBy("relevant");
      return;
    }
    setSortBy("recent");
  };

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  useEffect(() => {
    dispatch(
      getJobsAction(
        filterSearchQuery({
          search: searchValue,
          sort: sortBy,
          experienceLevel,
        })
      )
    );
  }, [experienceLevel]);

  return (
    <View style={[GlobalStyles.container, { width: "100%" }]}>
      {searchMode ? (
        <View style={[GlobalStyles.flewRow, { alignItems: "center" }]}>
          <View style={{ flex: 1 }}>
            <Input
              inputStyle={{ flex: 1 }}
              placeholder="Search..."
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
              suffixElement={renderSearchButton()}
              autoCorrect={false}
              returnKeyType="done"
              keyboardType={"default"}
            />
          </View>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={handleActivateSearch}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
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
          <TouchableOpacity onPress={handleChangeSortBy} style={styles.filter}>
            <Feather name="sliders" size={24} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleActivateSearch}
            style={styles.search}
          >
            <AntDesign name="search1" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 80 }}>
        <ScrollView
          style={{ marginTop: 8, marginBottom: 8 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[GlobalStyles.flewRow]}>
            <Tailor bottomSheetRef={bottomSheetRef} />
            <PostDate />
            <Location bottomSheetRef={bottomSheetRef4} />
            <ExperienceLevel bottomSheetRef={bottomSheetRef3} />
            <Type bottomSheetRef={bottomSheetRef2} />
            <Company />
            <Salary />
          </View>
        </ScrollView>
      </View>
      <View>
        {state.getJobsStatus === "loading" && (
          <View
            style={[
              GlobalStyles.flewRow,
              GlobalStyles.mb20,
              { justifyContent: "center" },
            ]}
          >
            <Spinner />
          </View>
        )}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={"close"} />
        )}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, flexGrow: 1, flexBasis: 1 }}
          >
            <View style={[GlobalStyles.container]}>
              {[{ label: "All", value: "All" }, ...TAILOR_JOBS].map(
                (item, i) => (
                  <IndustryItem
                    text={item.value}
                    key={i}
                    handleOnSelect={() => handleOnIndustrySelect(item.value)}
                    isSelected={item.value === selectedIndustry}
                  />
                )
              )}
            </View>
          </ScrollView>
          <View
            style={[{ marginTop: 30, paddingHorizontal: 16, marginBottom: 20 }]}
          >
            <Button
              onPress={() => bottomSheetRef.current?.close()}
              title="Apply"
            />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRef2}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={"close"} />
        )}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, flexGrow: 1, flexBasis: 1 }}
          >
            <View style={[GlobalStyles.container]}>
              {JOB_TYPES.map((item, i) => (
                <JobType
                  isSelected={item.value === jobType}
                  onPress={() => handleOnJobTypeSelect(item.value)}
                  text={item.label}
                  key={i}
                />
              ))}
            </View>
          </ScrollView>
          <View
            style={[{ marginTop: 10, paddingHorizontal: 16, marginBottom: 20 }]}
          >
            <Button
              onPress={() => bottomSheetRef2.current?.close()}
              title="Apply"
            />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRef3}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={"close"} />
        )}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, flexGrow: 1, flexBasis: 1 }}
          >
            <View style={[GlobalStyles.container]}>
              {[{ label: "All", value: "All" }, ...JOB_EXPERIENCE].map(
                (item, i) => (
                  <JobType
                    isSelected={item.value === experienceLevel}
                    onPress={() => handleSetExperienceLevel(item.value)}
                    text={item.label}
                    key={i}
                  />
                )
              )}
            </View>
          </ScrollView>
          <View
            style={[{ marginTop: 10, paddingHorizontal: 16, marginBottom: 20 }]}
          >
            <Button
              onPress={() => bottomSheetRef3.current?.close()}
              title="Apply"
            />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRef4}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={"close"} />
        )}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, flexGrow: 1, flexBasis: 1 }}
          >
            <View style={[GlobalStyles.container]}>
              {[{ label: "All", value: "All" }, ...JOB_LOCATION].map(
                (item, i) => (
                  <IndustryItem
                    text={item.value}
                    key={i}
                    handleOnSelect={() => handleOnLocationSelect(item.value)}
                    isSelected={item.value === location}
                  />
                )
              )}
            </View>
          </ScrollView>
          <View
            style={[{ marginTop: 30, paddingHorizontal: 16, marginBottom: 20 }]}
          >
            <Button
              onPress={() => bottomSheetRef.current?.close()}
              title="Apply"
            />
          </View>
        </View>
      </BottomSheet>
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
