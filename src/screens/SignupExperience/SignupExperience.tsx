import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Checkbox } from "native-base";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SignupExperience = () => {
  const navigation = useNavigation<any>();
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
          Experience
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
          Add a work experience, you may skip if you don’t have any
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble]}>
          <DatePicker placeholder="Start Date" style={styles.inputFlex} />
          <DatePicker placeholder="End Date" style={styles.inputFlex} />
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
          <Input placeholder="Job Title" />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input placeholder="Company Name" />
        </View>
        <View style={[GlobalStyles.mb10]}>
          <Input placeholder="Responsibilities" />
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink title="Skip For Now" color={colors.black} />
        </View>
        <Button
          title="Continue"
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN)
          }
        />
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
