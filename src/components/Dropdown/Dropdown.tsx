import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import useAppSelector from "../../hooks/useAppSelector";

interface IProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

export const Tailor: FC<IProps> = ({ bottomSheetRef }) => {
  const handleOpenIndustrySelectPicker = () => {
    if (!bottomSheetRef) return;

    bottomSheetRef.current?.expand();
  };

  const state = useAppSelector((state) => state.postReducer);

  // variables

  return (
    <View>
      <TouchableOpacity
        onPress={handleOpenIndustrySelectPicker}
        style={[GlobalStyles.flewRow, styles.container]}
      >
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize10,
            GlobalStyles.textGrey,
          ]}
        >
          {state.jobFilterTailorValue && state.jobFilterTailorValue !== "All"
            ? state.jobFilterTailorValue
            : "Tailor"}
        </Text>
        <AntDesign name="caretdown" size={12} color={colors.grey} />
      </TouchableOpacity>
    </View>
  );
};

export const PostDate = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "3h ago" }];

  return (
    <TouchableOpacity style={[GlobalStyles.flewRow, styles.container]}>
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Date Posted
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
  );
};

export const Location = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Remote" }];

  return (
    <TouchableOpacity style={[GlobalStyles.flewRow, styles.container]}>
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Location
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
    // <SelectList
    //   setSelected={(val: string) => setSelected(val)}
    //   data={data}
    //   save="value"
    //   defaultOption={{ key: "0", value: "Location" }}
    //   inputStyles={{
    //     color: "#88969D",
    //   }}
    //   boxStyles={{
    //     backgroundColor: "#F3F5F7",
    //     borderColor: "#F3F5F7",
    //     borderRadius: 40,
    //   }}
    // />
  );
};

export const ExperienceLevel: FC<IProps> = ({ bottomSheetRef }) => {
  const [selected, setSelected] = React.useState("");

  const handleOpenIndustrySelectPicker = () => {
    if (!bottomSheetRef) return;

    bottomSheetRef.current?.expand();
  };

  return (
    <TouchableOpacity
      onPress={handleOpenIndustrySelectPicker}
      style={[GlobalStyles.flewRow, styles.container]}
    >
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Experience Level
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
  );
};

export const Industry = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Internet Technology" }];

  return (
    <TouchableOpacity style={[GlobalStyles.flewRow, styles.container]}>
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Company
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
  );
};

export const Type: FC<IProps> = ({ bottomSheetRef }) => {
  const handleOpenIndustrySelectPicker = () => {
    if (!bottomSheetRef) return;

    bottomSheetRef.current?.expand();
  };

  return (
    <TouchableOpacity
      onPress={handleOpenIndustrySelectPicker}
      style={[GlobalStyles.flewRow, styles.container]}
    >
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Type
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
  );
};

export const Company = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "LikeMinds" }];

  return (
    <TouchableOpacity style={[GlobalStyles.flewRow, styles.container]}>
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Company
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
    // <SelectList
    //   setSelected={(val: string) => setSelected(val)}
    //   data={data}
    //   save="value"
    //   defaultOption={{ key: "0", value: "Company" }}
    //   inputStyles={{
    //     color: "#88969D",
    //   }}
    //   boxStyles={{
    //     backgroundColor: "#F3F5F7",
    //     borderColor: "#F3F5F7",
    //     borderRadius: 40,
    //   }}
    // />
  );
};

export const Salary = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "$100k - $150k" }];

  return (
    <TouchableOpacity style={[GlobalStyles.flewRow, styles.container]}>
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.textGrey,
        ]}
      >
        Salary
      </Text>
      <AntDesign name="caretdown" size={12} color={colors.grey} />
    </TouchableOpacity>
    // <SelectList
    //   setSelected={(val: string) => setSelected(val)}
    //   data={data}
    //   save="value"
    //   defaultOption={{ key: "0", value: "Salary" }}
    //   inputStyles={{
    //     color: "#88969D",
    //   }}
    //   boxStyles={{
    //     backgroundColor: "#F3F5F7",
    //     borderColor: "#F3F5F7",
    //     borderRadius: 40,
    //   }}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F5F7",
    height: 35,
    borderRadius: 30,
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
});
