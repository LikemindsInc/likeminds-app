import { ISpaceList } from "@app-model";
import { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { GlobalStyles } from "../../../../theme/GlobalStyles";
import colors from "../../../../theme/colors";
import { Text, useToast } from "native-base";
import Button from "../../../../components/Button/Button";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import {
  ISpaceState,
  clearFollowSpaceStatus,
} from "../../../../reducers/space_reducer";
import { followSpaceAction } from "../../../../actions/space";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../../../constants";
import DropShadow from "react-native-drop-shadow";

const items = [
  {
    profilePicture:
      "https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true",
    title: "Abdul Ibrahim",
    description: "Data Science",
    id: "2",
  },
  {
    profilePicture:
      "https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true",
    title: "Abdul Ibrahim",
    description: "Data Science",
    id: "3",
  },
  {
    profilePicture:
      "https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true",
    title: "Abdul Ibrahim",
    description: "Data Science",
    id: "4",
  },
  {
    profilePicture:
      "https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true",
    title: "Abdul Ibrahim",
    description: "Data Science",
    id: "5",
  },
  {
    profilePicture:
      "https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true",
    title: "Abdul Ibrahim",
    description: "Data Science",
    id: "2",
  },
];

const PeopleList: FC<any> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state: any) => state.spaceReducer
  ) as ISpaceState;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const handleNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN);
  };

  return (
    <ScrollView
      style={{ marginTop: 8, flex: 1, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginTop: 8, marginBottom: 8, marginLeft: 10 }}>
        <Text style={styles.label}> From School </Text>

        <DropShadow
          style={{
            shadowColor: "#284453",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            backgroundColor: colors.white,
            width: 200,
            borderWidth: 1,
            borderColor: colors.white,

            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <View>
            <View style={{ marginTop: 18, alignItems: "center" }}>
              <Image
                source={
                  item?.profilePicture && item?.profilePicture.trim() !== ""
                    ? { uri: item?.profilePicture }
                    : require("../../../../../assets/image10.png")
                }
                resizeMethod="auto"
                resizeMode="cover"
                style={styles.profilePhoto}
              />
            </View>
            <View style={styles.contentWrapper}>
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize15,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textCenter,
                ]}
              >
                Abdul Ibrahim
              </Text>

              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize10,
                  GlobalStyles.fontWeight400,
                  { alignSelf: "center", color: colors.grey },
                ]}
              >
                {item?.bio || "Data Science"}
              </Text>
              <View style={[GlobalStyles.mt10]}>
                <Button
                  buttonStyle={{
                    paddingVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title="Connect"
                  loading={isLoading}
                  onPress={handleNavigation}
                />
              </View>
            </View>
          </View>
        </DropShadow>
      </View>

      <View style={{ marginTop: 8, marginBottom: 8, marginLeft: 10 }}>
        <Text style={styles.label}> Base On Industry </Text>

        <ScrollView
          horizontal={true}
          style={{ marginTop: 8 }}
          showsHorizontalScrollIndicator={false}
        >
          <DropShadow
            style={{
              shadowColor: "#284453",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              backgroundColor: colors.white,
              width: 200,
              borderWidth: 1,
              borderColor: colors.white,

              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <View style={{ marginTop: 18, alignItems: "center" }}>
                <Image
                  source={
                    item?.profilePicture && item?.profilePicture.trim() !== ""
                      ? { uri: item?.profilePicture }
                      : require("../../../../../assets/image10.png")
                  }
                  resizeMethod="auto"
                  resizeMode="cover"
                  style={styles.profilePhoto}
                />
              </View>
              <View style={styles.contentWrapper}>
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize15,
                    GlobalStyles.fontWeight400,
                    GlobalStyles.textCenter,
                  ]}
                >
                  Abdul Ibrahim
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight400,
                    { alignSelf: "center", color: colors.grey },
                  ]}
                >
                  {item?.bio || "Data Science"}
                </Text>
                <View style={[GlobalStyles.mt10]}>
                  <Button
                    buttonStyle={{
                      paddingVertical: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    title="Connect"
                    loading={isLoading}
                    onPress={handleNavigation}
                  />
                </View>
              </View>
            </View>
          </DropShadow>
        </ScrollView>
      </View>

      <View style={{ marginTop: 8, marginBottom: 8, marginLeft: 10 }}>
        <Text style={styles.label}> Suggestions </Text>

        <ScrollView
          style={{ marginTop: 8 }}
          showsVerticalScrollIndicator={false}
        >
          <DropShadow
            style={{
              shadowColor: "#284453",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              backgroundColor: colors.white,
              width: 200,
              borderWidth: 1,
              borderColor: colors.white,

              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <View style={{ marginTop: 18, alignItems: "center" }}>
                <Image
                  source={
                    item?.profilePicture && item?.profilePicture.trim() !== ""
                      ? { uri: item?.profilePicture }
                      : require("../../../../../assets/image10.png")
                  }
                  resizeMethod="auto"
                  resizeMode="cover"
                  style={styles.profilePhoto}
                />
              </View>
              <View style={styles.contentWrapper}>
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize15,
                    GlobalStyles.fontWeight400,
                    GlobalStyles.textCenter,
                  ]}
                >
                  Abdul Ibrahim
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight400,
                    { alignSelf: "center", color: colors.grey },
                  ]}
                >
                  {item?.bio || "Data Science"}
                </Text>
                <View style={[GlobalStyles.mt10]}>
                  <Button
                    buttonStyle={{
                      paddingVertical: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    title="Connect"
                    loading={isLoading}
                    onPress={handleNavigation}
                  />
                </View>
              </View>
            </View>
          </DropShadow>
        </ScrollView>
      </View>
    </ScrollView>
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
});

export default PeopleList;
