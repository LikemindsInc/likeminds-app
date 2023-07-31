import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { GlobalStyles } from "../../../theme/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { APP_SCREEN_LIST } from "../../../constants";
import useAppSelector from "../../../hooks/useAppSelector";

const HomeHeader = () => {
  const state = useAppSelector((state) => state.settingReducer);
  const renderProfilePicture = () => {
    if (state.userInfo?.profilePicture) {
      return { uri: state.userInfo.profilePicture };
    }
    return require("../../../../assets/image3.png");
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
        <Image
          source={require("../../../../assets/image2.png")}
          style={{ width: 120, height: 20 }}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(APP_SCREEN_LIST.NOTIFICATION_SCREEN)}
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
        onPress={() => navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN)}
        style={[{ paddingLeft: 30 }]}
      >
        <Image
          source={renderProfilePicture()}
          style={{ width: 30, height: 30, borderRadius: 15 }}
          resizeMethod="auto"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  notificationIcon: {
    transform: [{ rotateZ: "0.785398rad" }],
  },
});

export default HomeHeader;
