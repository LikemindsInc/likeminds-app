import {
  Animated,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import useDimension from '../../hooks/useDimension';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Box, Pressable, useColorModeValue } from 'native-base';
import useAppSelector from '../../hooks/useAppSelector';
import { ISettingState } from '../../reducers/settings';
import UserPostFeed from './components/UserPostFeed';
import UserExperience from './components/UserExperience';
import { useUser } from '../../hooks/userUser';
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';
import AppModal from '../../components/Modal/AppModal';
import EducationForm from './components/EducationForm';
import ExperienceForm from './components/ExperienceForm';
import SkillsForm from './components/SkillsForm';
import CertificateForm from './components/CertificateForm';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getCurrentUserAction } from '../../actions/auth';

// Get the height of the status bar
const statusBarHeight = StatusBar.currentHeight;

const UserProfile = () => {
  const height = useDimension().height;
  const navigation = useNavigation<NavigationProp<any>>();

  const state = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;

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

  const initials = state?.userInfo?.email
    ? `${state?.userInfo?.email[0]}${state?.userInfo?.email[1]}`.toLocaleUpperCase()
    : 'IN';

  return (
    <View
      style={[
        GlobalStyles.container,
        { paddingHorizontal: 0, paddingVertical: 0 },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={styles.contentWrapper}
      >
        <View>
          {state.userInfo?.profilePicture ? (
            <ImageBackground
              resizeMode="cover"
              source={
                state.userInfo?.profilePicture &&
                state.userInfo.profilePicture.trim() !== ''
                  ? { uri: state.userInfo.profilePicture }
                  : require('../../../assets/image9.png')
              }
              style={[
                styles.imageBg,
                height * 0.4 > 240
                  ? { height: 240 }
                  : { height: height * 0.4, position: 'relative' },
              ]}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              ></View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.imageHeaderWrapper]}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      textShadowRadius: 10,
                      textShadowOffset: { width: 2, height: 2 },
                      color: colors.white,
                    }}
                    // color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          ) : initials ? (
            <View
              style={[
                styles.imageBg,
                height * 0.4 > 240
                  ? { height: 240 }
                  : { height: height * 0.4, position: 'relative' },
                {
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  backgroundColor: '#daf3ff',
                  top: -50,
                },
              ]}
            >
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-start',
                  top: 50,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.imageHeaderWrapper]}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    style={{
                      textShadowColor: '#fff',
                      textShadowRadius: 10,
                      textShadowOffset: { width: 2, height: 2 },
                      color: '#000',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  {
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 500,
                    backgroundColor: '#f1f3f9',
                  },
                ]}
              >
                <Text
                  style={[
                    GlobalStyles.fontWeight600,
                    GlobalStyles.textNavyBlue,
                    {
                      fontSize: 40,
                    },
                  ]}
                >
                  {initials}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.contentWrapper}>
          <View
            style={[
              GlobalStyles.flewRow,
              GlobalStyles.mb10,
              { justifyContent: 'space-between' },
            ]}
          >
            <View>
              <Text
                style={[
                  GlobalStyles.fontWeight700,
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize15,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                {state.userInfo?.firstName} {state.userInfo?.lastName}
              </Text>
            </View>
            <TouchableOpacity>
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[GlobalStyles.mb20]}>
            {state.userInfo?.experience[0]?.jobTitle && (
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize15,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.mb10,
                ]}
              >
                {state.userInfo?.experience[0]?.jobTitle}
              </Text>
            )}

            <Text
              style={[
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
                GlobalStyles.textPrimary,
                GlobalStyles.fontWeight400,
                GlobalStyles.mb10,
              ]}
            >
              From {state.userInfo?.city}, {state.userInfo?.country}. Lives in{' '}
              {state.userInfo?.countryOfOrigin}
            </Text>
            <ReadMore
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
              numberOfLines={3}
            >
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textGrey,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.mb10,
                ]}
              >
                {state.userInfo?.bio}
              </Text>
            </ReadMore>
          </View>
          <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
            <View style={styles.boxSummary}>
              <Text
                style={[
                  GlobalStyles.fontInterBlack,
                  GlobalStyles.fontSize15,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                0
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize10,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textGrey,
                ]}
              >
                Network
              </Text>
            </View>
            <View style={styles.boxSummary}>
              <Text
                style={[
                  GlobalStyles.fontInterBlack,
                  GlobalStyles.fontSize15,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                {state.userInfo?.followingCount || 0}
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize10,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textGrey,
                ]}
              >
                Following
              </Text>
            </View>
            <View style={styles.boxSummary}>
              <Text
                style={[
                  GlobalStyles.fontInterBlack,
                  GlobalStyles.fontSize15,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight700,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                {state.userInfo?.postCount}
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize10,
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textGrey,
                ]}
              >
                Post
              </Text>
            </View>
          </View>
          {/* <View style={[GlobalStyles.flewRow, GlobalStyles.mb30, { gap: 20 }]}>
          <Button containerStyle={{ flex: 1 }} title="Connect" />
          <Button type="cancel" containerStyle={{ flex: 1 }} title="Chat" />
        </View> */}
          <View style={{ height: 600 }}>
            <TabViewExample />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const FirstRoute = () => {
  const [user] = useUser();
  const [showExperienceModal, setShowExprienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showCerticatesModal, setshowCerticatesModal] = useState(false);
  const width = useDimension().width;
  const getExperienceTimeLine = () => {
    const filtered = (user?.experience || []).filter(
      (item) => item.companyName && item.companyName.trim() !== '',
    );
    const timeline =
      filtered.length > 0
        ? filtered.map((item) => ({
            title: (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <Text
                  style={[
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textPurple,
                    GlobalStyles.mb10,
                    GlobalStyles.fontWeight700,
                    {
                      maxWidth: 0.4 * width,
                    },
                  ]}
                >
                  {item.jobTitle}
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textGrey,
                    GlobalStyles.fontWeight700,
                  ]}
                >
                  {item.stillWorkHere ? (
                    `${moment(item.startDate).format('MMM YYYY')} - PRESENT`
                  ) : (
                    <Text>
                      {moment(item.startDate).format('MMM YYYY')} -{' '}
                      {moment(item.endDate).format('MMM YYYY')}
                    </Text>
                  )}
                </Text>
              </View>
            ),
            description: (
              <View style={[{ marginTop: -5 }]}>
                <Text
                  style={[
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textNavyBlue,
                    GlobalStyles.mb10,
                  ]}
                >
                  {item.companyName}
                </Text>
                <Text
                  style={[
                    GlobalStyles.fontInterRegular,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textGrey,
                    GlobalStyles.mb10,
                  ]}
                >
                  {item.responsibilities}
                </Text>
              </View>
            ),
          }))
        : [];

    return [
      {
        title: (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize13,
                GlobalStyles.textNavyBlue,
                GlobalStyles.mb10,
                GlobalStyles.fontWeight400,
              ]}
            >
              Experience
            </Text>
          </View>
        ),

        description: [
          ...timeline.map((item) => (
            <View style={{ marginBottom: 10 }}>
              {item.title}
              {item.description}
            </View>
          )),
          <TouchableOpacity
            onPress={() => setShowExprienceModal(true)}
            style={{ flexDirection: 'row', gap: 8 }}
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
              Add Experience
            </Text>
          </TouchableOpacity>,
        ],
      },
    ];
  };

  const session = useAppSelector((state) => state.sessionReducer);

  useEffect(() => {
    if (
      session.completeProfileStatus === 'completed' ||
      session.completeProfileStatus === 'failed'
    ) {
      setShowEducationModal(false);
      setShowExprienceModal(false);
      setshowCerticatesModal(false);
      setShowSkillsModal(false);
    }
  }, [session.completeProfileStatus]);
  const getEducationTimeLine = () => {
    const timeline =
      user?.education && user.education.length > 0
        ? user?.education.map((item) => ({
            title: (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <Text
                  style={[
                    GlobalStyles.fontInterBlack,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textNavyBlue,
                    GlobalStyles.mb10,
                  ]}
                >
                  Education
                </Text>
              </View>
            ),
            description: (
              <View style={[{ marginTop: -5 }]}>
                <View style={{ marginBottom: 10 }}>
                  {item.degree.trim() !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={[
                          GlobalStyles.fontInterRegular,
                          GlobalStyles.fontSize13,
                          GlobalStyles.textPurple,
                          GlobalStyles.mb10,
                          GlobalStyles.fontWeight700,
                          {
                            maxWidth: 0.4 * width,
                          },
                        ]}
                      >
                        {item.degree}
                      </Text>
                      <Text
                        style={[
                          GlobalStyles.fontInterRegular,
                          GlobalStyles.fontSize13,
                          GlobalStyles.textGrey,
                          GlobalStyles.fontWeight700,
                        ]}
                      >
                        <Text>
                          {moment(item.startDate).format('MMM YYYY')} -{' '}
                          {moment(item.endDate).format('MMM YYYY')}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {item.school.trim() !== '' && (
                    <Text
                      style={[
                        GlobalStyles.fontInterRegular,
                        GlobalStyles.fontSize13,
                        GlobalStyles.textNavyBlue,
                        GlobalStyles.mb10,
                      ]}
                    >
                      {item.school}
                    </Text>
                  )}
                </View>
              </View>
            ),
          }))
        : [];

    return [
      {
        title: (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize13,
                GlobalStyles.textNavyBlue,
                GlobalStyles.mb10,
              ]}
            >
              Education
            </Text>
          </View>
        ),

        description: [
          ...timeline.map((item) => (
            <View style={{ marginBottom: 10 }}>{item.description}</View>
          )),
          <TouchableOpacity
            onPress={() => setShowEducationModal(true)}
            style={{ flexDirection: 'row', gap: 8 }}
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
              Add Education
            </Text>
          </TouchableOpacity>,
        ],
      },
    ];
  };

  const handleFileDownload = async (url: string) => {
    try {
      if (!(url.startsWith('https') || url.startsWith('http'))) return;

      url = url.startsWith('https://') ? url : `https://${url}`;

      url = url.trim();

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log('Error opening Link', error);
    }
  };

  const getCertifcateTimeLine = () => {
    const timeline =
      user?.certificates.map((item) => ({
        title: (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              marginBottom: 10,
            }}
          ></View>
        ),
        description: (
          <View style={[{ marginBottom: 25 }]}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', gap: 12 }}
              onPress={() => handleFileDownload(item.url)}
            >
              <View
                style={{
                  backgroundColor: colors.navyBlue,
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  paddingHorizontal: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    GlobalStyles.fontInterBlack,
                    GlobalStyles.fontSize10,
                    { color: colors.white },
                  ]}
                >
                  PDF
                </Text>
              </View>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textGrey,
                  GlobalStyles.mb10,
                  GlobalStyles.mt10,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        ),
      })) || [];

    return [
      {
        title: (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Text
              style={[
                GlobalStyles.fontInterBlack,
                GlobalStyles.fontSize13,
                GlobalStyles.textNavyBlue,
                GlobalStyles.mb10,
              ]}
            >
              Certificate
            </Text>
          </View>
        ),

        description: [
          ...timeline.map((item) => (
            <View style={{ marginBottom: 10 }}>{item.description}</View>
          )),
          <TouchableOpacity
            onPress={() => setshowCerticatesModal(true)}
            style={{ flexDirection: 'row', gap: 8 }}
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
              Add Ceritificate
            </Text>
          </TouchableOpacity>,
        ],
      },
    ];
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [
    showCerticatesModal,
    showExperienceModal,
    showEducationModal,
    showSkillsModal,
  ]);

  return (
    <View
      style={[GlobalStyles.mt20, { flex: 1, marginBottom: 0, flexGrow: 1 }]}
    >
      <UserExperience
        data={[
          ...getExperienceTimeLine(),
          ...getEducationTimeLine(),
          {
            title: (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <Text
                  style={[
                    GlobalStyles.fontInterBlack,
                    GlobalStyles.fontSize13,
                    GlobalStyles.textNavyBlue,
                    GlobalStyles.mb10,
                  ]}
                >
                  Skills
                </Text>
              </View>
            ),
            description: (
              <View>
                {user?.skills.length > 0 ? (
                  <Text
                    style={[
                      GlobalStyles.fontInterRegular,
                      GlobalStyles.fontSize13,
                      GlobalStyles.textGrey,
                      GlobalStyles.mb20,
                    ]}
                  >
                    {user?.skills.join(',')}
                  </Text>
                ) : null}
                <TouchableOpacity
                  onPress={() => setShowSkillsModal(true)}
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    marginBottom: 5,
                  }}
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
                    Add Skill
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          },

          ...getCertifcateTimeLine(),
        ]}
      />
      <AppModal
        onBackDropPress={() => setShowExprienceModal(!showExperienceModal)}
        visible={showExperienceModal}
        title="Add Experience"
      >
        <ExperienceForm />
      </AppModal>
      <AppModal
        onBackDropPress={() => setShowEducationModal(!showEducationModal)}
        visible={showEducationModal}
        title="Add Education"
      >
        <EducationForm />
      </AppModal>
      <AppModal
        onBackDropPress={() => setShowSkillsModal(!showSkillsModal)}
        visible={showSkillsModal}
        title="Add Skills"
      >
        <SkillsForm />
      </AppModal>
      <AppModal
        onBackDropPress={() => setshowCerticatesModal(!showCerticatesModal)}
        visible={showCerticatesModal}
        title="Add Certificate"
      >
        <CertificateForm />
      </AppModal>
    </View>
  );
};

const SecondRoute = () => {
  return (
    <View style={[GlobalStyles.mt20, GlobalStyles.mb20, { flex: 1 }]}>
      <UserPostFeed />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Bio' },
    { key: 'second', title: 'Feed' },
  ]);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            index === i
              ? useColorModeValue(colors.navyBlue, '#000')
              : useColorModeValue(colors.grey, '#000');

          const borderColor =
            index === i
              ? '#284453'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable onPress={() => setIndex(i)}>
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: 240,
    minHeight: 300,
  },
  imageHeaderWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  contentWrapper: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 25,
    flexGrow: 1,
  },
  boxSummary: {
    flex: 1,
    backgroundColor: '#F3F5F7',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

export default UserProfile;
