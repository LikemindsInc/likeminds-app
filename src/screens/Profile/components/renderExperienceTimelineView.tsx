import { View, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { FC } from "react";

interface IProps {
  showExperienceModal: () => void | null;
}

const renderExperienceTimelineView = ({
  showExperienceModal,
  title,
  actionTitle,
}: {
  showExperienceModal: React.Dispatch<React.SetStateAction<boolean>> | null;
  title?: string;
  actionTitle?: string;
}) => {
  const elems = [{}].map((item) => ({
    title: (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text
          style={[
            GlobalStyles.fontInterBlack,
            GlobalStyles.fontSize13,
            GlobalStyles.textNavyBlue,
          ]}
        >
          {title}
        </Text>
      </View>
    ),
    description: showExperienceModal && (
      <View style={[{ marginTop: 20, marginBottom: 10 }]}>
        <TouchableOpacity
          onPress={() => showExperienceModal(true)}
          style={{ flexDirection: "row", gap: 8 }}
        >
          <AntDesign name="plus" size={16} color={colors.primary} />
          <Text
            style={[
              GlobalStyles.fontSize13,
              GlobalStyles.fontInterRegular,
              GlobalStyles.textPrimary,
              GlobalStyles.fontWeight400,
            ]}
          >
            {actionTitle}
          </Text>
        </TouchableOpacity>
      </View>
    ),
  }));
  return elems;
};

export default renderExperienceTimelineView;
