import RegistrationForm from "@src/components/forms/RegistrationForm";
import ThemeSwitcher from "@src/components/ThemeSwitcher";
import { RegistrationProvider } from "@src/providers/RegistrationProvider";
import { observer } from "mobx-react-lite";

const RegistrationPage = observer(() => {
  return (
    <RegistrationProvider>
      <ThemeSwitcher />
      <RegistrationForm />
    </RegistrationProvider>
  );
});

export default RegistrationPage;
