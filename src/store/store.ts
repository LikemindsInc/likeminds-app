import thunk from "redux-thunk";
import { NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import {
  compose,
  Middleware,
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { CACHE_VERSION, __ROOT_REDUX_STATE_KEY__ } from "./constants";
// import { session, __SESSION__REDUX__STATE_KEY__ } from "./session";
import settings from "../reducers/settings";
import { __SETTINGS__REDUX__STATE_KEY__ } from "../reducers/constants";
// import itemReducer from "./items/reducers/items";
// import jobReducer from "./job/reducers";

const rootPersistConfig = {
  storage: AsyncStorage,
  timeout: 10000,
  version: CACHE_VERSION,
  key: __ROOT_REDUX_STATE_KEY__, // only settings and other state stores will be persisted
};

const sessionPersistConfig = {
  storage: AsyncStorage,
  // key: __SESSION__REDUX__STATE_KEY__,
  blacklist: ["isLoading"],
};

const reducers = combineReducers({
  [__SETTINGS__REDUX__STATE_KEY__]: settings,
  //   [__SESSION__REDUX__STATE_KEY__]: persistReducer(
  //     sessionPersistConfig,
  //     session
  //   ),
  //   items: itemReducer,
  //   job: jobReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

const middlewares: Middleware[] = [thunk]; // create the saga middleware

const composable = () => {
  const state = [applyMiddleware(...middlewares)];

  // if (__DEV__) {
  //   const { name } = require("../../package.json");

  //   const { scriptURL } = NativeModules.SourceCode;
  //   const scriptHostname = scriptURL.split("://")[1].split(":")[0];

  //   const Reactotron = require("reactotron-react-native").default;

  //   Reactotron.configure({ name, host: scriptHostname }) // controls connection & communication settings
  //     .useReactNative() // add all built-in react native plugins
  //     .connect(); // let's connect!

  //   // <- Extend app console
  //   console.tron = Reactotron.log;

  //   if (Reactotron?.createEnhancer) {
  //     state.push(Reactotron?.createEnhancer?.());
  //   }
  // }

  return state;
};

const store = createStore(persistedReducer, compose(...composable()));
const persistor = persistStore(store);

export { store, persistor, reducers };
