import { IUserData } from "@app-model";
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
import { createEntityAdapter } from "@reduxjs/toolkit";
import { ISO_8601, RFC_2822 } from "moment";

interface IProps {
  item?: IUserData;
}

const PeopleList: FC<IProps> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state: any) => state.spaceReducer
  ) as ISpaceState;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const handleSpaceFollow = (id: string) => {
    setLoading(true);
    dispatch(clearFollowSpaceStatus());
    dispatch(followSpaceAction(id));
  };

  useEffect(() => {
    if (state.followSpaceStatus === "completed") {
      setLoading(false);
      toast.show({
        description: "Space followed successfully",
        variant: "contained",
      });
      dispatch(clearFollowSpaceStatus());
    } else if (state.followSpaceStatus === "failed") {
      setLoading(false);
      if (state.followSpaceError.trim() !== "") {
        toast.show({
          description: state.followSpaceError,
          variant: "contained",
        });
      }
    }
  }, [state.followSpaceStatus]);

  return (
    <View>
      <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <Text style={styles.label}> From School </Text>

          <ScrollView
            horizontal={true}
            style={{ marginTop: 8 }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[GlobalStyles.shadowBox, styles.container]}
              onPress={() =>
                navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN)
              }
            >
              <View style={{ marginTop: 18 }}>
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
                  ]}
                >
                  {item?.firstName !== "" && item?.lastName !== ""
                    ? item?.firstName + " " + item?.lastName
                    : "Abdul Ibrahim"}
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight100,
                    { alignSelf: "center", color: "#88969D" },
                  ]}
                >
                  {item?.bio !== "" ? item?.bio : "Data Science"}
                </Text>
                <View style={[GlobalStyles.mt10, { alignItems: "center" }]}>
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
                      margin: 8,
                      padding: 8,
                      alignSelf: "center",
                    }}
                    title="Connect"
                    onPress={() => {
                      handleSpaceFollow(item?.id as string);
                    }}
                    loading={isLoading}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <Text style={styles.label}> Base On Industry </Text>

          <ScrollView
            horizontal={true}
            style={{ marginTop: 8 }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[GlobalStyles.shadowBox, styles.container]}
              onPress={() =>
                navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN)
              }
            >
              <View style={{ marginTop: 18 }}>
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
                  ]}
                >
                  {item?.firstName !== "" && item?.lastName !== ""
                    ? item?.firstName + " " + item?.lastName
                    : "Abdul Ibrahim"}
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight100,
                    { alignSelf: "center", color: "#88969D" },
                  ]}
                >
                  {item?.bio !== "" ? item?.bio : "Data Science"}
                </Text>
                <View style={[GlobalStyles.mt10, { alignItems: "center" }]}>
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
                      margin: 8,
                      padding: 8,
                      alignSelf: "center",
                    }}
                    title="Connect"
                    onPress={() => {
                      handleSpaceFollow(item?.id as string);
                    }}
                    loading={isLoading}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <Text style={styles.label}> Suggestions </Text>

          <ScrollView
            style={{ marginTop: 8 }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                styles.container,
              ]}
              onPress={() =>
                navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN)
              }
            >
              <View style={{ flex: 1, alignItems: "flex-start" }}>
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
              <View style={{ flex: 2 }}>
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize15,
                    GlobalStyles.fontWeight400,
                  ]}
                >
                  {item?.firstName !== "" && item?.lastName !== ""
                    ? item?.firstName + " " + item?.lastName
                    : "Abdul Ibrahim"}
                </Text>

                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize10,
                    GlobalStyles.fontWeight100,
                    { color: "#88969D" },
                  ]}
                >
                  {item?.bio !== "" ? item?.bio : "Data Science"}
                </Text>
              </View>
              <View
                style={[GlobalStyles.mt10, { flex: 1, alignItems: "flex-end" }]}
              >
                <Button
                  buttonStyle={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  }}
                  style={{ width: "100%", height: 35, margin: 8, padding: 8 }}
                  title="Connect"
                  onPress={() => {
                    handleSpaceFollow(item?.id as string);
                  }}
                  loading={isLoading}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
