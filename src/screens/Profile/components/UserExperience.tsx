import colors from "../../../theme/colors";
import Timeline from "react-native-timeline-flatlist";
import { FC, useCallback, useEffect } from "react";
import { GlobalStyles } from "../../../theme/GlobalStyles";

interface IProps {
  data?: { title: any; description: any }[];
}

const UserExperience: FC<IProps> = ({ data = [] }) => {
  return (
    <Timeline
      data={data}
      isUsingFlatlist={true}
      lineColor={colors.navyBlue}
      circleColor={colors.navyBlue}
      descriptionStyle={[
        GlobalStyles.fontInterRegular,
        GlobalStyles.fontSize13,
        { color: colors.grey },
      ]}
      renderFullLine
      titleStyle={[
        GlobalStyles.fontInterBlack,
        GlobalStyles.fontSize15,
        GlobalStyles.textNavyBlue,
        { marginTop: -10 },
      ]}
      //   columnFormat="single-column-left"
      listViewContainerStyle={{ marginLeft: -44 }}
    />
  );
};

export default UserExperience;
