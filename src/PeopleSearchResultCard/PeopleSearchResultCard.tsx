import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import Button from "../components/Button/Button";
import { GlobalStyles } from "../theme/GlobalStyles";
import { FC } from "react";
import { IUserData } from "@app-model";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAppDispatch from "../hooks/useAppDispatch";
import { getProfile } from "../reducers/connection";
import { APP_SCREEN_LIST } from "../constants";

interface IProps {
  item: IUserData | null;
}

const PeopleSearchResultCard: FC<IProps> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const handleOnProfilePress = () => {
    dispatch(getProfile(item?.id as string));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };
  return (
    <TouchableOpacity
      onPress={handleOnProfilePress}
      style={{
        marginRight: 10,
        flex: 1,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <View style={styles.card}>
        <View style={{ marginTop: 18, alignItems: "center" }}>
          <Image
            source={
              item?.profilePicture && item?.profilePicture.trim() !== ""
                ? { uri: item?.profilePicture }
                : require("../../assets/image10.png")
            }
            resizeMethod="auto"
            resizeMode="cover"
            style={styles.profilePhoto}
          />
        </View>
        <View style={[styles.contentWrapper, GlobalStyles.flexOne]}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize13,
                GlobalStyles.fontWeight400,
                GlobalStyles.textCenter,
              ]}
            >
              {`${item?.firstName} ${item?.lastName}`.length > 14
                ? `${`${item?.firstName} ${item?.lastName}`.slice(0, 10)}...`
                : `${item?.firstName} ${item?.lastName}`}
            </Text>

            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize10,
                GlobalStyles.fontWeight400,
                { alignSelf: "center", color: colors.grey },
              ]}
            >
              {item?.bio?.slice(0, 20)}
            </Text>
          </View>
          <View style={[GlobalStyles.mt10, { justifyContent: "flex-end" }]}>
            <Button
              buttonStyle={{
                paddingVertical: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              title="View"
              onPress={handleOnProfilePress}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 8,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#88969D",
  },
  card: {
    shadowColor: "gray", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android elevation (simulates shadow)
    height: 200,
    width: 160,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default PeopleSearchResultCard;
