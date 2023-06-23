import { AppReactions } from "@src/providers/AppProvider/reactions";
import { Mobxify } from "@src/utils/mobx";
import { changeThemeInHTML, getTheme, setTheme } from "@src/utils/theme";

export type Theme = "light" | "dark";

export function createAppProviderStore() {
  const store = new Mobxify({
    theme: null as unknown as Theme,
    notification: null as unknown as string,
    setTheme(theme: Theme) {
      this.theme = theme;
      setTheme(this.theme);
      changeThemeInHTML(this.theme);
    },
    switchTheme() {
      const theme = getTheme();
      this.setTheme(theme === "light" ? "dark" : "light");
    },
    setNotification(notification: string) {
      this.notification = notification;
    },
    removeNotification(delay: number) {
      if (delay === undefined) {
        this.setNotification("");
        return;
      }

      setTimeout(() => this.setNotification(""), delay);
    },
  });

  const instance = store.getInstance();

  AppReactions(instance).run(["hideNotification", "initTheme"]);

  return instance;
}

export type AppProviderStore = ReturnType<typeof createAppProviderStore>;
