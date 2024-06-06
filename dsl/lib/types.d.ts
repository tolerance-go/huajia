export type Node = {
  name: string;
  settings: [`@${string}`, Attrs][];
  values: Value[];
  children: Node[];
  scopes: string[];
  slots: string[];
};

export type Value = ArrayValue | string | number | boolean;

export type ArrayValue = Value[];

export type Attrs = {
  [key: string]: string;
};
