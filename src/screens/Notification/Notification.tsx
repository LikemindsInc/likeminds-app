import { ScrollView, View, Modal, StyleSheet, Image, Text } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import colors, { addOpacity } from '../../theme/colors';
import useAppSelector from '../../hooks/useAppSelector';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  acceptConnectionRequestAction,
  getConnections,
} from '../../actions/connection';
import ConnectionNotificationItem from '../../components/ConnectionNotificationItem/ConnectionNotificationItem';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { IConnectionReceivedDTO } from '@app-model';
import Button from '../../components/Button/Button';
import { useToast } from 'react-native-toast-notifications';
import {
  clearConnectionRespondStatus,
  getProfile,
} from '../../reducers/connection';
import TextLink from '../../components/TextLink/TextLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { APP_SCREEN_LIST } from '../../constants';

const Notification = () => {
  const selector = useAppSelector((state) => state.connectionReducer);
  const dispatch = useAppDispatch();

  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const state = useAppSelector((state) => state.connectionReducer);

  const navigation = useNavigation<NavigationProp<any>>();

  const [connectionAcceptType, setConnectionAcceptType] = useState<
    'accepted' | 'declined' | 'none'
  >('none');

  const getConnectionRequests = useCallback(() => {
    dispatch(getConnections());
  }, []);
  useEffect(() => {
    getConnectionRequests();
  }, [getConnectionRequests]);

  useEffect(() => {}, []);

  const [connection, setConnection] = useState<IConnectionReceivedDTO | null>(
    null,
  );

  const handleOnRespond = (item: IConnectionReceivedDTO) => {
    setConnection(item);
  };

  useEffect(() => {
    if (
      state.connectionRespondStatus === 'completed' ||
      state.connectionRespondStatus === 'failed'
    ) {
      setConnectionAcceptType('none');
      bottomSheetRef2.current?.close();
    }
  }, [state.connectionRespondStatus]);

  const handleApproveRequest = () => {
    if (!connection) return;

    setConnectionAcceptType('accepted');
    dispatch(
      acceptConnectionRequestAction({
        connectionId: connection.id,
        status: 'accepted',
      }),
    );
  };

  useEffect(() => {
    if (!connection) return;

    bottomSheetRef2.current?.expand();
  }, [connection]);

  const handleDeclineRequest = () => {
    if (!connection) return;
    setConnectionAcceptType('declined');
    dispatch(
      acceptConnectionRequestAction({
        connectionId: connection.id,
        status: 'declined',
      }),
    );
  };

  return (
    <View style={[GlobalStyles.container]}>
      <BackButton title="Notifications" iconColor={colors.primary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingVertical: 30 }}
      >
        {selector.connectionRequests.map((item) => (
          <ConnectionNotificationItem
            handleOnRespond={handleOnRespond}
            item={item}
            key={item.id}
          />
        ))}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef2}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop {...props} pressBehavior={'close'} />
        )}
        enablePanDownToClose
        onClose={() => {
          setConnection(null);
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={[{ backgroundColor: colors.white }]}>
              <View
                style={[
                  { flexDirection: 'row' },
                  { gap: 12, alignItems: 'center', marginBottom: 20 },
                ]}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{ uri: connection?.author?.profilePicture as string }}
                />
                <Text
                  style={[
                    GlobalStyles.fontInterMedium,
                    GlobalStyles.fontSize15,
                    GlobalStyles.textNavyBlue,
                  ]}
                >
                  {connection?.author?.firstName} {connection?.author?.lastName}
                </Text>
              </View>
            </View>

            <View
              style={[
                GlobalStyles.flewRow,
                { gap: 12, alignItems: 'center', marginBottom: 20 },
              ]}
            >
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.textGrey,
                  GlobalStyles.fontSize15,
                ]}
              >
                Hi I am {connection?.author?.firstName} and I am looking forward
                to connecting with you.”
              </Text>
            </View>

            <View
              style={[
                GlobalStyles.flewRow,
                { gap: 12, alignItems: 'center', marginBottom: 30 },
              ]}
            >
              <TextLink
                title="View Profile"
                onPress={() => {
                  dispatch(getProfile(connection?.author?.id as string));
                  navigation.navigate(
                    APP_SCREEN_LIST.CONNECTION_PROFILE_SCREEN,
                  );
                }}
                textStyle={{ textDecorationLine: 'none', fontWeight: '500' }}
              />
            </View>
          </ScrollView>

          <View
            style={[
              GlobalStyles.flewRow,

              {
                width: '100%',
                gap: 12,
                alignItems: 'center',
                marginBottom: 20,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Button
                onPress={handleDeclineRequest}
                type="cancel"
                title="Decline"
                loading={
                  state.connectionRespondStatus === 'loading' &&
                  connectionAcceptType === 'declined'
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <Button
                title="Accept"
                onPress={handleApproveRequest}
                loading={
                  state.connectionRespondStatus === 'loading' &&
                  connectionAcceptType === 'accepted'
                }
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    maxHeight: 300, // Set your desired maximum height
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Notification;
