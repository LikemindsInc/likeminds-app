import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "native-base";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import { ISpaceState } from "../../../../reducers/space_reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../../../constants";
import PeopleSearchResultCard from "../../../../PeopleSearchResultCard/PeopleSearchResultCard";
import { FlatList } from "react-native";

const PeopleList: FC<any> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const state = useAppSelector((state) => state.connectionReducer);

  const handleNavigation = () => {
    navigation.navigate(APP_SCREEN_LIST.SPACE_PROFILE_SCREEN);
  };

  return (
    <View style={{ marginTop: 8, flex: 1, marginLeft: 10 }}>
      <FlatList
        data={state.users}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PeopleSearchResultCard item={item} />}
      />
    </View>
  );
};

export default PeopleList;
