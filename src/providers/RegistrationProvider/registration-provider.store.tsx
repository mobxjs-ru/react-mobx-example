import Form, { IForm } from "@src/providers/RegistrationProvider/forms/form";
import { RegistrationsStoreProps } from "@src/providers/RegistrationProvider/registration-provider.d";
import { Mobxify } from "@src/utils/mobx";
import { RegReactions } from "./reactions";

export type IRegCommonMethodsAndProps = typeof commonMethodsAndProperties;

// Some stores may be close to each other due to its' nature.
// common base object helps to re-use the same props and methods across
// multiple stores
export const commonMethodsAndProperties = {
  isLoading: false,
  setIsLoading(is: boolean) {
    this.isLoading = is;
  },
};

export function createRegistrationProviderStore({
  appStore,
}: RegistrationsStoreProps) {
  const store = new Mobxify({
    ...commonMethodsAndProperties,
    form: null as unknown as IForm,
    formSubmitted: false,
    getFormIsFilled() {
      return !this.form.filter((field) => !field.value).length;
    },
    setFormSubmitted(is: boolean) {
      this.formSubmitted = is;
    },
    clearForm() {
      this.form = this.form.map((field) => {
        field.value = "";
        return field;
      });
    },
  });

  const instance = store.getInstance();

  // In case we need some parts of store once it initialized
  // we can use store.update for these purposes
  // In this example we don't use store instance when create a Form
  store.update("form", Form(["firstName", "surName", "email", "companyName"]));

  RegReactions(instance, appStore).run([
    "sendCompletionNotification",
    "sendForm",
    "flushForm",
  ]);

  return instance;
}

export type RegistrationProviderStore = ReturnType<
  typeof createRegistrationProviderStore
>;
