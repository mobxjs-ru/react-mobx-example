import { AppProviderStore } from "@src/providers/AppProvider";
import { Theme } from "@src/providers/AppProvider/app-provider.store";
import { RegistrationProviderStore } from "@src/providers/RegistrationProvider";
import { reactionsExtender } from "@src/utils/mobx";
import { changeThemeInHTML, getTheme, setTheme } from "@src/utils/theme";
import { reaction, when } from "mobx";

export function AppReactions(instance: AppProviderStore) {
  const reactions = {
    hideNotification() {
      reaction(
        () => !!instance.notification,
        () => {
          instance.removeNotification(3000);
        }
      );
    },
    initTheme() {
      when(
        () => window.document.documentElement !== undefined,
        () => {
          setTimeout(() => {
            const theme = getTheme();
            instance.setTheme((theme ?? "light") as Theme);
          }, 0);
        }
      );
    },
  };

  return reactionsExtender<typeof reactions>(reactions);
}
