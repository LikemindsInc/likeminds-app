import { ScrollView, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Text } from "react-native";
import TextLink from "../../components/TextLink/TextLink";
import colors from "../../theme/colors";
import Button from "../../components/Button/Button";

const SignupComplete = () => {
  return (
    <View style={[GlobalStyles.container]}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
          <Text
            style={[
              GlobalStyles.fontInterBlack,
              GlobalStyles.fontSize20,
              GlobalStyles.fontWeight700,
              GlobalStyles.textCenter,
              GlobalStyles.textPrimary,
            ]}
          >
            Thank You
          </Text>
        </View>
        <View style={[GlobalStyles.mb40]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textBlack,
              GlobalStyles.textCenter,
            ]}
          >
            You have completed the onboarding process. You are now ready to step
            into LikeMinds!
          </Text>
        </View>
        <View style={[GlobalStyles.mb40, GlobalStyles.mt40]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textGrey,
              GlobalStyles.textCenter,
            ]}
          >
            We encourage you to report any bad behavior, misconduct or
            inappropriate content.
          </Text>
        </View>
        <View
          style={[
            GlobalStyles.mt40,
            GlobalStyles.mb40,
            GlobalStyles.displayRowCenter,
          ]}
        >
          <TextLink title="Terms Of Use" color={colors.black} />
        </View>
        <View
          style={[
            GlobalStyles.mt40,
            GlobalStyles.mb40,
            GlobalStyles.displayRowCenter,
          ]}
        >
          <TextLink title="Privacy Policy" color={colors.black} />
        </View>
      </ScrollView>
      <View style={[GlobalStyles.mt30, GlobalStyles.mb40]}>
        <Button title="Become A Space" type="outline-primary" />
      </View>
      <View style={[]}>
        <Button title="Let’s Go!" />
      </View>
    </View>
  );
};

export default SignupComplete;
