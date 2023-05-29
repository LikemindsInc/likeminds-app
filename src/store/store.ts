import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import { CACHE_VERSION, __ROOT_REDUX_STATE_KEY__ } from "./constants";
import {
  __SETTINGS__REDUX__STATE_KEY__,
  __SESSION__REDUX__STATE_KEY__,
} from "../reducers/constants";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  configureStore,
  combineReducers,
  isRejectedWithValue,
  createListenerMiddleware,
  isRejected,
} from "@reduxjs/toolkit";
import { Reducer } from "redux";
import sessionReducer from "../reducers/session";
import errorReducer from "../reducers/errorHanlder";

import settingReducer from "../reducers/settings";

const rootPersistConfig = {
  storage: AsyncStorage,
  timeout: 10000,
  version: CACHE_VERSION,
  key: __ROOT_REDUX_STATE_KEY__,
  stateReconciler: autoMergeLevel2,
  blacklist: ["errorReducer", "sessionReducer"], // only settings and other state stores will be persisted
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
  })
);
// create the saga middleware

// const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor, rootReducer };
