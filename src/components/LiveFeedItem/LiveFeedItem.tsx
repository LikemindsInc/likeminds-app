import { FC } from 'react';
import {
  ListRenderItem,
  StyleSheet,
  View,
  // Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import { Text } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import font from '../../theme/font';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import useAppSelector from '../../hooks/useAppSelector';
import { useUser } from '../../hooks/userUser';
import Image from 'react-native-image-progress';

interface IProps {
  item: {
    id: number;
    image: any;
    isLive: boolean;
    userName: string;
    isUserProfile?: boolean | undefined;
  };
}

const LiveFeedItem: FC<IProps> = ({ item }) => {
  const state = useAppSelector((state) => state.settingReducer);

  const [user] = useUser();
  const renderProfilePicture = () => {
    if (user && user.profilePicture && user.profilePicture.trim() !== '') {
      return { uri: user.profilePicture };
    }
    return require('../../../assets/imageAvatar.jpeg');
  };

  if (item.isUserProfile) {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            source={renderProfilePicture()}
            indicator={require('../../../assets/loader.gif')}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(150, 150, 150, 1)',
              unfilledColor: 'rgba(200, 200, 200, 0.2)',
            }}
            imageStyle={{ width: 58, height: 58, borderRadius: 29 }}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
          <LinearGradient
            style={[styles.plusIcon]}
            colors={['#00CDFE', '#009AEE']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <AntDesign name="plus" size={12} color={colors.white} />
          </LinearGradient>
        </View>
        <Text
          style={[
            GlobalStyles.fontInterRegular,

            GlobalStyles.textNavyBlue,
            GlobalStyles.fontWeight400,
            GlobalStyles.mt5,
            { fontSize: font.size.font8 },
          ]}
        >
          My Story
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.innerCircle]}>
        <Image
          source={item.image}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>
      <Text
        style={[
          GlobalStyles.fontInterRegular,

          GlobalStyles.textNavyBlue,
          GlobalStyles.fontWeight400,
          GlobalStyles.mt5,
          { fontSize: font.size.font8 },
        ]}
      >
        {item.userName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  container: {
    alignItems: 'center',
    marginRight: 6,
  },
  innerCircle: {
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default LiveFeedItem;
