export type IFunction = (...args) => unknown;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type Override<T, O> = Omit<O, keyof T> & T;

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
