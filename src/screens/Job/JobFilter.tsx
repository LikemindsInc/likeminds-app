import { Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import Button from "../../components/Button/Button";
import { Divider } from "native-base";
import colors from "../../theme/colors";
import { RadioButtonProps, RadioGroup } from "../../components/RadioGroup";
import { useMemo, useState } from "react";
import useDimension from "../../hooks/useDimension";
import { JOB_EXPERIENCE } from "../../constants";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getJobsAction } from "../../actions/post";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const JobFilter = () => {
  const { width } = useDimension();
  const columnWidth = (width - 80) / 2;
  const [sortBy, setSortBy] = useState<"recent" | "relevant" | undefined>();
  const [datePosted, setDatePosted] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [company, setCompany] = useState("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      [
        { label: "Most Recent", value: "recent" },
        { label: "Most Relevant", value: "relevant" },
      ].map((item, i) => ({
        id: item.value,
        label: item.label,
        value: item.value,
      })),
    []
  );

  const radioButtons2: RadioButtonProps[] = useMemo(
    () =>
      [
        { label: "Any Time", value: "anytime" },
        { label: "Past Week", value: "pastweek" },
        { label: "Last 24 hours", value: "last24hours" },
        { label: "Last Month", value: "lastmonth" },
      ].map((item, i) => ({
        id: item.value,
        label: item.label,
        value: item.value,
      })),
    []
  );

  const radioButtons3: RadioButtonProps[] = useMemo(
    () =>
      JOB_EXPERIENCE.map((item, i) => ({
        id: item.value,
        label: item.label,
        value: item.value,
      })),
    []
  );

  const radioButtons4: RadioButtonProps[] = useMemo(
    () =>
      [
        "Turing",
        "Beyond",
        "Eris Solution",
        "Bistol",
        "Arbisoft",
        "Keep Trucking",
      ].map((item, i) => ({
        id: item,
        label: item,
        value: item,
      })),
    []
  );

  const applyFilterHandler = () => {
    dispatch(
      getJobsAction({ sort: sortBy, experienceLevel, postedDate: "anytime" })
    );
    navigation.goBack();
  };
  return (
    <View
      style={
        (GlobalStyles.container,
        { flex: 1, paddingHorizontal: 0, backgroundColor: colors.white })
      }
    >
      <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
        <BackButton title="Job Filters" />
      </View>
      <View style={[GlobalStyles.flexOne]}>
        <Divider style={{ marginBottom: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Sort By
            </Text>
            <View style={[GlobalStyles.mt10]}>
              <RadioGroup
                radioButtons={radioButtons}
                descriptionStyle={{ width: columnWidth }}
                layout="row"
                color={colors.primary}
                containerStyle={{
                  flexWrap: "wrap",
                  width: "100%",
                  flexDirection: "row",
                  gap: 20,
                }}
                onPress={(value: any) => setSortBy(value)}
                selectedId={sortBy}
              />
            </View>
          </View>
        </View>
        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Date Posted
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <RadioGroup
              radioButtons={radioButtons2}
              descriptionStyle={{ width: columnWidth }}
              layout="row"
              color={colors.primary}
              containerStyle={{
                flexWrap: "wrap",
                gap: 20,
              }}
              onPress={(value: string) => setDatePosted(value)}
              selectedId={datePosted}
            />
          </View>
        </View>
        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Experience Level
            </Text>
          </View>
          <View style={[GlobalStyles.mt10, GlobalStyles.mb20]}>
            <RadioGroup
              radioButtons={radioButtons3}
              descriptionStyle={{ width: columnWidth }}
              layout="row"
              color={colors.primary}
              containerStyle={{
                flexWrap: "wrap",
                gap: 20,
              }}
              onPress={(value: string) => setExperienceLevel(value)}
              selectedId={experienceLevel}
            />
          </View>
        </View>
        <Divider style={{ marginBottom: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Company
            </Text>
            <View style={[GlobalStyles.mt10]}>
              <RadioGroup
                radioButtons={radioButtons4}
                descriptionStyle={{ width: columnWidth }}
                layout="row"
                color={colors.primary}
                containerStyle={{
                  flexWrap: "wrap",
                  gap: 20,
                }}
                onPress={(value: string) => setCompany(value)}
                selectedId={company}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={applyFilterHandler} title="Apply" />
      </View>
    </View>
  );
};

export default JobFilter;
