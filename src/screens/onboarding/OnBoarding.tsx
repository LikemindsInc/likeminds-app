import { LinearGradient } from 'expo-linear-gradient';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import font from '../../theme/font';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../theme/colors';
import { StatusBar } from 'expo-status-bar';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { APP_SCREEN_LIST, INavigationProps } from '../../constants';
import useAppSelector from '../../hooks/useAppSelector';
import { ISettingState } from '../../reducers/settings';
import { useEffect, useMemo, useRef } from 'react';
import Util from '../../utils';

const { wp } = Util.responsiveWidthHeight();
const slides = [
  {
    key: 1,
    title: 'Welcome To',
    text: 'A platform for bringing talented and diverse communities together to support one another and grow.',
    image: require('../../../assets/group1.png'),
    logo: require('../../../assets/image1.png'),
    backgroundColor: '#59b2ab',
    footerText: 'Find and apply to jobs or internships',
  },
  {
    key: 2,
    title: 'Welcome To',
    text: 'A platform for bringing talented and diverse communities together to support one another and grow.',
    image: require('../../../assets/group2.png'),
    logo: require('../../../assets/image1.png'),
    backgroundColor: '#59b2ab',
    footerText: 'Meet and network with others just like YOU',
  },
  {
    key: 3,
    title: 'Welcome To',
    text: 'A platform for bringing talented and diverse communities together to support one another and grow.',
    image: require('../../../assets/group3.png'),
    logo: require('../../../assets/image1.png'),
    backgroundColor: '#59b2ab',
    footerText: 'Host and join spaces',
  },
  {
    key: 4,
    title: 'Welcome To',
    text: 'A platform for bringing talented and diverse communities together to support one another and grow.',
    image: require('../../../assets/group4.png'),
    logo: require('../../../assets/image1.png'),
    backgroundColor: '#59b2ab',
    footerText: 'Have open conversations',
  },
  {
    key: 5,
    title: 'Welcome To',
    text: 'A platform for bringing talented and diverse  communities together to support one another and grow.',
    image: require('../../../assets/group6.png'),
    logo: require('../../../assets/image1.png'),
    backgroundColor: '#59b2ab',
    footerText: 'Bond over shared challenges and experiences',
  },
];

const OnBoarding = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const bounceValue = useRef(new Animated.Value(0)).current;
  const setting = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;

  const startBounceAnimation = () => {
    // Configure the animation
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 5,
      tension: 45,
      useNativeDriver: false,
    }).start(); // Start the animation
  };

  // useEffect(() => {
  //   if (setting.userInfo)
  //     return navigation.navigate(APP_SCREEN_LIST.MAIN_SCREEN);
  // }, []);

  useEffect(() => {
    startBounceAnimation();
  }, []);

  const animatedStyle = useMemo(
    () => ({
      transform: [{ scale: bounceValue }],
    }),
    [bounceValue],
  );

  const _renderItem = ({ item }: any) => {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Animated.Image
            style={[styles.groupImage, animatedStyle]}
            source={item.image}
            resizeMethod="auto"
            resizeMode="contain"
          />
        </View>

        <View style={[GlobalStyles.mb40, GlobalStyles.mt40]}>
          <Text
            style={[
              GlobalStyles.textCenter,
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight400,
            ]}
          >
            {item.footerText}
          </Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    bounceValue.setValue(0);
    startBounceAnimation();
  };

  const DoneButton = () => (
    <TouchableOpacity onPress={handleOnDone} style={styles.nextButtonStyle}>
      <LinearGradient
        style={[GlobalStyles.buttonStyle, styles.getStartedButtonStyle]}
        colors={['#00CDFE', '#009AEE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={[
            GlobalStyles.textWhite,
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
          ]}
        >
          Get Started
        </Text>
        <View style={[GlobalStyles.pl4]}>
          <AntDesign name="arrowright" size={24} color={colors.white} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const handleOnDone = () => {
    try {
      navigation.dispatch(StackActions.push(APP_SCREEN_LIST.LOGIN_SCREEN));
    } catch (error) {
      console.log('navigation error> ', error);
    }
  };

  return (
    <View style={[GlobalStyles.container, { paddingHorizontal: 0 }]}>
      <View>
        <View style={styles.welcomeTextContainer}>
          <Text
            style={[
              GlobalStyles.textCenter,
              GlobalStyles.textGrey,
              GlobalStyles.subHeading,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontWeight400,
            ]}
          >
            Welcome To
          </Text>
        </View>
        <View style={[GlobalStyles.alignHorizontalCenter, GlobalStyles.mb40]}>
          <Image
            source={require('../../../assets/image1.png')}
            resizeMethod="auto"
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>
        <View
          style={{
            marginBottom: wp(22.68),
          }}
        >
          <Text
            style={[
              GlobalStyles.textCenter,
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontInterRegular,
              GlobalStyles.articleFont,
              GlobalStyles.fontWeight400,
            ]}
          >
            A platform for bringing talented and diverse communities together to
            support one another and grow.
          </Text>
        </View>
      </View>
      <AppIntroSlider
        activeDotStyle={{ backgroundColor: '#284453', width: 24 }}
        bottomButton
        data={slides}
        renderItem={_renderItem}
        renderNextButton={DoneButton}
        renderDoneButton={DoneButton}
        onDone={handleOnDone}
        scrollEnabled
        onSlideChange={(a) => handleNext()}
      />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  nextButtonStyle: {
    alignItems: 'center',
  },
  getStartedButtonStyle: {
    width: 200,
    paddingVertical: 21,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    marginBottom: 40,
  },
  logoImage: {
    width: '80%',
    maxWidth: 240,
    margin: 'auto',
    height: 60,
  },
  groupImage: {
    width: '95%',
    maxWidth: 320,
    height: 200,
  },
});

export default OnBoarding;
