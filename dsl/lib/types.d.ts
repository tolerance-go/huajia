export type Node = {
  name: string;
  settings: [`@${string}`, Attrs][];
  values: Value[];
  children: Node[];
};

export type Value = ArrayValue | string | number | boolean;

export type ArrayValue = Value[];

export type Attrs = {
  [key: string]: string;
};
