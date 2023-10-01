import colors from "../../../theme/colors";
import Timeline from "react-native-timeline-flatlist";
import { FC, useCallback, useEffect } from "react";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { View } from "react-native";

interface IProps {
  data?: { title: any; description: any }[];
}

const UserExperience: FC<IProps> = ({ data = [] }) => {
  return (
    <View style={{ flex: 1 }}>
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
        listViewContainerStyle={{
          marginLeft: -44,
          paddingBottom: 0,
        }}
        style={{ paddingBottom: 0 }}
        options={{
          horizontal: false,
          showsHorizontalScrollIndicator: false,
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
          bounces: false,
          bouncesZoom: false,
          style: {},
        }}
      />
    </View>
  );
};

export default UserExperience;
