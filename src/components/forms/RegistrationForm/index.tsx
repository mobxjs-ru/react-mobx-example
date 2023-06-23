import { useAppStore } from "@src/providers/AppProvider/app-provider";
import { useRegistrationStore } from "@src/providers/RegistrationProvider/registration-provider";
import { observer } from "mobx-react-lite";

const RegistrationForm = observer(() => {
  const appStore = useAppStore();
  const registrationStore = useRegistrationStore();

  return (
    <div className={"flex justify-center items-center flex-col flex-wrap m-20"}>
      <div className="toast toast-top toast-end">
        {appStore.notification && (
          <div className="alert alert-success">
            <span className={"text-white dark:text-black"}>
              {appStore.notification}
            </span>
          </div>
        )}
      </div>
      <h1 className={"text-5xl text-black dark:text-white mb-10 mt-10"}>
        Registration Page
      </h1>

      {registrationStore.isLoading ? (
        <span className="loading loading-spinner text-success w-20 mt-20" />
      ) : (
        <div className="form-control w-full max-w-s flex justify-center items-center">
          {registrationStore.form.map((field) => (
            <div key={field.fieldName} className={"p-2 w-96"}>
              <label className="label">
                <span className={"label-text text-black dark:text-white"}>
                  {field.description}
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className={
                  "input input-bordered w-full max-w-md text-black dark:text-white bg-gray-200 dark:bg-gray-500 dark:placeholder:text-gray-400"
                }
                onChange={(e) => field.onChange(e.target.value)}
              />
            </div>
          ))}
          <button
            className="btn btn-active btn-success px-10 mt-12 text-white disabled:text-gray-400 disabled:opacity-70"
            disabled={!registrationStore.getFormIsFilled()}
            onClick={() => registrationStore.setFormSubmitted(true)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
});

export default RegistrationForm;
