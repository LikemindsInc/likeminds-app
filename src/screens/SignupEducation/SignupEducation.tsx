import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import DateFormatter from "../../utils/date-formatter";
import useAppDispatch from "../../hooks/useAppDispatch";
import { updateEducation } from "../../reducers/session";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import moment from "moment";
import AutoCompleteInput from "../../components/AutoCompleteInput/AutoCompleteInput";
import { getAllSchoolAction } from "../../actions/auth";
import useAppSelector from "../../hooks/useAppSelector";
import { ISchool } from "@app-model";
import EducationForm from "../Profile/components/EducationForm";

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
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN);
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Education" />
      </View>
      <EducationForm />
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
