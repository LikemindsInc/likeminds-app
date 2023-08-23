import { FC, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useToast } from "native-base";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import { ISpaceState } from "../../../../reducers/space_reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../../../constants";
import PeopleSearchResultCard from "../../../../PeopleSearchResultCard/PeopleSearchResultCard";
import { FlatList } from "react-native";
import { GlobalStyles } from "../../../../theme/GlobalStyles";
import { IUserData } from "@app-model";
import Button from "../../../../components/Button/Button";
import { getProfile } from "../../../../reducers/connection";
import {
  getUserRecommendationByIndustry,
  getUserRecommendationBySchool,
} from "../../../../actions/connection";

const PeopleList: FC<any> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const state = useAppSelector((state) => state.connectionReducer);

  const handleNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN);
  };

  useEffect(() => {
    dispatch(getUserRecommendationByIndustry({ search: "" }));
    dispatch(getUserRecommendationBySchool({ search: "" }));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 8, marginLeft: 10 }}
    >
      <View style={[GlobalStyles.mb10]}>
        <View style={[GlobalStyles.mt10]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            From School
          </Text>
        </View>
        <View style={{ marginLeft: 5 }}>
          {state.usersByIndustry.length > 0 ? (
            <FlatList
              data={state.usersBySchool}
              keyExtractor={(item) => item.id}
              numColumns={1}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <PeopleSearchResultCard item={item} />}
            />
          ) : (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              {/* <Image
                source={require("../../../../../assets/folder.png")}
                style={{ width: 100, height: 100 }}
                resizeMethod="resize"
                resizeMode="contain"
              /> */}
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                No record(s) found
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={[GlobalStyles.mb20]}>
        <View style={[GlobalStyles.mt10]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            From Industries
          </Text>
        </View>
        <View style={{ marginLeft: 5 }}>
          {state.usersByIndustry.length > 0 ? (
            <FlatList
              data={state.usersByIndustry}
              keyExtractor={(item) => item.id}
              numColumns={1}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <PeopleSearchResultCard item={item} />}
            />
          ) : (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              {/* <Image
                source={require("../../../../../assets/folder.png")}
                style={{ width: 100, height: 100 }}
                resizeMethod="resize"
                resizeMode="contain"
              /> */}
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                  GlobalStyles.textNavyBlue,
                ]}
              >
                No record(s) found
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={[GlobalStyles.mb20]}>
        <View style={[GlobalStyles.mt10]}>
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            Suggestions
          </Text>
        </View>
        <View style={[GlobalStyles.mt20]}>
          {state.users.length === 0 ? (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../../assets/folder.png")}
                style={{ width: 100, height: 100 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          ) : (
            <View>
              {state.users.map((item) => (
                <Suggestion data={item} key={item.id} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

interface IProps {
  data: IUserData;
}

const Suggestion: FC<IProps> = (props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const handleOnProfilePress = () => {
    dispatch(getProfile(props.data?.id as string));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };
  return (
    <View style={[styles.container]}>
      <View>
        {props.data.profilePicture &&
          props.data.profilePicture.trim() !== "" && (
            <Image
              source={{ uri: props.data.profilePicture as string }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
              resizeMethod="resize"
              resizeMode="contain"
            />
          )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={[
              GlobalStyles.fontSize13,
              GlobalStyles.fontInterMedium,
              GlobalStyles.textNavyBlue,
            ]}
          >
            {props.data.firstName} {props.data.lastName}
          </Text>
          <View style={{ marginTop: 5 }}>
            <Text
              style={[
                GlobalStyles.fontSize13,
                GlobalStyles.fontInterRegular,
                GlobalStyles.textGrey,
              ]}
            >
              {props.data.experience[0].jobTitle || props.data.skills[0]}
            </Text>
          </View>
        </View>
        <Button
          style={{ paddingVertical: 8, paddingHorizontal: 8 }}
          title="Connect"
          onPress={handleOnProfilePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12,
  },
});

export default PeopleList;
