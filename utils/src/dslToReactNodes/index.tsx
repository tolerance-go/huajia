import { Attrs, Node, Value } from "@huajia/dsl";
import React from "react";
import { parseDSL } from "./parseDSL";

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
    // 移除 @ 符号
    acc[key.slice(1)] = attrs.reduce((acc, [attrKey, value]) => {
      return {
        ...acc,
        [attrKey]: value,
      };
    }, {});
    return acc;
  }, {} as Record<string, Record<string, Value>>);

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
