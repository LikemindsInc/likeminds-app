import { IConnectionReceivedDTO } from "@app-model";
import { FC, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../Button/Button";
import { GlobalStyles } from "../../theme/GlobalStyles";
import moment from "moment";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  clearConnectionRespondStatus,
  getProfile,
} from "../../reducers/connection";
import {
  acceptConnectionRequestAction,
  getConnections,
} from "../../actions/connection";
import { useToast } from "react-native-toast-notifications";
import useAppSelector from "../../hooks/useAppSelector";

interface IProps {
  item: IConnectionReceivedDTO;
  handleOnRespond: (item: IConnectionReceivedDTO) => void;
}

const ConnectionNotificationItem: FC<IProps> = ({ item, handleOnRespond }) => {
  const renderImageSource = () => {
    if (
      !item.user ||
      !item.user.profilePicture ||
      item.user?.profilePicture.trim() === ""
    )
      return require("../../../assets/image20.png");
    return { uri: item.user.profilePicture };
  };
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.connectionReducer);
  const handleGotoProfile = () => {
    dispatch(getProfile(item.creatorId));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };

  const toast = useToast();

  useEffect(() => {
    if (state.connectionRespondStatus === "completed") {
      dispatch(getConnections());
      toast.show("Connection accepted successfully", {
        placement: "top",
        type: "success",
        animationType: "slide-in",
      });
    }

    dispatch(clearConnectionRespondStatus());
  }, [state.connectionRespondStatus]);

  const handleRespond = () => {
    // dispatch(
    //   acceptConnectionRequestAction({
    //     connectionId: item.id,
    //     status: "accepted",
    //   })
    // );
    handleOnRespond && handleOnRespond(item);
  };
  return (
    <TouchableOpacity onPress={handleGotoProfile} style={[styles.container]}>
      <Image
        source={renderImageSource()}
        style={{ width: 50, height: 50, borderRadius: 25 }}
        resizeMethod="auto"
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight400,
            GlobalStyles.textGrey,
          ]}
        >
          <View style={{ marginRight: 4 }}>
            <Text
              style={[GlobalStyles.textNavyBlue, GlobalStyles.fontWeight700]}
            >
              {item.user?.firstName} {item.user?.lastName}
            </Text>
          </View>
          wants to connect with you
        </Text>
        <View style={{ paddingTop: 4 }}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize10,
              GlobalStyles.fontWeight400,
              GlobalStyles.textGrey,
            ]}
          >
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
      <Button onPress={handleRespond} title="Respond" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
});

export default ConnectionNotificationItem;
