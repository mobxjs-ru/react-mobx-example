import { AppProviderStore } from "@src/providers/AppProvider";
import { RegistrationProviderStore } from "@src/providers/RegistrationProvider";
import { reactionsExtender } from "@src/utils/mobx";
import { reaction } from "mobx";

export function RegReactions(
  instance: RegistrationProviderStore,
  appStore: AppProviderStore
) {
  const reactions = {
    sendCompletionNotification() {
      reaction(
        () => instance.formSubmitted,
        () => {
          appStore.setNotification(
            "Congratulations! Your form has been successfully submitted."
          );
        }
      );
    },
    sendForm() {
      reaction(
        () => instance.formSubmitted,
        () => {
          instance.setIsLoading(true);
          // imaginary API call
          setTimeout(() => instance.setIsLoading(false), 3000);
        }
      );
    },
    flushForm() {
      reaction(
        () => instance.formSubmitted,
        () => {
          instance.clearForm();
          instance.setFormSubmitted(false);
        }
      );
    },
  };

  return reactionsExtender<typeof reactions>(reactions);
}
