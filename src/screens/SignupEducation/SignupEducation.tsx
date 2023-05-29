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
import DateFormatter from "../../utils/date-formatter";
import useAppDispatch from "../../hooks/useAppDispatch";
import { updateEducation } from "../../reducers/session";

const SignupEducation = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [school, setSchool] = useState("");

  const [degree, setDegree] = useState("");

  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const handleOnNextPress = () => {
    dispatch(updateEducation({ school, startDate, endDate, degree }));
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN);
    //handleOnNextPress
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Education
        </Text>
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
          />
          <DatePicker
            value={endDate}
            onChangeText={(text) =>
              setEndDate(DateFormatter.format(text, "YYYY-MM-DD"))
            }
            placeholder="End Date"
            style={styles.inputFlex}
          />
        </View>

        <View style={[GlobalStyles.mb10]}>
          <Input
            onChangeText={(text) => setDegree(text)}
            value={degree}
            placeholder="Degree/Graduation Title"
          />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input
            onChangeText={(text) => setSchool(text)}
            value={school}
            placeholder="School"
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

export default SignupEducation;
