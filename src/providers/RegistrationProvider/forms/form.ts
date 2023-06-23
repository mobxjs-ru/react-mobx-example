import {
  FIELDS,
  Fields,
} from "@src/providers/RegistrationProvider/forms/fields";
import { IFunction, Mutable } from "@src/types/custom";

export type IForm = ReturnType<typeof Form>;

// A very simplified implementation of onChange handler for form
function onChange(value: string) {
  // @ts-ignore
  this.value = value;
}

// A very simplified Form constructor
export default function Form(
  fieldNames: Array<keyof Fields>
): Array<Mutable<Fields[keyof Fields] & { onChange: IFunction }>> {
  return fieldNames.map((fName) => ({
    ...FIELDS[fName],
    onChange,
  }));
}
