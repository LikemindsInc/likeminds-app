import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { openReactionList } from "../../reducers/post_reducer";
import { IPostReaction } from "@app-model";
import useAppSelector from "../../hooks/useAppSelector";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import { getProfile } from "../../reducers/connection";

const ReactionsViewModal = () => {
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const snapPoints = useMemo(() => ["50%", "60%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const session = useAppSelector((state) => state.settingReducer);
  const dispatch = useAppDispatch();
  const renderProfilePicture = (item: IPostReaction) => {
    if (item.user.profilePicture && item.user.profilePicture.trim() !== "") {
      return { uri: item.user.profilePicture };
    }
    return require("../../../assets/imageAvatar.jpeg");
  };
  const state = useAppSelector((state) => state.postReducer);

  const handleNavigationToProfileScreen = (profileId: string) => {
    bottomSheetRef2.current?.close();
    dispatch(openReactionList(false));
    if (profileId === session?.userInfo?.id) {
      return navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN);
    }

    dispatch(getProfile(profileId));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };
  useEffect(() => {
    if (state.showReactionList && state.postReaction.length > 0) {
      bottomSheetRef2.current?.expand();
    }
  }, [state.postReaction, state.showReactionList]);
  return (
    <BottomSheet
      ref={bottomSheetRef2}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={(props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={"close"}
          onPress={() => dispatch(openReactionList(false))}
        />
      )}
      enablePanDownToClose
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1, flex: 1 }}
        >
          <View style={[GlobalStyles.container, { backgroundColor: "#fff" }]}>
            {state.postReaction.map((item) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  justifyContent: "space-between",
                }}
                key={item.id}
              >
                <TouchableOpacity
                  onPress={() => handleNavigationToProfileScreen(item.user.id)}
                  style={{ flex: 1, flexDirection: "row", gap: 10 }}
                >
                  <View>
                    <Image
                      source={renderProfilePicture(item)}
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      resizeMethod="auto"
                      resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        GlobalStyles.fontInterRegular,
                        GlobalStyles.fontSize13,
                        GlobalStyles.textNavyBlue,
                      ]}
                    >
                      {item.user?.firstName} {item.user?.lastName}
                    </Text>
                    <Text
                      style={[
                        GlobalStyles.fontInterRegular,
                        GlobalStyles.fontSize10,
                        GlobalStyles.textGrey,
                      ]}
                    >
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text>{item.reaction}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default ReactionsViewModal;
