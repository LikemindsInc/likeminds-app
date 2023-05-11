import React from "react";
import "redux-persist";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

interface IProps{
  children: any
}

const Provider: React.FC<IProps> = ({ children }) => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </ReduxProvider>
);

export default Provider;
