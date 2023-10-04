import { ScrollView, Text, View } from "react-native";
import { RadioButtonProps, RadioGroup } from "../RadioGroup";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Divider } from "native-base";
import colors from "../../theme/colors";
import useDimension from "../../hooks/useDimension";
import { useMemo } from "react";
import Button from "../Button/Button";
import { INDUSTRIES, SUGGESTIONS } from "../../constants";

const PeopleSearchForm = () => {
  const { width } = useDimension();
  const columnWidth = (width - 100) / 2;

  const radioButtons2: RadioButtonProps[] = useMemo(
    () =>
      INDUSTRIES.map((item, i) => ({
        id: item,
        label: item,
        value: item,
      })),
    []
  );

  const radioButtons3: RadioButtonProps[] = useMemo(
    () =>
      SUGGESTIONS.map((item, i) => ({
        id: item,
        label: item,
        value: item,
      })),
    []
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Profession
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <RadioGroup
              radioButtons={radioButtons2}
              descriptionStyle={{ width: 150 }}
              layout="row"
              color={colors.primary}
              containerStyle={{
                flexWrap: "wrap",
                width: "100%",
                gap: 20,
              }}
              onPress={(value: string) => {}}
              selectedId={""}
            />
          </View>
        </View>
        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Skillset
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <RadioGroup
              radioButtons={radioButtons3}
              descriptionStyle={{ width: columnWidth }}
              layout="row"
              color={colors.primary}
              containerStyle={{
                flexWrap: "wrap",
                gap: 20,
              }}
              onPress={(value: string) => {}}
              selectedId={""}
            />
          </View>
        </View>
        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <View style={{ justifyContent: "center", paddingHorizontal: 16 }}>
          <View>
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontWeight700,
                GlobalStyles.fontSize13,
              ]}
            >
              Company
            </Text>
          </View>
          <View style={[GlobalStyles.mt10]}>
            <RadioGroup
              radioButtons={radioButtons2}
              descriptionStyle={{ width: columnWidth }}
              layout="row"
              color={colors.primary}
              containerStyle={{
                flexWrap: "wrap",
                gap: 20,
              }}
              onPress={(value: string) => {}}
              selectedId={""}
            />
          </View>
        </View>
      </ScrollView>
      <Button title="Apply" />
    </View>
  );
};

export default PeopleSearchForm;
