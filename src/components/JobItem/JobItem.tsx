import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../Button/Button";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { IJobDTO } from "@app-model";
import { FC } from "react";
import moment from "moment";
import ReadMore from "react-native-read-more-text";
import Util from "../../utils";
import Converter from "../../utils/Converters";

interface IProps {
  item: IJobDTO;
}

const JobItem: FC<IProps> = ({ item }) => {
  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.fontWeight400,
          { color: colors.navyBlue, marginTop: 5 },
        ]}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text
        style={[
          GlobalStyles.fontInterRegular,
          GlobalStyles.fontSize10,
          GlobalStyles.fontWeight400,
          { color: colors.navyBlue, marginTop: 5 },
        ]}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };
  const handleOnApply = async (url: string) => {
    try {
      url = url.startsWith("https://") ? url : `https://${url}`;

      url = url.trim();

      if (!url) return;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log("Error opening Link", error);
    }
  };
  return (
    <View
      style={{
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 10,
        padding: 18,
        borderColor: "grey",
      }}
    >
      <View style={[GlobalStyles.flewRow, { marginBottom: 8 }]}>
        <View style={[GlobalStyles.flexOne]}>
          <Text
            style={[
              GlobalStyles.fontInterBlack,
              GlobalStyles.textNavyBlue,
              { fontWeight: "800" },
            ]}
          >
            {Util.capitalize(item.jobTitle, " ")}
          </Text>
          <Text
            style={[
              { fontSize: 12 },
              GlobalStyles.textGrey,
              GlobalStyles.fontInterRegular,
            ]}
          >
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
        <TouchableOpacity style={styles.search}>
          <AntDesign name="ellipsis1" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 8 }}>
        <ReadMore
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          numberOfLines={3}
        >
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            {item.jobDescription.trim()}
          </Text>
        </ReadMore>
      </View>

      <View style={[GlobalStyles.flewRow, { marginBottom: 8, width: "80%" }]}>
        <View style={{ flex: 1 }}>
          <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
            Industry
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterBlack,
              GlobalStyles.textNavyBlue,
              { fontWeight: "800" },
            ]}
          >
            {item.industry}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
            Location
          </Text>
          <Text
            style={[
              GlobalStyles.fontInterBlack,
              GlobalStyles.textNavyBlue,
              { fontWeight: "800" },
            ]}
          >
            {Util.capitalize(item.jobLocation, "")}
          </Text>
        </View>
      </View>

      <View style={[GlobalStyles.flewRow, { marginBottom: 8, width: "80%" }]}>
        <View style={{ flex: 1 }}>
          <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
            Type
          </Text>
          <Text
            style={[
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontInterBlack,
              { fontWeight: "800" },
            ]}
          >
            {Util.capitalize(item.jobType)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
            Company
          </Text>
          <Text
            style={[
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontInterBlack,
              { fontWeight: "800" },
            ]}
          >
            {Util.capitalize(item.companyName, "")}
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
          Experience Level
        </Text>
        <Text
          style={[
            GlobalStyles.fontInterBlack,
            GlobalStyles.textNavyBlue,
            { fontWeight: "800" },
          ]}
        >
          {Util.capitalize(item.experienceLevel)}
        </Text>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
          Tailor
        </Text>
        <Text
          style={[
            GlobalStyles.fontInterBlack,
            GlobalStyles.textNavyBlue,
            { fontWeight: "800" },
          ]}
        >
          {item?.tailor?.join(",")}
        </Text>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>
          Salary
        </Text>
        <Text
          style={[
            GlobalStyles.fontInterBlack,
            { fontWeight: "800", fontSize: 14, color: "#47D0FD" },
          ]}
        >
          NGN {Converter.formatNumber(item.salary)}/year
        </Text>
      </View>

      <View>
        <Text
          style={[
            { fontSize: 12, fontWeight: "800" },
            GlobalStyles.textNavyBlue,
            GlobalStyles.fontInterBlack,
            { fontWeight: "800" },
          ]}
        >
          About {item.companyName.trim()}
        </Text>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            { fontSize: 12, fontWeight: "300" },
          ]}
        >
          {item.companyDescription.trim()}
        </Text>
      </View>

      <View
        style={[
          GlobalStyles.flewRow,
          { justifyContent: "space-between", width: 160 },
        ]}
      >
        <Button
          buttonStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            width: "100%",
            height: 35,
            marginTop: 8,
            padding: 8,
            alignSelf: "flex-end",
          }}
          title="Apply"
          onPress={() => handleOnApply(item.applicationLink)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JobItem;
