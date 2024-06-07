export type Location = {
  col: number;
  line: number;
  lineBreaks: number;
  offset: number;
};

export type Node = {
  id: string | null;
  name: string;
  settings: [`@${string}`, Attrs][];
  values: Value[];
  children: {
    // 没有子节点花括号的时候就是 null
    start: Location | null;
    end: Location | null;
    nodes: [string, Node][];
  };
  modifiers: string[];
  scopes: Scope[];
  start: Location;
  end: Location;
};

export type Scope = {
  start: Location;
  end: Location;
  scope: string;
};

export type Value = ArrayValue | string | number | boolean;

export type ArrayValue = Value[];

export type Attrs = [string, string[] /** 属性修饰符 */, Value | Attrs /** 可以嵌套 */][];
