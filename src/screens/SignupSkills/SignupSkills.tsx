import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import DatePicker from "../../components/DatePicker/DatePicker";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import useAppSelector from "../../hooks/useAppSelector";
import { useToast } from "react-native-toast-notifications";
import useAppDispatch from "../../hooks/useAppDispatch";
import { completeUserProfileAction } from "../../actions/auth";
import { updateSkills } from "../../reducers/session";

const SUGGESTIONS = [
  "App Design",
  "User Experience",
  "UX/UI",
  "Figma",
  "Adobe",
  "Sketch",
  "Wireframes",
];

const SignupSkills = () => {
  const navigation = useNavigation<any>();
  const session = useAppSelector((state: any) => state.sessionReducer);
  const [skills, setSkills] = useState("");
  const toast = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // useEffect(() => {
  //   if (session.completeProfileStatus === "completed") {
  //     navigation.navigate(APP_SCREEN_LIST.SIGNUP_COMPLETE_SCREEN);
  //   } else if (session.completeProfileStatus === "failed") {
  //     toast.show(
  //       session.completeProfileError?.trim() === ""
  //         ? "Unable to complete request. Please try again later"
  //         : session.completeProfileError,
  //       {
  //         type: "normal",
  //       }
  //     );
  //   }
  // }, [session.completeProfileStatus]);

  const dispatch = useAppDispatch();
  const handleOnNextPress = () => {
    if (skills.trim() === "")
      return toast.show("Please provide skills", { type: "normal" });

    navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN);
    dispatch(updateSkills(skills.split(",")));
    // dispatch(completeUserProfileAction(session.profileData));
  };

  const addSelectedSkill = (item: string) => {
    const state = [...selectedSkills];

    const index = state.findIndex((skill) => skill === item);

    if (index !== -1) {
      const addedSkills = skills
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== selectedSkills[index])
        .join(", ");

      state.splice(index, 1);

      setSkills(addedSkills);
    } else state.push(item);

    setSelectedSkills(state);
  };

  useEffect(() => {
    const allSkills = selectedSkills;

    const addedSkills = skills
      .split(",")
      .map((item) => item.trim())
      .filter((item) => !allSkills.includes(item));

    const filtered = [...addedSkills, ...allSkills]

      .map((item) => item.trim())
      .filter((item) => item !== "," && item.trim() !== "");

    const set = new Set(filtered);

    const newSkills = Array.from(set).join(", ");

    setSkills(newSkills);
  }, [selectedSkills]);
  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Skills" />
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
        <View style={[]}>
          <Input
            placeholder="Skill1, Skill2"
            value={skills}
            onChangeText={(value) => setSkills(value)}
            inputViewStyle={{ marginBottom: 5 }}
          />
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontSize10,
            ]}
          >
            Suggestion
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "flex-start",
            gap: 10,
            // marginBottom: 20,
          }}
        >
          {SUGGESTIONS.map((item, i) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 30,
                borderColor: selectedSkills.includes(item)
                  ? colors.primary
                  : "#88969D",
                borderWidth: 1,

                flexDirection: "row",
                flexWrap: "wrap",
                alignSelf: "flex-start",
              }}
              key={i}
              onPress={() => addSelectedSkill(item)}
            >
              <Text
                style={[
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.textGrey,
                  selectedSkills.includes(item)
                    ? { color: colors.primary }
                    : {},
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink
            onPress={() =>
              navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN)
            }
            title="Skip For Now"
            color={colors.black}
          />
        </View>
        <Button
          loading={session.completeProfileStatus === "loading"}
          title="Continue"
          onPress={handleOnNextPress}
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
