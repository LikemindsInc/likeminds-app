import { IUserData } from '@app-model';
import { useCallback, useEffect, useState } from 'react';
import useAppDispatch from './useAppDispatch';
import { getCurrentUserAction } from '../actions/auth';
import useAppSelector from './useAppSelector';

export function useUser() {
  const [user, setUser] = useState<IUserData | null>(null);

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.settingReducer);

  const getUser = useCallback(() => {
    dispatch(getCurrentUserAction());
  }, []);

  useEffect(() => {
    if (state.getCurrentUserStatus === 'completed') {
      setUser(state.userInfo);
    } else if (state.getCurrentUserStatus === 'failed') {
      setUser(null);
    }
  }, [state.getCurrentUserStatus]);

  useEffect(() => {
    getUser();
  }, []);

  return [user];
}
