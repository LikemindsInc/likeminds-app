import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAppSelector from "./useAppSelector";
import { APP_SCREEN_LIST } from "../constants";
import useAppDispatch from "./useAppDispatch";
import { getProfile } from "../reducers/connection";

export function useProfileNavigation(profileId: string) {
  const state = useAppSelector((state) => state.settingReducer);

  const navigationToProfile = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useAppDispatch();
    if (profileId === state?.userInfo?.id) {
      return navigation.navigate(APP_SCREEN_LIST.USER_PROFILE_SCREEN);
    }

    dispatch(getProfile(profileId));
    navigation.navigate(APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN);
  };

  return { navigationToProfile };
}
