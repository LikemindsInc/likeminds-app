import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React, { useEffect, useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import DateFormatter from "../../utils/date-formatter";
import useAppDispatch from "../../hooks/useAppDispatch";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";
import { getAllIndustriesAction } from "../../actions/auth";

const SignupExperience = () => {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState(
    moment().subtract("7", "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [stillWorkHere, setStillWorkHere] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const settings = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    dispatch(getAllIndustriesAction());
  }, []);

  const [errors, setErrors] = useState<{
    startDate: null | string;
    endDate: null | string;
    companyName: string | null;
    jobTitle: string | null;
    responsibilities: string | null;
    industry: string | null;
  }>({
    startDate: null,
    endDate: null,
    companyName: null,
    jobTitle: null,
    responsibilities: null,
    industry: null,
  });

  useEffect(() => {
    setErrors({
      startDate: null,
      endDate: null,
      companyName: null,
      jobTitle: null,
      responsibilities: null,
      industry: null,
    });
  }, []);

  useEffect(() => {
    if (jobTitle.trim() !== "")
      setErrors((state) => ({ ...state, jobTitle: null }));
    // else
    //   setErrors((state) => ({ ...state, jobTitle: "Job title is required" }));
  }, [jobTitle]);

  useEffect(() => {
    if (companyName.trim() !== "")
      setErrors((state) => ({ ...state, companyName: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     companyName: "Company name is required",
    //   }));
  }, [companyName]);

  useEffect(() => {
    if (responsibilities.trim() !== "")
      setErrors((state) => ({ ...state, responsibilities: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     responsibilities: "Please provide responsiblities",
    //   }));
  }, [responsibilities]);

  const validateStartDate = () => {
    if (startDate.trim() !== "") {
      if (moment().diff(startDate, "days") < 0) {
        return setErrors((state) => ({
          ...state,
          startDate: "Start date can not be a future date",
        }));
      } else if (
        startDate.trim() !== "" &&
        moment(endDate).diff(startDate, "days") < 0
      ) {
        return setErrors((state) => ({
          ...state,
          startDate: "Start date can not be earlier than end date ",
        }));
      }
      setErrors((state) => ({ ...state, startDate: null }));
    } else
      setErrors((state) => ({
        ...state,
        startDate: "start date is required",
      }));
  };

  const validateEndDate = () => {
    if (!stillWorkHere) {
      setErrors((state) => ({ ...state, endDate: null }));
    } else if (endDate.trim() !== "") {
      if (
        startDate.trim() !== "" &&
        moment(startDate).diff(endDate, "days") < 0
      ) {
        return setErrors((state) => ({
          ...state,
          endDate: "End date can not be earlier than start date",
        }));
      }
      setErrors((state) => ({ ...state, endDate: null }));
    } else
      setErrors((state) => ({ ...state, endDate: "End date is required" }));
  };

  useEffect(() => {
    validateStartDate();
  }, [startDate, endDate]);

  useEffect(() => {
    validateEndDate();
  }, [endDate, stillWorkHere, startDate]);

  const session = useAppSelector(
    (state: any) => state.sessionReducer
  ) as ISessionState;

  const setting = useAppSelector(
    (state: any) => state.settingReducer
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const handleOnNextPress = () => {
    if (companyName.trim() === "")
      return setErrors((state) => ({
        ...state,
        companyName: "Company name is Required",
      }));
    if (responsibilities.trim() === "")
      return setErrors((state) => ({
        ...state,
        responsibilities: "Responsibilities is Required",
      }));
    if (jobTitle.trim() === "")
      return setErrors((state) => ({
        ...state,
        jobTitle: "Job title is Required",
      }));

    if (startDate.trim() === "")
      return setErrors((state) => ({
        ...state,
        startDate: "start date is required",
      }));
    dispatch(
      updateExperience({
        startDate,
        stillWorkHere,
        endDate,
        jobTitle,
        companyName,
        responsibilities: responsibilities,
        industry,
      })
    );
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };

  const handleOnSkip = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      // keyboardShouldPersistTaps={"always"}
    >
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={[styles.inputDouble]}>
            <DatePicker
              onDateChange={(date) =>
                setStartDate(DateFormatter.format(date, "YYYY-MM-DD"))
              }
              placeholder="Start Date"
              style={styles.inputFlex}
              errorMessage={errors.startDate}
            />
            {!stillWorkHere && (
              <DatePicker
                onDateChange={(date) =>
                  setEndDate(DateFormatter.format(date, "YYYY-MM-DD"))
                }
                placeholder="End Date"
                style={styles.inputFlex}
                errorMessage={errors.endDate}
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
              errorMessage={errors.jobTitle}
            />
          </View>
          <View style={[GlobalStyles.mb10]}>
            <Input
              value={companyName}
              onChangeText={(text) => setCompanyName(text)}
              placeholder="Company Name"
              errorMessage={errors.companyName}
            />
          </View>
          {/* <View style={[GlobalStyles.mb10]}>
          <Input
            value={industry}
            onChangeText={(text) => setIndustry(text)}
            placeholder="Industry"
            errorMessage={errors.industry}
          />
        </View> */}
          <View style={[GlobalStyles.mb30]}>
            <SelectList
              boxStyles={{
                borderWidth: 0,
              paddingVertical: 21,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 4,
              }}
              save="key"
              setSelected={(val: string) => setIndustry(val)}
              data={(settings.industries || []).map((item) => ({
                key: item.name,
                value: item.name,
              }))}
              placeholder="Industry"
              fontFamily="Inter-Regular"
              arrowicon={
                <AntDesign name="caretdown" size={20} color={colors.primary} />
              }
            />
          </View>
          <View style={[GlobalStyles.mb10]}>
            <Input
              value={responsibilities}
              onChangeText={(text) => setResponsibilities(text)}
              placeholder="Responsibilities"
              multiline
              errorMessage={errors.responsibilities}
              inputContainer={{ height: 100, paddingVertical: 8 }}
            />
          </View>
        </ScrollView>
        <View>
          <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
            <TextLink
              title="Skip For Now"
              onPress={handleOnSkip}
              color={colors.black}
            />
          </View>
          <Button title="Continue" onPress={handleOnNextPress} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
