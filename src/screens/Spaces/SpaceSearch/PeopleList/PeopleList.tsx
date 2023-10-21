import { FC, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { APP_SCREEN_LIST } from '../../../../constants';
import PeopleSearchResultCard from '../../../../PeopleSearchResultCard/PeopleSearchResultCard';
import { FlatList } from 'react-native';
import { GlobalStyles } from '../../../../theme/GlobalStyles';
import { IUserData } from '@app-model';
import Button from '../../../../components/Button/Button';
import { getProfile } from '../../../../reducers/connection';
import {
  getUserRecommendationByIndustry,
  getUserRecommendationBySchool,
  getUsersBySuggestion,
} from '../../../../actions/connection';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../../../theme/colors';
import useDimension from '../../../../hooks/useDimension';

const PeopleList: FC<any> = ({ item, searchText = '' }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.connectionReducer);

  const handleNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN);
  };

  useEffect(() => {
    dispatch(getUserRecommendationByIndustry({ search: '' }));
    dispatch(getUserRecommendationBySchool({ search: '' }));
    dispatch(getUsersBySuggestion());
  }, []);

  const renderEmptySearchResult = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <View style={[GlobalStyles.mb10]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            Search results
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <AntDesign name="search1" size={24} color={colors.primary} />
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            {searchText}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.textNavyBlue,
            ]}
          >
            There is no user with above name. Please check your spellings and
            search again
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 8, marginLeft: 10 }}
    >
      {searchText.length > 0 ? (
        <View style={[GlobalStyles.mb20]}>
          <View style={[GlobalStyles.mt20]}>
            {state.users.length === 0 ? (
              renderEmptySearchResult()
            ) : (
              <View style={{ paddingHorizontal: 16 }}>
                <View style={[GlobalStyles.mb20]}>
                  <Text
                    style={[
                      GlobalStyles.fontInterRegular,
                      GlobalStyles.fontSize13,
                      GlobalStyles.textNavyBlue,
                    ]}
                  >
                    Search Results
                  </Text>
                </View>
                {state.users.map((item) => (
                  <Suggestion data={item} key={item.id} />
                ))}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View>
          <View>
            <View>
              {state.usersBySchool.length > 0 ? (
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
                  <View style={{ marginLeft: 10 }}>
                    <FlatList
                      data={state.usersBySchool}
                      keyExtractor={(item) => item.id}
                      numColumns={1}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <PeopleSearchResultCard item={item} />
                      )}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View>
            <View>
              {state.usersByIndustry.length > 0 ? (
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
                    <FlatList
                      data={state.usersByIndustry}
                      keyExtractor={(item) => item.id}
                      numColumns={1}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <PeopleSearchResultCard item={item} />
                      )}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View style={[GlobalStyles.mb20, { paddingHorizontal: 16 }]}>
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
              {state.usersBySuggestions.length === 0 ? (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../../../../../assets/folder.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View>
                  {state.usersBySuggestions.slice(0, 10).map((item) => (
                    <Suggestion showViewButton data={item} key={item.id} />
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

interface IProps {
  data: IUserData;
  showViewButton?: boolean;
}

const Suggestion: FC<IProps> = (props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const width = useDimension().width;
  const handleOnProfilePress = () => {
    dispatch(getProfile(props.data?.id as string));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };
  return (
    <View style={[styles.container]}>
      <View>
        {props.data.profilePicture &&
          props.data.profilePicture.trim() !== '' && (
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
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={handleOnProfilePress}>
          <Text
            style={[
              GlobalStyles.fontSize13,
              GlobalStyles.fontInterMedium,
              GlobalStyles.textNavyBlue,
            ]}
          >
            {props?.data?.firstName} {props?.data?.lastName}
          </Text>
          {props?.data?.experience[0]?.jobTitle || props?.data?.skills[0] ? (
            <View style={{ marginTop: 5 }}>
              <Text
                style={[
                  GlobalStyles.fontSize13,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.textGrey,
                  { maxWidth: 0.5 * width },
                ]}
              >
                {props?.data?.experience[0]?.jobTitle || props?.data?.skills[0]}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        {props.showViewButton && (
          <Button
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title="View"
            onPress={handleOnProfilePress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    gap: 12,
  },
});

export default PeopleList;
