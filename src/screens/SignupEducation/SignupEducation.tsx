import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Checkbox } from "native-base";
import { APP_SCREEN_LIST, SCHOOL_DEGREES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import DateFormatter from "../../utils/date-formatter";
import useAppDispatch from "../../hooks/useAppDispatch";
import { updateEducation } from "../../reducers/session";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import moment from "moment";
import AutoCompleteInput from "../../components/AutoCompleteInput/AutoCompleteInput";
import { getAllSchoolAction } from "../../actions/auth";
import useAppSelector from "../../hooks/useAppSelector";
import { ISchool } from "@app-model";
import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign } from "@expo/vector-icons";

const SignupEducation = () => {
  const [startDate, setStartDate] = useState(
    moment().subtract("7", "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [school, setSchool] = useState("");

  const [degree, setDegree] = useState("");

  const navigation = useNavigation<any>();

  const [schools, setSchools] = useState<ISchool[]>([]);

  const setting = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    dispatch(getAllSchoolAction());
  }, []);

  useEffect(() => {
    setSchools(setting.schools);
  }, [setting.schools]);

  const [errors, setErrors] = useState<{
    startDate: null | string;
    endDate: null | string;
    degree: string | null;
    school: string | null;
  }>({
    startDate: null,
    endDate: null,
    degree: null,
    school: null,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setErrors({
      startDate: null,
      endDate: null,
      degree: null,
      school: null,
    });
  }, []);

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
    if (endDate.trim() !== "") {
      if (
        startDate.trim() !== "" &&
        moment(startDate).diff(endDate, "days") > 0
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
  }, [endDate, startDate]);

  const handleOnNextPress = () => {
    if (school.trim() === "")
      return setErrors((state) => ({
        ...state,
        school: "School is required",
      }));

    if (degree.trim() === "")
      return setErrors((state) => ({
        ...state,
        degree: "Degree is required",
      }));
    if (startDate.trim() === "")
      return setErrors((state) => ({
        ...state,
        startDate: "start date is required",
      }));
    dispatch(updateEducation({ school, startDate, endDate, degree }));
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_SKILLS_SCREEN);
    //handleOnNextPress
  };

  useEffect(() => {
    if (degree.trim() !== "")
      setErrors((state) => ({ ...state, degree: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     degree: "Degree is required",
    //   }));
  }, [degree]);

  useEffect(() => {
    if (degree.trim() !== "")
      setErrors((state) => ({ ...state, school: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     school: "School is required",
    //   }));
  }, [school]);

  const handleOnSchoolFilter = (query: string) => {
    if (query.trim() === "") setSchools(setting.schools);
    else {
      const data = setting.schools.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase().trim())
      );

      setSchools(data);
    }

    setSchool(query);
  };

  const handleOnSkip = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_SKILLS_SCREEN);
    dispatch(updateEducation({ school, startDate, endDate, degree }));
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Education" />
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
          Tell us about your most recent educational achievement
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble]}>
          <DatePicker
            value={startDate}
            onDateChange={(text) =>
              setStartDate(DateFormatter.format(text, "YYYY-MM-DD"))
            }
            placeholder="Start Date"
            style={styles.inputFlex}
            errorMessage={errors.startDate}
          />
          <DatePicker
            value={endDate}
            onChangeText={(text) =>
              setEndDate(DateFormatter.format(text, "YYYY-MM-DD"))
            }
            placeholder="End Date"
            style={styles.inputFlex}
            errorMessage={errors.endDate}
          />
        </View>

        <View style={[GlobalStyles.mb30]}>
          <SelectList
            boxStyles={{
              borderWidth: 0,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 20,
            }}
            save="key"
            setSelected={(val: string) => setDegree(val)}
            data={SCHOOL_DEGREES.map((item) => ({
              key: item,
              value: item,
            }))}
            placeholder="Choose Degree"
            fontFamily="Inter-Regular"
            arrowicon={
              <AntDesign name="caretdown" size={20} color={colors.primary} />
            }
          />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <AutoCompleteInput
            data={(schools || []).map((item) => item.name)}
            onChangeText={handleOnSchoolFilter}
            value={school}
          />
          {/* <Input
            onChangeText={(text) => setSchool(text)}
            value={school}
            placeholder="School"
            errorMessage={errors.school}
          /> */}
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

export default SignupEducation;
