import { IFunction } from "@src/types/custom";
import { observable } from "mobx";

export function proxify<O extends Record<any, unknown>>(obj: O): O {
  return observable(obj, undefined, { autoBind: true });
}

// This is just an approach to make observable from object whenever you need
// In case of this example, it helps us to make a reactive store within the store
// factory-function to work with the instance before returning it to our components
export class Mobxify<S extends Record<any, unknown>> {
  private instance: S;

  constructor(store: S) {
    this.instance = proxify(store);
  }

  update(fieldName: keyof S, value: S[keyof S]): void {
    this.instance[fieldName] = value;
  }

  getInstance(): S {
    return this.instance;
  }
}

export function reactionsExtender<R extends Record<string, IFunction>>(
  reactions: R
): {
  reactions: R;
  run: (
    r: ([reactionName: keyof R, args?: Parameters<R[keyof R]>] | keyof R)[]
  ) => void;
} {
  return {
    reactions,
    run(r) {
      r.forEach((reaction) => {
        const [reactionName, args] = Array.isArray(reaction)
          ? reaction
          : [reaction, null];
        reactions[reactionName as keyof R].apply(null, args ?? []);
      });
    },
  };
}
