import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import DropZone from "../../components/DropZone/DropZone";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SignupCertificate = () => {
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
          Certificate
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
          Add all your certificates, awards and volunteer work
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[GlobalStyles.mb10]}>
          <Input editable={false} placeholder="Certificate, Award, Volunteer" />
        </View>
        <View>
          <DropZone
            type="document"
            style={{ height: 60 }}
            emptyIcon={
              <Text
                style={[
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  GlobalStyles.fontWeight400,
                ]}
              >
                Upload a Document
              </Text>
            }
          />
        </View>
        <View>
          <Button type="outline-primary" title="Add Another" />
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink title="Skip For Now" color={colors.black} />
        </View>
        <Button
          title="Continue"
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN)
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

export default SignupCertificate;
