export type Fields = typeof FIELDS;

export const FIELDS = {
  firstName: {
    fieldName: "firstName",
    value: "",
    type: "text",
    description: "First name",
    error: "Please enter first name",
    autoComplete: "given-name",
  } as const,
  surName: {
    fieldName: "surName",
    value: "",
    type: "text",
    description: "Surname",
    error: "Please enter surname",
    autoComplete: "family-name",
  } as const,
  companyName: {
    fieldName: "companyName",
    value: "",
    type: "text",
    description: "Company name",
    error: "Please enter a company name",
  } as const,
  email: {
    value: "",
    fieldName: "email",
    type: "email",
    placeholder: "Your email",
    description: "Email",
    error: "Please enter a valid email address",
    autoComplete: "email",
    isLoading: false,
  } as const,
};
