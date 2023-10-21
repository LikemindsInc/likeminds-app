import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../../theme/colors';
import { TouchableOpacity } from 'react-native';
import { Image as NativeImage } from 'react-native';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { APP_SCREEN_LIST } from '../../../constants';
import useAppSelector from '../../../hooks/useAppSelector';
import { useUser } from '../../../hooks/userUser';
import Image from 'react-native-image-progress';

const HomeHeader = () => {
  const state = useAppSelector((state) => state.settingReducer);
  const [user] = useUser();
  const renderProfilePicture = () => {
    if (user && user.profilePicture && user.profilePicture.trim() !== '') {
      return { uri: user.profilePicture };
    }
    return require('../../../../assets/imageAvatar.jpeg');
  };
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <View style={[GlobalStyles.header]}>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="sort" size={24} color={colors.navyBlue} />
        </TouchableOpacity>
      </View>
      <View style={[GlobalStyles.pl4, { flex: 1 }]}>
        <NativeImage
          source={require('../../../../assets/image2.png')}
          style={{ width: 120, height: 20 }}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          height: 60,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.NOTIFICATION_SCREEN)
          }
          style={[]}
        >
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={24}
            color={colors.navyBlue}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN)
          }
          style={[{ paddingLeft: 30 }]}
        >
          <View style={{ paddingRight: 30, paddingBottom: 40 }}>
            {/* <Image
              source={renderProfilePicture()}
              indicator={require('../../../../assets/loader.gif')}
              resizeMethod="auto"
              resizeMode="cover"
              indicatorProps={{
                size: 40,
                borderWidth: 0,
              }}
              imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
            /> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  notificationIcon: {
    transform: [{ rotateZ: '0.785398rad' }],
  },
});

export default HomeHeader;
