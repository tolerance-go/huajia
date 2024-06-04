export type Root = {
  name: "Root";
  type: "Root";
  children: Element[];
};

export type Element = {
  name: string;
  type: "Element";
  settings: [`@${string}`, Attrs][];
  values: Value[];
  children: Element[];
};

export type Value = ArrayValue | string | number | boolean;

export type ArrayValue = Value[]

export type Attrs = {
  [key: string]: string;
};
