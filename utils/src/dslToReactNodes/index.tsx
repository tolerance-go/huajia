import { Attrs, Node } from "@huajia/dsl";
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

  const settings = node.settings.reduce((acc, [key, value]) => {
    acc[key.slice(1)] = value; // 移除 @ 符号
    return acc;
  }, {} as Record<string, Attrs>);

  const children = node.children.map((child, index) =>
    nodeToReactElement(child, components)
  );

  return (
    <Component key={node.name} {...settings} values={node.values}>
      {{
        default: children.length ? children : undefined,
      }}
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
