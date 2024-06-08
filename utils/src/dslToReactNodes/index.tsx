import { Attrs, Node, Value } from "@huajia/dsl";
import React from "react";
import { parseDSL } from "./parseDSL";

interface NestedRecord {
  [key: string]: Value | NestedRecord;
}

type RecordValue = Record<string, Value | NestedRecord>;


// 将 Attrs 转换为平面对象
const attrsToObject = (attrs: Attrs): Record<string, any> => {
  return attrs.reduce((acc, [attrKey, attrModifiers, value]) => {
    const key = attrModifiers.length > 0 ? `${attrKey}.${attrModifiers.join(".")}` : attrKey;
    if (Array.isArray(value)) {
      // 如果是嵌套的 Attrs
      acc[key] = attrsToObject(value as Attrs);
    } else {
      // 普通的 Value
      acc[key] = value;
    }
    return acc;
  }, {} as RecordValue);
};

// 将 Node 转换为 React 元素
const nodeToReactElement = (
  node: Node,
  components: { [key: string]: React.FC<any> }
): React.ReactNode => {
  const Component = components[node.name];
  if (!Component) {
    throw new Error(`Component for ${node.name} not found in components.`);
  }

  const settings = node.settings.reduce((acc, [key, attrs]) => {
    acc[key] = attrsToObject(attrs);
    return acc;
  }, {} as RecordValue);

  const children = node.children.nodes.reduce((acc, [slot, child]) => {
    if (!acc[slot]) {
      acc[slot] = [];
    }
    acc[slot].push(nodeToReactElement(child, components));
    return acc;
  }, {} as Record<string, React.ReactNode[]>);

  const values = node.values.length > 0 ? node.values : undefined;

  return (
    <Component key={node.name} {...settings} values={values}>
      {children}
    </Component>
  );
};

export const dslToReactNodes = (
  dsl: string,
  components: { [key: string]: React.FC<any> }
) => {
  const node = parseDSL(dsl);
  if (!node) return [];
  return [node].map((node, index) => nodeToReactElement(node, components));
};
