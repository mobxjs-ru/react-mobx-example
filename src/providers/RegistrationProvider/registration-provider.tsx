import { useAppStore } from "@src/providers/AppProvider/app-provider";

import { observer } from "mobx-react-lite";
import React, { FC, PropsWithChildren, useMemo } from "react";

import {
  createRegistrationProviderStore,
  RegistrationProviderStore,
} from "@src/providers/RegistrationProvider/registration-provider.store";

const storeContext = React.createContext<RegistrationProviderStore | null>(
  null
);

export const RegistrationProvider: FC<PropsWithChildren> = observer(
  ({ children }) => {
    const appStore = useAppStore();

    const store = useMemo(
      () =>
        createRegistrationProviderStore({
          appStore,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    return (
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
  }
);

export const useRegistrationStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error(
      "useRegistrationStore must be used within a RegistrationProvider."
    );
  }
  return store;
};
