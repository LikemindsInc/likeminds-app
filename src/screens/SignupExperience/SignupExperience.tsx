import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Checkbox } from "native-base";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useAppSelector from "../../hooks/useAppSelector";
import { ISessionState, updateExperience } from "../../reducers/session";
import { ISettingState } from "../../reducers/settings";
import DateFormatter from "../../utils/date-formatter";
import useAppDispatch from "../../hooks/useAppDispatch";
import BackButton from "../../components/Navigation/BackButton/BackButton";

const SignupExperience = () => {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stillWorkHere, setStillWorkHere] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const setting = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const handleOnNextPress = () => {
    dispatch(
      updateExperience({
        startDate,
        stillWorkHere,
        endDate,
        jobTitle,
        companyName,
        responsiblities: responsibilities,
      })
    );
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Experience" />
      </View>
      <View style={[GlobalStyles.mb40]}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight700,
            GlobalStyles.textGrey,
          ]}
        >
          Add a work experience, you may skip if you don’t have any
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble]}>
          <DatePicker
            onDateChange={(date) =>
              setStartDate(DateFormatter.format(date, "YYYY-MM-DD"))
            }
            placeholder="Start Date"
            style={styles.inputFlex}
          />
          {!stillWorkHere && (
            <DatePicker
              onDateChange={(date) =>
                setEndDate(DateFormatter.format(date, "YYYY-MM-DD"))
              }
              placeholder="End Date"
              style={styles.inputFlex}
            />
          )}
        </View>
        <View
          style={[
            GlobalStyles.mb20,
            GlobalStyles.displayRow,
            { alignItems: "center" },
          ]}
        >
          <Checkbox
            value="STILL_WORK_HERE"
            accessibilityLabel="choose numbers"
            onChange={(value) => setStillWorkHere((state) => !state)}
          />
          <View style={{ paddingLeft: 8 }}>
            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.textGrey,
                GlobalStyles.fontSize15,
              ]}
            >
              I still work here
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input
            value={jobTitle}
            onChangeText={(text) => setJobTitle(text)}
            placeholder="Job Title"
          />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
            placeholder="Company Name"
          />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input
            value={responsibilities}
            onChangeText={(text) => setResponsibilities(text)}
            placeholder="Responsibilities"
            multiline
            style={[styles.inputFlex, { height: 100, paddingVertical: 8 }]}
          />
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink title="Skip For Now" color={colors.black} />
        </View>
        <Button title="Continue" onPress={handleOnNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputDouble: {
    flexDirection: "row",
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default SignupExperience;
