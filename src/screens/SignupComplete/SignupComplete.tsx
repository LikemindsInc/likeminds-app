import { ScrollView, View } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { Text } from 'react-native';
import TextLink from '../../components/TextLink/TextLink';
import colors from '../../theme/colors';
import Button from '../../components/Button/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { APP_SCREEN_LIST } from '../../constants';

const SignupComplete = () => {
  const navigation = useNavigation<NavigationProp<any>>();
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
        <View style={[GlobalStyles.mb40, GlobalStyles.displayRowCenter]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontWeight400,
              GlobalStyles.textNavyBlue,
              { textAlign: 'center' },
            ]}
          >
            By selecting ‘Lets Go!’ you agree to the
            <Text
              style={[
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontWeight700,
              ]}
            >
              Terms Of Use{' '}
            </Text>
            and{' '}
            <Text
              style={[
                GlobalStyles.textNavyBlue,
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontWeight700,
              ]}
            >
              Privacy Policy
            </Text>{' '}
            of Like Minds
          </Text>
        </View>
        {/* <Button
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.CREATE_SPACE_SCREEN)
          }
          title="Become A Space"
          type="outline-primary"
        /> */}
      </View>
      <View style={[]}>
        <Button
          onPress={() => navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN)}
          title="Let’s Go!"
        />
      </View>
    </View>
  );
};

export default SignupComplete;
