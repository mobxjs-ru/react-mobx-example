import { observer } from "mobx-react-lite";
import React, { FC, PropsWithChildren, useMemo } from "react";

import { AppProviderProps } from "./app-provider.d";
import { AppProviderStore, createAppProviderStore } from "./app-provider.store";

const storeContext = React.createContext<AppProviderStore | null>(null);

export const AppProvider: FC<PropsWithChildren<AppProviderProps>> = observer(
  ({ children }) => {
    // Normally, if you use a classic approach (without Mobxify)
    // you wrap up store factory-function with 'useLocalObservable' from mobx-react-lite
    const store = useMemo(() => createAppProviderStore(), []);

    return (
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
  }
);

export const useAppStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error("useAppStore must be used within a AppProvider.");
  }
  return store;
};
