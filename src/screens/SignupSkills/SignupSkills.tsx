import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SignupSkills = () => {
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
          Skills
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
          Add all the technicl skills and tools you are expert at
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[GlobalStyles.mb10]}>
          <Input placeholder="Skill1, Skill2" />
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink title="Skip For Now" color={colors.black} />
        </View>
        <Button
          title="Continue"
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN)
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

export default SignupSkills;
