import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { __ROOT_REDUX_STATE_KEY__ } from './constants';
import {
  __SETTINGS__REDUX__STATE_KEY__,
  __SESSION__REDUX__STATE_KEY__,
} from '../reducers/constants';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import sessionReducer from '../reducers/userProfileSession';
import errorReducer from '../reducers/errorHanlder';

import settingReducer from '../reducers/settings';
import spaceReducer from '../reducers/space_reducer';
import postReducer from '../reducers/post_reducer';
import connectionReducer from '../reducers/connection';
import signupReducer from './slice/signup';
import loginReducer from './slice/login';
import settings from './slice/appSettings';

const rootPersistConfig = {
  storage: AsyncStorage,
  key: __ROOT_REDUX_STATE_KEY__,
  // stateReconciler: autoMergeLevel2,
  whitelist: ['settingReducer', 'signupReducer'],
  blacklist: ['errorReducer', 'sessionReducer'], // only settings and other state stores will be persisted
};

type CombinedState = typeof rootReducer extends Reducer<infer U, any>
  ? U
  : never;

const rootReducer = combineReducers({
  session: sessionReducer,
});

const persistedReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    sessionReducer,
    errorReducer,
    settingReducer,
    spaceReducer,
    postReducer,
    connectionReducer,
    signupReducer,
    loginReducer,
    settings,
  }),
);
// create the saga middleware

// const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor, rootReducer };
