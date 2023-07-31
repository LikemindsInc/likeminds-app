import { ScrollView, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import BackButton from "../../components/Navigation/BackButton/BackButton";
import colors from "../../theme/colors";
import useAppSelector from "../../hooks/useAppSelector";
import { useCallback, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { getConnections } from "../../actions/connection";
import ConnectionNotificationItem from "../../components/ConnectionNotificationItem/ConnectionNotificationItem";

const Notification = () => {
  const selector = useAppSelector((state) => state.connectionReducer);
  const dispatch = useAppDispatch();

  const getConnectionRequests = useCallback(() => {
    dispatch(getConnections());
  }, []);
  useEffect(() => {
    getConnectionRequests();
  }, [getConnectionRequests]);

  console.log(selector.connectionRequests);
  return (
    <View style={[GlobalStyles.container]}>
      <BackButton title="Notifications" iconColor={colors.primary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingVertical: 30 }}
      >
        {selector.connectionRequests.map((item) => (
          <ConnectionNotificationItem item={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Notification;
