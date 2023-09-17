import { ISpaceList } from "@app-model";
import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../../../../theme/GlobalStyles";
import colors from "../../../../../theme/colors";
import { Text, useToast } from "native-base";
import Button from "../../../../../components/Button/Button";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import {
  ISpaceState,
  clearFollowSpaceStatus,
} from "../../../../../reducers/space_reducer";
import { followSpaceAction } from "../../../../../actions/space";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../../../../constants";

interface IProps {
  item: ISpaceList;
}

const SpaceItem: FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (state: any) => state.spaceReducer
  ) as ISpaceState;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
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
    <TouchableOpacity
      style={[
        { flexDirection: "row" },
        styles.container,
        GlobalStyles.card,
        { paddingRight: 10, paddingTop: 10, marginBottom: 5 },
      ]}
      onPress={() => navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN)}
    >
      <View
        style={{ flex: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
      >
        <Image
          source={
            item.profilePicture && item.profilePicture.trim() !== ""
              ? { uri: item.profilePicture }
              : require("../../../../../../assets/image10.png")
          }
          resizeMethod="auto"
          resizeMode="cover"
          style={{
            width: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
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
          {item.title}
        </Text>
        <View style={[GlobalStyles.mt10, { alignItems: "flex-end" }]}>
          <Button
            buttonStyle={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: 85, height: 35 }}
            title="Follow"
            onPress={() => handleSpaceFollow(item.id)}
            loading={isLoading}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
  },
  contentWrapper: {
    flex: 3,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SpaceItem;
