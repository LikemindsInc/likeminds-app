import { FlatList, Text, View, useToast } from 'native-base';
import { useCallback, useEffect } from 'react';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { getSpaceListAction } from '../../../../actions/space';
import useAppSelector from '../../../../hooks/useAppSelector';
import { ISpaceState } from '../../../../reducers/space_reducer';
import SpaceItem from './SpaceItem/SpaceItem';
import { GlobalStyles } from '../../../../theme/GlobalStyles';

const Spaces = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(
    (state: any) => state.spaceReducer,
  ) as ISpaceState;

  const getSpaceList = useCallback(() => {
    dispatch(getSpaceListAction());
  }, []);

  const toast = useToast();

  useEffect(() => {
    getSpaceList();
  }, []);

  const handleOnRefres = () => {
    getSpaceList();
  };

  useEffect(() => {
    if (state.getSpaceListStatus == 'failed') {
      toast.close({
        description: state.getSpaceListError,
        variant: 'contained',
      });
    }
  }, [state.getSpaceListStatus]);
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View style={[GlobalStyles.mt20, GlobalStyles.mb20]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.textGrey,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight400,
          ]}
        >
          Suggestions
        </Text>
      </View>
      <FlatList
        data={state.spaceList}
        renderItem={(props) => <SpaceItem item={props.item} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default Spaces;
